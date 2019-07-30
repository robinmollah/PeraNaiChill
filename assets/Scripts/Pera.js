
cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 4,
            max: 400,
            min: 40,
            step: 10,
        },
    },


    start () {

    },

    update: function (dt) {
        this.node.y -= Math.random() * dt * this.speed;
    }
});
