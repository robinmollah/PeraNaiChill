let scoreLabelPath = 'Canvas/ScoreLabel/ScoreLabel';


cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel : {
            default: null,
            type: cc.Label,
        },
        animation: {
            default: null,
            type: cc.Animation,
        }
    },


    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
        this.score = 0;
    },

    onCollisionEnter(other){
        let pickedPera = other.getComponent('Pera').pickedPera;
        if(pickedPera.func){
            pickedPera.func();
        } else if(pickedPera.score){
            this.score += pickedPera.score;
            this.animation.play();
            if(this.score % 100 == 0){
                other.node.parent.emit('wavePassed');
            }
            this.scoreLabel.getComponent(cc.Label).string = "Score: " + this.score;
        }
        other.getComponent('Pera').init();
    },

    onCollisionExit(other, self){
        // cc.log("Collision done!");
    }
    // update (dt) {},
});
