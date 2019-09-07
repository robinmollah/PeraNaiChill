
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    newGame(){
        let director = cc.director;
        director.loadScene('/Scenes/GamePlayScene', null);
    },
});
