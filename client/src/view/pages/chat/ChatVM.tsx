import { useEffect, useState } from "react";
import { Job } from "../../../model/jobModel";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/user/userSlice";
import { Chat } from "../../../model/ChatModel";


export function ChatMV() {
  const sender = useSelector(userSelector);
  const { jobId } = useParams();

  const [job, setJob] = useState<Job>();
  const [chats, setChats] = useState<Chat[]>();
  console.log("k", typeof (sender._id))


  useEffect(() => {
    if (jobId) {
      fetchJob(jobId);
    }
    if (sender) {
      fetchAllChats(sender._id);
    }
  }, []);


  async function fetchJob(jobId: string | undefined) {

    try {
      fetch(`http://localhost:3000/api/jobs/get-job-by-id/${jobId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data)
          setJob(data)
        })
        .catch((error) => console.error(error));
      console.log('job', job)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }


  async function fetchAllChats(sender: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/chat/get-chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender }),
      })
      const data = await response.json();
      console.log("data", data);
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }


  return {
    job,
    sender,
    chats,
  };
}
