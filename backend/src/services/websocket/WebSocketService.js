export class WebSocketService {
  constructor(io) {
    this.io = io;
    this.rooms = new Map();
  }

  broadcast(event, data) {
    this.io.emit(event, data);
  }

  sendToRoom(room, event, data) {
    this.io.to(room).emit(event, data);
  }

  sendToUser(socketId, event, data) {
    this.io.to(socketId).emit(event, data);
  }

  createRoom(roomId) {
    this.rooms.set(roomId, new Set());
  }

  joinRoom(socketId, roomId) {
    if (!this.rooms.has(roomId)) {
      this.createRoom(roomId);
    }
    this.rooms.get(roomId).add(socketId);
  }

  leaveRoom(socketId, roomId) {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId).delete(socketId);
    }
  }
}
