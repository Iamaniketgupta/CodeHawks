import { isValidObjectId } from 'mongoose';
import Task from '../models/task.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import SubmitTask from '../models/submitTask.model.js';
import { ApiResponse } from '../utils/apiResponse.js';

const assignTask = asyncHandler(async (req, res) => {
    const { menteeIds, title, description ,githubLink } = req.body;
    // console.log(req.body)
    menteeIds.map((menteeId)=>{
        const isValidId = isValidObjectId(menteeId);
        if(!isValidId){
            throw new ApiError(400 , "Mentee ids are not valid")
        }
    })

    const task = new Task({
        mentor: req.mentor._id,
        mentee: menteeIds,
        title,
        description,
        githubLink
    });

    await task.save();

    if(!task){
        throw new ApiError(500 , "Error while creating task ");
    }

    menteeIds.map(async(menteeId)=>{
        const submitTask = await SubmitTask.create(
            {
                task:task._id,
                mentee:menteeId,
                mentor:req.mentor._id
            }
        )

        if(!submitTask){
            throw new ApiError(500 , "Error while creating submit task objects")
        }
    })

    res.status(200).json({ message: "Task assigned successfully" });
});

const changeTaskStatus = asyncHandler(async (req, res) => {
    const { taskId, status } = req.body;

    await Task.findOneAndUpdate(
        { _id: taskId, mentor: req.mentor._id },
        { status },
        { new: true }
    );

    res.status(200).json({ message: "Task status updated successfully" });
});

const submitTask = asyncHandler(async (req, res, next) => {

        const { githubLink , submitTaskId } = req.body;
        const menteeId = req.user._id;

        const sTask = await SubmitTask.findById(submitTaskId);
        if(!sTask){
            throw new ApiError(400 , "Submitted task not found");
        }
    
        const task = await Task.findById(sTask.task);
        if(!task){
            throw new ApiError(400 , "Task to submit not found");
        }
        console.log(task);
    
        let found = false;
        task.mentee.map((mentee)=>{
            if(String(mentee) == String(menteeId)){
                found = true;
            }
        })
    
        if(!found){
            throw new ApiError(400 , "This task cannot be submitted by this user")
        }
    
    

        if(!githubLink && !submitTaskId){
            throw new ApiError(400 , "All fields are required");
        }

        const submitTask = await SubmitTask.findByIdAndUpdate(
            submitTaskId,
            {
                githubLink:githubLink,
                status:"in review"
            }
        );

        if(!submitTask){
            throw new ApiError(500 , "Error while submiting task and updating status");
        }

        res.status(200).json({ message: "Task submitted successfully" });

});

const editSubmittedTask = asyncHandler(async (req, res, next) => {

    const { githubLink , submitTaskId } = req.body;
    const menteeId = req.user._id;

    const sTask = await SubmitTask.findById(submitTaskId);
    if(!sTask){
        throw new ApiError(400 , "Submitted task not found");
    }

    const task = await Task.findById(sTask.task);
    if(!task){
        throw new ApiError(400 , "Task to submit not found");
    }

    let found = false;
    task.mentees.map((mentee)=>{
        if(String(mentee) == String(menteeId)){
            found = true;
        }
    })

    if(!found){
        throw new ApiError(400 , "This task cannot be submitted by this user")
    }


    if(!githubLink && !submitTaskId){
        throw new ApiError(400 , "All fields are required");
    }

    const submitTask = await SubmitTask.findByIdAndUpdate(
        submitTaskId,
        {
            githubLink:githubLink,
            status:"in review"
        }
    );

    if(!submitTask){
        throw new ApiError(500 , "Error while submiting task and updating status");
    }

    res.status(200).json({ message: "Task submit editted successfully" });

});


const markTaskAsComplete = asyncHandler(async(req,res)=>{
    const {submitTaskId , mentorId } = req.body;
    if(!submitTask && !mentorId){
        throw new ApiError(400 , "All fields are required")
    }

    const submitTask = await SubmitTask.findById(submitTaskId);
    if(!submitTask){
        throw new ApiError(400 , "Task not found");
    }

    if(String(submitTask.mentor) != String(mentorId)){
        throw new ApiError(400 , "Task doesnt belong to the mentor");
    }

    submitTask.status = 'completed';
    await submitTask.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Task marked as complete"
        )
    )



})

const getTaskSubmissions = asyncHandler(async(req,res)=>{
    const {taskId} = req.body;
    if(!taskId){
        throw new ApiError(400 , "Task id required");
    }

    const submissions = await SubmitTask.find(
        {
            task:taskId
        }
    );

    if(!submissions){
        throw new ApiError(500 , "Submissions not found")
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            submissions,
            "Submissions fetched successfully"
        )
    )

})

const deleteTask = asyncHandler(async(req,res)=>{
    const {taskId} = req.body;
    if(!taskId){
        throw new ApiError(400 , "Task id is required");
    }

    const task  = await Task.findById(taskId);
    if(!task){
        throw new ApiError(400 , "Task not found");
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);
    if(!deleteTask){
        throw new ApiError(500 , "Task not deleted")
    }

    const deletedSubmissions = await SubmitTask.deleteMany({
        task:taskId
    });
    if(!deletedSubmissions){
        throw new ApiError(500 , "Submissions not deleted")
    }


    return res.status(200).json(
        {
            message:"Task deleted successfully"
        }
    )


})

const getAllTasks = asyncHandler(async(req,res)=>{
    const mentorId = req.mentor._id;

    const tasks = await Task.find(
        {
            mentor:mentorId
        }
    );
    if(!tasks){
        throw new ApiError(500 , "Error while fetching tasks");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            tasks,
            " User Tasks fetched successfully"
        )
    )
})


const getAllMenteeTasks = asyncHandler(async(req,res)=>{
    const menteeId = req.user._id;
    if(!menteeId){
        throw new ApiError(400 , "Mentee id is required");
    }
    const tasks = await SubmitTask.find(
        {
            mentee:menteeId
        }
    ).populate(
        {
            path:"mentor",
            select:"fullName avatar profession"
        }
    ).populate(
        {
            path:"task",
        }
    );
    if(!tasks){
        throw new ApiError(500 , "Tasks not found");
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            tasks,
            "Tasks fetched successfully"
        )
    )
})
export { assignTask,getAllMenteeTasks, changeTaskStatus , submitTask  , editSubmittedTask , markTaskAsComplete  , deleteTask , getTaskSubmissions , getAllTasks};

