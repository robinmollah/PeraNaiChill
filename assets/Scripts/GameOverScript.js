
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    startScene(sceneName){
        let director = cc.director;
        director.loadScene('/Scenes/' + sceneName, null);
    }

    // update (dt) {},
});
