let scoreLabelPath = 'Canvas/ScoreLabel/ScoreLabel';


cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
        this.score = 0;
    },

    onCollisionEnter(other){
        if(other.getComponent('Pera').pickedPera.func){
            other.getComponent('Pera').pickedPera.func();
        } else if(other.getComponent('Pera').pickedPera.score){
            this.score += other.getComponent('Pera').pickedPera.score;
            let scoreLabel = cc.find(scoreLabelPath).getComponent(cc.Label);
            let animation = cc.find('/Canvas/ScoreLabel').getComponent(cc.Animation);
            animation.play('scoreup');
            scoreLabel.string = "Score: " + this.score;
        }
        other.getComponent('Pera').init();
    },

    onCollisionExit(other, self){
        // cc.log("Collision done!");
    }
    // update (dt) {},
});
