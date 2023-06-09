import Phaser from 'phaser';
export class Goblin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'atlas', 'goblin_idle_anim_0');
        this.setName('Goblin');
        scene.physics.add.existing(this);
        this.body.maxSpeed = 10;
        this.body.setDrag(200);
        
        
        //this.scene.physics.moveToObject(this, target, 300);
        this.anims.create({
            key: 'goblin_idle',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_idle_anim_',start:0, end: 3}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.create({
            key: 'goblin_run',
            frames: this.anims.generateFrameNames('atlas', { prefix: 'goblin_run_anim_',start:0, end: 3}),
            repeat: -1,
            frameRate: 8
        });
        this.anims.play('goblin_idle');
        scene.physics.add.collider(this, scene.map.layers[0].tilemapLayer);

    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);
        this.scene.physics.moveToObject(this, this.scene.children.getByName('Player'), 40);

    }
}