import Phaser from 'phaser';
import { Arrow } from './Arrow';

class InputKeys {
  constructor(scene) {
    this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  isMoving() {
    return this.left.isDown || this.right.isDown || this.down.isDown || this.up.isDown;
  }
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'atlas', 'knight_m_idle_anim_0');
    scene.physics.add.existing(this);
    this.setName('Player');
    this.body.maxSpeed = 100;
    this.lastShot = 0;
    this.body.setDrag(200);

    this.arrowsLeft = 5;
    this.arrows = [];
    this.createText(scene);

    this.createAnimations();

    this.keys = new InputKeys(scene);

    scene.input.on('pointermove', (pointer) => {
      this.pointer = { x: pointer.worldX, y: pointer.worldY };
    });

    scene.physics.add.collider(this.arrows, this, (collision) => {
      this.arrowsLeft += 1;
      this.updateText();
      this.arrows.splice(this.arrows.indexOf(collision), 1);
      collision.destroy();
    });
  }

  createText(scene) {
    this.text = scene.add.text(0, 0, '⚔️- ' + this.arrowsLeft, {
      fontFamily: 'Arial',
      fontSize: 15,
      color: '#ffffff',
    });
    this.text.setOrigin(0.5);
    this.text.setDepth(1);
  }

  createAnimations() {
    this.anims.create({
      key: 'knight_m_idle',
      frames: this.anims.generateFrameNames('atlas', { prefix: 'knight_m_idle_anim_', start: 0, end: 3 }),
      repeat: -1,
      frameRate: 8
    });
    this.anims.create({
      key: 'knight_m_run',
      frames: this.anims.generateFrameNames('atlas', { prefix: 'knight_m_run_anim_', start: 0, end: 3 }),
      repeat: -1,
      frameRate: 8
    });
    this.anims.create({
      key: 'knight_m_hit',
      frames: this.anims.generateFrameNames('atlas', { prefix: 'knight_m_hit_anim_', start: 0, end: 0 }),
      repeat: -1,
      frameRate: 8
    });
    this.anims.play('knight_m_idle');
  }

  updateText() {
    this.text.setText('⚔️- ' + this.arrowsLeft);
  }

  isMoving() {
    return this.keys.isMoving();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.text.x = this.x;
    this.text.y = this.y - this.height / 2 - 15;

    const { velocity, maxSpeed } = this.body;
    velocity.x = 0;
    velocity.y = 0;

    if (this.keys.left.isDown) {
      velocity.x = -maxSpeed;
      this.setFlipX(true);
    }
    if (this.keys.right.isDown) {
      velocity.x = maxSpeed;
      this.setFlipX(false);
    }
    if (this.keys.down.isDown) {
      velocity.y = maxSpeed;
    }
    if (this.keys.up.isDown) {
      velocity.y = -maxSpeed;
    }
    if (this.keys.space.isDown) {
      if (time - this.lastShot > 1000) {
        if (this.arrowsLeft > 0) {
          const arrow = this.scene.add.existing(new Arrow(this.scene, this.x, this.y, this.pointer));
          this.arrows.push(arrow);
          this.lastShot = time;
          this.arrowsLeft -= 1;
          this.updateText();
        }
      }
    }

    this.anims.play(this.isMoving() ? 'knight_m_run' : 'knight_m_idle', true);

    if (this.body.blocked.down) {
      //console.log(this.body);
    }
  }
}

