import axios from "axios";
import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../constant";

function MentorCard(props) {
  const [liked, setLiked] = useState(false);
  const mentorId = props?.id;

  const fullname = props?.item?.fullName;
  const mentorName = fullname.toLowerCase().replace(" ", "-");

  useEffect(() => {
    const likedMentors = JSON.parse(localStorage.getItem("likedMentors")) || [];
    setLiked(likedMentors.includes(mentorId));
  }, [mentorId]);

  const handleBookMark = async () => {
    try {
       await axios.put(SERVER_URL + "/api/v1/mentee/addMentorToBookmark", { mentorId });
       
      toast.success(`Like Added Success`);
      setLiked(true);
      updateLocalStorage(mentorId, true);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  }

  const handleRemoveBookMark = async () => {
    try {
      if (!mentorId)
        throw new Error("Something went wrong!");

      const response = await axios.delete(SERVER_URL + "/api/v1/mentee/removeMentorFromBookmark", { data: { mentorId } });

      if (!response)
        throw new Error("Failed to Remove !");

      toast.success(`Mentor Removed Success`);
      setLiked(false);
      updateLocalStorage(mentorId, false);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An error occurred");
    }
  }


  const updateLocalStorage = (mentorId, isLiked) => {
    const likedMentors = JSON.parse(localStorage.getItem("likedMentors")) || [];
    if (isLiked) {
      localStorage.setItem("likedMentors", JSON.stringify([...likedMentors, mentorId]));
    } else {
      const updatedLikedMentors = likedMentors.filter(id => id !== mentorId);
      localStorage.setItem("likedMentors", JSON.stringify(updatedLikedMentors));
    }
  }

  // console.log(mentorId);

  return (
    <Card className="max-w-sm">

      <div className="flex flex-col items-center pb-8  relative">
        <div className="absolute top-0 right-0 font-xl">

          {
            liked ? <FaHeart onClick={handleRemoveBookMark}
              className='text-red-500 text-xl cursor-pointer' /> :
              <FaRegHeart onClick={handleBookMark}
                className='text-blue-500 text-xl hover:text-red-600 cursor-pointer' />
          }

        </div>

        <img

          src={props.item.avatar}
          className="mb-3 w-40 h-40 rounded-full shadow-lg overflow-clip"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props?.item?.fullName || "-No Name"}</h5>
        <span className="text-sm my-1 text-gray-500 dark:text-gray-400">{props?.item?.profession || "- Profession Not Found"}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{props?.item?.country? props?.item?.country +", " + props?.item?.state : ''}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{props?.item?.experience? props?.item?.experience + "+ years of Exp" : ''}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">

          <Link to={`/profile/${mentorName}`} state={props?.item}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            View Profile
          </Link>

        </div>
      </div>
    </Card>
  );
}


export default MentorCard;