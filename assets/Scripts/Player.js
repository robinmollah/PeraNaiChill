
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
        if(other.getComponent('Pera').pickedPera.func){
            other.getComponent('Pera').pickedPera.func();
        }
        other.getComponent('Pera').init();
    },

    onCollisionExit(other, self){
        // cc.log("Collision done!");
    }
    // update (dt) {},
});
