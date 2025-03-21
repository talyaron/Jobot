import { useEffect, useState } from "react";
import { Job } from "../../../model/jobModel";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/user/userSlice";
import { Chat } from "../../../model/ChatModel";


export function ChatMV() {
  const user = useSelector(userSelector);
  console.log("user::", user, typeof (user))
  const { jobId } = useParams();

  const [job, setJob] = useState<Job>();
  const [chats, setChats] = useState<Chat[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (jobId) await fetchJob(jobId);
      if (user?._id) await fetchAllChats(user._id);
      setLoading(false);
    };
    fetchData();
  }, [jobId, user]);


  async function fetchJob(jobId: string | undefined) {
    try {
      const response = await fetch(`http://localhost:3000/api/jobs/get-job-by-id/${jobId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched Job:", data);
      setJob(data);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  }


  async function fetchAllChats(user: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/chat/get-chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user }),
      })
      const data = await response.json();
      setChats(data);
      console.log("CCC", data)
      console.log("Fetched chats:", data, Array.isArray(data));
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }


  return {
    job,
    user,
    chats,
    loading,
  };
}
