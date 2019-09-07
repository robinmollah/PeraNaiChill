
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let logo = cc.find('/Canvas/Pera-Nai-Chill').getComponent(cc.Animation);
        logo.play();
        logo.on(cc.Animation.EventType.FINISHED, function(){
            logo.play();
        });
    },

    // update (dt) {},

    newGame(){
        let director = cc.director;
        director.loadScene('/Scenes/GamePlayScene', null);
    },
});
