
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    onCollisionEnter(other, self){
        other.node.y = 0;
    },
    onCollisionExit(other, self){
        cc.log("Collision done!");
    }
    // update (dt) {},
});
