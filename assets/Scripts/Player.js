
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    onCollisionEnter(other, self){
        other.getComponent('Pera').init();
        cc.log("Collided : Deduct score");
    },

    onCollisionExit(other, self){
        // cc.log("Collision done!");
    }
    // update (dt) {},
});
