let spawnCo = 900;

cc.Class({
    extends: cc.Component,

    properties: {
        peraPrefab: {
            default: null,
            type: cc.Prefab,
        },
        spawnRate: {
            default: 0.5,
            max: 1,
            min: 0,
        },
        max_pera_count: {
            min: 1,
            max: 30,
            step: 1,
            default: 1,
        },
        speedUpFactor: 1,
    },

    onLoad: function () {
        let self = this;
        this.peraPool = new cc.NodePool();
        let initCount = 10;
        for(let i = 0; i < initCount; i++){
            this.spawnPera(self);
        }
        this.node.on('passed', function(pera){
            self.respawnPera(pera);
        });
        this.node.on('wavePassed', function(){
            self.spawnPera();
            self.spawnPera();
        });
    },


    spawnPera: function(){
        let pera = cc.instantiate(this.peraPrefab);
        this.respawnPera(pera);
    },


    respawnPera: function(pera){
        this.peraPool.put(pera);
        pera.parent = this.node;
        pera.getComponent("Pera").init();
    },
});
