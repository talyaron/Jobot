import { ChatMV } from './ChatVM';


function Chat() {

  const { job, sender } = ChatMV();

  return (
    <>
      <div>Chat</div>
      {job && <div>{job.jobName}</div>}
      {sender && <div>{sender.email}</div>}
    </>
  )
}

export default Chat