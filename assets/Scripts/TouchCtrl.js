
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        player: {
            default: null,
            type: cc.Node,
        },
        playerSpeed: 200
    },

    onLoad: function(){
        var self = this;
        self.labelComp = self.player.getComponent(cc.Label);
        self.isMoving = false;
        self.moveToPos = cc.v2(0, 0);
        self.canvas.on(cc.Node.EventType.TOUCH_START, function(event){
            self.isMoving = true;
            var touch = event.getTouches()[0];
            var touchLocation = touch.getLocation();
            var parent = self.player.parent;
            self.moveToPos = parent.convertToNodeSpaceAR(touchLocation);
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            var touch = event.getTouches()[0];
            var touchLocation = touch.getLocation();
            self.moveToPos = self.player.parent.convertToNodeSpaceAR(touchLocation);
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false;
        }, self.node);
    },

    update: function (dt) {
        if(!this.isMoving) return;
        var pos = this.player.position;
        if(this.moveToPos.sub(pos).mag() > 6){
            var direction = this.moveToPos.sub(pos).normalize();
            var newPos = pos.add(direction.mul(this.playerSpeed * dt));
            this.player.setPosition(newPos);
        }
    },
});
