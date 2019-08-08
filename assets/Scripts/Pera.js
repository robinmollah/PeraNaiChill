var peraTypes = [];

cc.Class({
    extends: cc.Component,

    properties: {
        speed: {
            default: 4,
            max: 400,
            min: 40,
            step: 10,
        },
        active: false,
    },

    update: function (dt) {
        // if(!this.active) return;
        this.node.y -= dt * this.speed;
        if(this.node.y < -680){ // FIXME screen height
            this.node.parent.emit('passed', this.node);
        }
    },

    init: function(){
        this.node.y = 0;
        this.node.x = this.getRandomPosition();
    },

    getRandomPosition: function(){
        return (Math.random()*0.9 - 0.5) * this.node.parent.width;
    }
});
