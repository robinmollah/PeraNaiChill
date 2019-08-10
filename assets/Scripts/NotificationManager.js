
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        // this.getComponent(cc.Label).string = '';
    },

    show: function (msg) {
        let label = this.getComponent(cc.Label);
        label.string = msg;
        this.scheduleOnce(function () {
            label.string = '';
        }, 3); // Notification will be vanished after 2 sec.
        let animation = this.getComponent(cc.Animation);
        animation.play();
    },
});
