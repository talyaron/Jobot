import { useEffect, useState } from "react";
import { Job } from "../../../model/jobModel";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/user/userSlice";
import { Chat } from "../../../model/ChatModel";
import { io, Socket } from "socket.io-client";

export function ChatMV() {
  const user = useSelector(userSelector);
  const { jobId } = useParams();
  const [job, setJob] = useState<Job>();
  const [chats, setChats] = useState<Chat[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      // withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.connected);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket?.connected) {
      console.log("Socket is connected");
    } else {
      console.log("Socket is not connected");
    }
  }, [socket]);


  // Fetching job and chats when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      if (jobId) await fetchJob(jobId);
      if (user?._id) await fetchAllChats(user._id);
      setLoading(false);
    };
    fetchData();
  }, [jobId, user]);


  // Fetch job details
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

  // Fetch all chats for the user
  async function fetchAllChats(userId: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/chat/get-chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setChats(data);
      console.log("Fetched chats:", data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  // Join room on selecting a chat
  const joinChatRoom = (chat: Chat) => {
    if (socket && chat?.job?._id) {
      socket.emit("join_room", chat.job._id);
    }
  };

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;
    console.log(" Listen for new messages")

    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup socket listeners on component unmount
    return () => {
      if (socket) {
        socket.off("receive_message");
      }
    };
  }, [socket]);

  return {
    job,
    user,
    chats,
    loading,
    messages,
    joinChatRoom,
    socket,
  };
}
