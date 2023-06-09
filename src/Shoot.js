import * as Phaser from "phaser"

export class Bullet extends Phaser.Physics.Arcade.Sprite
{
    stop()
    {
        this.scene.physics.moveToObject(this, this.target, 0);
        this.pickable = true;
    }

    destroyMe()
    {
        this.player.deleteArrow();
        this.destroy();    
    }


    constructor(scene,x,y, target, floor, player){
        super(scene, x, y);
        scene.physics.add.existing(this);
        this.setTexture('atlas', 'weapon_arrow');
        this.setScale(4);
        this.body.setMaxSpeed(800);
        this.body.useDamping = true;
        //this.body.setDrag(0.5, 0.5);
        console.log(Phaser.Math.Angle.BetweenPoints(this, target));
        this.rotation = Phaser.Math.Angle.BetweenPoints(this, target)+Math.PI/2;
        
        this.inZone = false;
        this.scene = scene;
        this.target = target;
        this.player = player;
        this.pickable = false;
        

 
        scene.physics.moveToObject(this, target, 800);
        scene.physics.add.collider(this, floor, () => {this.stop();}, null, this);
        scene.physics.add.collider(this, player, () => {this.destroyMe();}, null, this);
        
        this.player.addArrow();

    }
}