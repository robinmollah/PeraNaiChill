
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    startScene(){
        let director = cc.director;
        director.loadScene('/Scenes/GamePlayScene', null);
    }

    // update (dt) {},
});
