cc.Class({
    extends: cc.Component,

    properties: {
        peraPrefab: {
            default: null,
            type: cc.Prefab,
        },
        spawnRate: {
            default: 2,
            max: 20,
            min: 1,
        },
    },


    onLoad: function () {
        this.peraPool = new cc.NodePool();
        let initCount = 5;
        for(let i = 0; i < initCount; i++){
            let pera = cc.instantiate(this.peraPrefab);
            this.peraPool.put(pera);
        }
        this.schedule(this.createPera, Math.random());
    },

    createPera: function(){
        let pera = null;
        if(this.peraPool.size() > 0){
            pera = this.peraPool.get();
        } else {
            pera = cc.instantiate(this.peraPrefab);
        }
        pera.parent = this.node;
        pera.getComponent("Pera").init();
        cc.log(pera.getComponent("Pera"));
        this.scheduleOnce(function(){
            this.peraPool.put(pera);
        }, pera.getComponent("Pera").lifetime);
    }
});
