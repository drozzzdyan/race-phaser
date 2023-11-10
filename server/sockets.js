const socketIO = require('socket.io');

module.exports = {
  init(server) {
    this.sessions = [];

    // init socketIO
    this.io = socketIO(server);
    this.io.on('connection', socket => {
      this.onConnection(socket);
    })
  },

  // находит сессию, в которой есть сокет игрока, но нет сокета противника
  getPendingSession() {
    return this.sessions.find(session => session.playerSocket && !session.enemySocket);
  },

  createPendingSession(socket) {
    const session = {
      playerSocket: socket,
      enemySocket: null
    }
    this.sessions.push(session);
  },

  startGame(session) {
    session.playerSocket.emit('gameStart');
    session.enemySocket.emit('gameStart');
  },

  onConnection(socket) {
    let session = this.getPendingSession();

    if (!session) {
      this.createPendingSession(socket);
    } else {
      session.enemySocket = socket;
      
      this.startGame(session);
    }
  }
}
