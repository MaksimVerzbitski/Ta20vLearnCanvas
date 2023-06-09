
import { MainScene } from './MainScene';
import Phaser from 'phaser';
import './style.css'
import Dexie from 'dexie';
var config = {
  type: Phaser.CANVAS,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
         //debug: true
      }
  },
  scene: new MainScene()
};

var game = new Phaser.Game(config);

let data = {x: 1000, y: 2000};
localStorage.setItem('something', JSON.stringify(data));

let localData = JSON.parse(localStorage.getItem('something'));
console.log(localData);

let db = new Dexie("game");
db.version(1).stores({
  entities: `
    id,
    name,
    x,
    y`,
});

db.entities.put({id:4, name:'Player',x: 1000,y: 2000})
