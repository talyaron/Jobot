import type { Chat } from "../../../model/ChatModel";
import styles from './Chat.module.scss';
import { ChatMV } from './ChatVM';
import { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Paperclip } from 'lucide-react';
import { Send } from 'lucide-react';

function Chat() {
  const { job, user, chats, loading } = ChatMV();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageInput, setMessageInput] = useState('');

  if (loading) return <div className={styles.loading}>טוען...</div>;


  const handleSendClick = () => {
    console.log("send clicked");
    if (messageInput.trim()) {
      sendMessage(user._id, job?._id, messageInput.trim());
    }
  };

  const sendMessage = async (userId: string, jobId: string | undefined, message: string) => {
    console.log("send message");
    try {
      const response = await fetch(`http://localhost:3000/api/chat/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          jobId: jobId,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error sending message:', errorData);
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const chat = await response.json();
      console.log('Message sent successfully:', chat);
      return chat;
    } catch (error) {
      // console.error('Error sending message:', error);
      throw error;
    }
  };

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.chatContainer}>


        <div className={styles.chatList}>
          <h3 className={styles.chatListHeader}>צ׳אט</h3>
          {Array.isArray(chats) && chats.map((chat, index) => (
            <div key={index} className={styles.chatListItem}>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>
                  {chat.job?.jobName} • {chat.job?.location}
                </div>
                <div className={styles.chatMeta}>
                  <div className={styles.chatDate}>
                    {new Date(chat.lastUpdated).toLocaleDateString("he-IL")}
                  </div>
                  {/* <div className={styles.chatPrice}>₪{chat.job?.price}</div> */}
                </div>
                <div className={styles.chatSubtitle}>
                  {chat.messages?.[chat.messages.length - 1]?.content?.slice(0, 50)}...
                </div>
              </div>
            </div>
          ))}
        </div >


        <div className={styles.sidebar}>
          <div className={styles.header}>
            <div>
              {job && (
                <div className={styles.jobPreview}>
                  <div className={styles.jobInfo}>
                    <h2>{job?.company}</h2>
                    <div className={styles.jobTitle}>{job.jobName} • {job.location}</div>
                    <div className={styles.jobPrice}>₪{job?.salary}</div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.leftBar}>
              <button className={styles.backButton}>למשרה</button>
              <div className={styles.menuIcon}><EllipsisVertical /></div>
            </div>
          </div>

          <div className={styles.chatArea}>
            {!selectedChat ? (
              <div className={styles.emptyState}>
                <p>עדיין אין הודעות</p>
              </div>
            ) : (
              <div className={styles.messages}>
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.content === user._id ? styles.sentMessage : styles.receivedMessage
                    }
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.messageInputArea}>

            <input
              type="text"
              placeholder="הקלד הודעה"
              className={styles.messageInput}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            ></input>
            <Paperclip className={styles.attachmentButton} />
            <Send className={styles.sendButton} onClick={() => handleSendClick()} />
          </div>

        </div>
      </div>
    </div >
  );
}

export default Chat;