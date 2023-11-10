import Phaser from "phaser";
import { io } from 'socket.io-client';

const HOST = 'http://localhost:3000/';

export default class Client extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  init() {
    const socket = io(HOST);

    socket.on('connect', () => {
      console.log(`I connect ${socket.id}`);
    })

    socket.on('disconnect', () => {
      console.log(`I disconnect ${socket.id}`);
    })

    socket.on('gameStart', () => {
      this.emit('gameStartPhaser');
    })
  }
}