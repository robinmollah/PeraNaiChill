let playerSpeed = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        player: {
            default: null,
            type: cc.Node,
        },
        playerSpeed: 200,
    },

    onLoad: function(){
        let self = this;
        self.labelComp = self.player.getComponent(cc.Label);
        self.isMoving = false;
        self.moveToPos = cc.v2(0, 0);
        self.canvas.on(cc.Node.EventType.TOUCH_START, function(event){
            self.isMoving = true;
            let touch = event.getTouches()[0];
            let touchLocation = touch.getLocation();
            let parent = self.player.parent;
            self.moveToPos = parent.convertToNodeSpaceAR(touchLocation);
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            let touch = event.getTouches()[0];
            let touchLocation = touch.getLocation();
            self.moveToPos = self.player.parent.convertToNodeSpaceAR(touchLocation);
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false;
        }, self.node);
        playerSpeed = this.playerSpeed;
    },

    update: function (dt) {
        if(!this.isMoving) return;
        let pos = this.player.position;
        let sub = this.moveToPos.sub(pos);
        if(sub.mag() > 6){
            let direction = sub.normalize();
            let newPos = pos.add(direction.mul(this.playerSpeed * dt));
            this.player.setPosition(newPos);
        }
    },
});
