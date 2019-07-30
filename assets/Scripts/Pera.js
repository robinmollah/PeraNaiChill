
cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 4,
            max: 400,
            min: 40,
            step: 10,
        },
        lifetime: 100,
    },


    start () {

    },

    update: function (dt) {
        this.node.y -= Math.random() * dt * this.speed;
    },

    init: function(){
        this.node.y = 0;
        // TODO Random x axis within viewport || Math.randome() - 0.5 for negative number
    }
});
