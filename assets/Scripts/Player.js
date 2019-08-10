
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

    onCollisionEnter(other, self){
        if(other.getComponent('Pera').pickedPera.func){
            other.getComponent('Pera').pickedPera.func();
        } else if(other.getComponent('Pera').pickedPera.score){
            this.score += other.getComponent('Pera').pickedPera.score;
            let scoreLabel = cc.find('/Canvas/ScoreLabel').getComponent(cc.Label);
            scoreLabel.string = "Score: " + this.score;
        }
        other.getComponent('Pera').init();
    },

    onCollisionExit(other, self){
        // cc.log("Collision done!");
    }
    // update (dt) {},
});
