import Phaser from 'phaser';

export class Arrow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, target) {
    super(scene, x, y, 'atlas', 'weapon_red_gem_sword');

    scene.physics.add.existing(this);
    this.body.maxSpeed = 300;
    this.body.setDrag(50);
    this.body.setSize(4, 4);
    this.body.setOffset(4, 6);

    this.scene.physics.moveToObject(this, target, 300);
    this.setRotation(Phaser.Math.Angle.BetweenPoints(this, target) + Math.PI / 2);

    scene.physics.add.collider(this, scene.map.layers[0].tilemapLayer, () => {
      this.setVelocity(0);
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    // Additional logic can be added here if needed
  }
}
/* 

import Phaser from 'phaser';
export class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, target){
        super(scene, x, y, 'atlas', 'weapon_arrow');
        scene.physics.add.existing(this);
        this.body.maxSpeed = 300;
        this.body.setDrag(50);
        this.body.width = 4;
        this.body.height = 4;
        this.body.setOffset(4,6);
        
        this.scene.physics.moveToObject(this, target, 300);
        this.setRotation(Phaser.Math.Angle.BetweenPoints(this, target) + Math.PI/2);

        scene.physics.add.collider(this, scene.map.layers[0].tilemapLayer, () => {
            this.setVelocity(0);
        });
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
      
    }
}
*/