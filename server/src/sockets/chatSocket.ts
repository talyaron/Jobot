import { Socket, Server } from 'socket.io';

export default function setupChatSocket(socket: Socket, io: Server) {
  socket.on('send_message', (data) => {
    console.log('Message from socket:', data);

    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  socket.on('join_chat', (jobId) => {
    socket.join(jobId);
  });

  socket.on('send_message', (data) => {
    io.to(data.jobId).emit('receive_message', data);
  });

}