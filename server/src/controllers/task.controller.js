import Task from '../models/task.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const assignTask = asyncHandler(async (req, res) => {
    const { menteeId, title, description } = req.body;

    const task = new Task({
        mentor: req.mentor._id,
        mentee: menteeId,
        title,
        description,
    });

    await task.save();

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
        const { taskId, githubLink } = req.body;

        const task = await Task.findOne({ _id: taskId, mentee: req.mentee._id });

        if (!task) {
            throw new ApiError(404, "Task not found or you are not authorized to submit this task");
        }

        task.githubLink = githubLink;
        await task.save();

        res.status(200).json({ message: "Task submitted successfully" });

});


export { assignTask, changeTaskStatus,submitTask };

