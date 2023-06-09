import { Scene } from "phaser";
import atlasJSON from '../tiles.json';
import mapJSON from './assets/map.json';
import atlas from './assets/0x72_DungeonTilesetII_v1.4.png';
import { Player } from "./Player";
import { Goblin } from "./Goblin";
export class MainScene extends Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.atlas('atlas', atlas, atlasJSON);
    this.load.tilemapTiledJSON('map', mapJSON);
  }

  create() {
    this.cameras.main.setZoom(4);

    this.map = this.make.tilemap({ key: 'map' });
    const tiles = this.map.addTilesetImage('0x72_DungeonTilesetII_v1.4', 'atlas');

    const layer = this.map.createLayer(0, tiles, 0, 0);
    this.map.layers[0].tilemapLayer.setCollision(-1);

    let player = this.add.existing(new Player(this, 100, 100));
    let goblin = this.add.existing(new Goblin(this, 150, 100));

    this.cameras.main.startFollow(player);
    this.physics.add.collider(player, this.map.layers[0].tilemapLayer);
  }

  update() {
    // Additional logic can be added here if needed
  }
}