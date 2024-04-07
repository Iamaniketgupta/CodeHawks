import { useEffect, useState } from "react";
import Select from 'react-select';
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from 'axios';
import { SERVER_URL } from "../../../../constant";
import { token } from "../../constants";
const AssignTask = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [mentees, setMentees] = useState([])
  const [loading, setLoading] = useState(false);


  const user = useSelector((state) => state.auth.user);

  const getMentees = async () => {
    try {
      setLoading(true)
      const response = await axios.post(SERVER_URL+"/api/v1/subscription/getUserSubscribers", {
        mentorId: user._id
      },{ headers: { Authorization: `Bearer ${token}`}});
      if (response.data.data) {
        const newMentees = response.data.data;
        setMentees([...newMentees]);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setLoading(true)
      if (selectedUsers.length === 0) {

        toast.error("Please Select a Mentee");
        return;
      }

      await axios.post(SERVER_URL+"/api/v1/task/assign-task", {
        title,
        description,
        githubLink,
        mentor: user._id,
        menteeIds: selectedUsers,
        headers: { Authorization: `Bearer ${token}`}
      },{ headers: { Authorization: `Bearer ${token}`}});

      // console.log(response.data);
      toast.success("Assigned SuccessFully");
      setSelectedUsers([]);
      setTitle("");
      setDescription("");
      setGithubLink("");

    } catch (error) {
      toast.error("Failed to Assign");
      // console.log(error);
    } finally {
      setLoading(false)
    }
  };


  const handleChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions.map(option => option.value));
  };


  const options = mentees?.map(user => ({ value: user._id, label: user.fullName }));

  useEffect(() => {
    getMentees();
  }, [])


  return (

    <div className="p-4 sm:ml-64 text-black">
    <div className="p-4  border-gray-200 border-2 rounded-lg dark:border-gray-700 mt-14">
    <div className="flex items-center justify-center">


      <div className="max-w-md bg-white mt-8 p-6 border-2 mx-3 m-4  rounded-lg shadow-md w-full ">
        <form onSubmit={handleSubmit}>
          {/* Select Mentees */}
          <h2 className="text-2xl font-bold mb-4">Assign Task</h2>

          <label
            htmlFor="mentees"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Mentees:
          </label>
          <Select

            id="mentees"
            name="mentees"
            options={options}
            isMulti
            onChange={handleChange}
            className="mb-4"
          />

          {/* Task Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md shadow-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Task Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md shadow-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Github Link */}
          <div className="mb-4">
            <label
              htmlFor="githubLink"
              className="block text-sm font-medium text-gray-700"
            >
              Github Link:
            </label>
            <input
              type="text"
              id="githubLink"
              name="githubLink"
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md shadow-sm"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="btn btn-primary btn">
              {loading ?
                <div className="animate-spin inline-block size-6 border-[5px] border-current border-t-transparent text-ehite rounded-full" role="status" aria-label="loading">
                </div> : ''}
              {!loading && "Assign"}
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
  );
};

export default AssignTask;
