const socketIO = require('socket.io');

module.exports = {
  init(server) {
    this.sessions = [];

    // init socketIO
    this.io = socketIO(server);
    this.io.on('connection', socket => {
      socket.on('playerMove', data => {
        this.onPlayerMove(socket, data);
      })
      this.onConnection(socket);
    })
  },

  onPlayerMove(socket, data) {
    const session = this.sessions.find(el => el.playerSocket === socket || el.enemySocket === socket);

    let opponentSocket;

    if (session) {
      if (session.playerSocket === socket) {
        opponentSocket = session.enemySocket;
      } else {
        opponentSocket = session.playerSocket;
      }
    }

    opponentSocket.emit('enemyMove', data);
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
    session.playerSocket.emit('gameStart', { master: true });
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
