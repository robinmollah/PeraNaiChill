let peraTypes = ['Lift', 'Preadvising','Advising','Assignments','MNS',
                'Termpaper','Drama','Project','Groupwork','Snakes','Jam',
                'Fuckboys','Hoes','Seniors','Snakes'];
let positives = [
    { name : 'lift', score: 10},
    {name: 'Preadvising', score: 10},
    {name: 'Advising', score: 10},
    {name: 'Assignments', score: 10},
    {name: 'Termpaper', score: 10},
    {name: 'Friends', score: 10},
    {name: 'Project', score: 10},];

let negatives = [{ name: 'Jam', func: function(){
        cc.log("You are slowed down by jam");
        let touchctrl = cc.find('TouchCtrl').getComponent('TouchCtrl');
        touchctrl.playerSpeed *= 0.8;
        // TODO scheduleOnce to increase the speed
    } },
    { name: 'Drama', func: function(){
        cc.log("You stepped into a dramabaz. Speeding up.");
        cc.find('/Canvas/SpawnArea').getComponent('Spawner').speedUpFactor *= 1.2;
        // TODO scheduleOnce to decrease the pera time
    } },
    { name: 'fuckboys', func: function(){
        cc.log("You are fucked up by a fuckboy.");
        // TODO Increase player size
        } },
    { name: 'Hoes', func: function(){
        cc.log("You are puzzled by a hoe.");
        // TODO Puzzle the first 5 letters of words.
        } },
    { name: 'Snakes', func: function(){
        cc.log("A venoumous snake bitten you. Avoid next 5 friends.");
        // TODO scheduleOnce to decrease
        } }
    ];

let score = 0;

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

    pickedPera: null,

    update: function (dt) {
        // if(!this.active) return;
        this.node.y -= dt * this.realSpeed;
        if(this.node.y < -680){ // FIXME screen height
            this.node.parent.emit('passed', this.node);
        }
    },

    onCollisionEnter: function(other, self){
        self.getComponent('Pera').init();
    },

    init: function(){
        this.node.y = 0;
        this.node.x = this.getRandomPosition();
        let spawner = this.node.parent.getComponent('Spawner');
        this.realSpeed = this.speed;
        if(spawner.speedUpFactor != 1){
            this.realSpeed *= spawner.speedUpFactor;
        }
        this.getComponent(cc.Label).string = this.getPeraName();
        this.getComponent(cc.BoxCollider).size = new cc.size(this.node.width, this.node.height);
    },

    getRandomPosition: function(){
        return (Math.random() - 0.5) * this.node.parent.width;
    },

    getRandomPera: function() {
        let peras = Math.random() > 0.5 ? negatives : positives;
        let index = Math.random() * peras.length;
        index = Math.floor(index);
        return this.pickedPera = peras[index];
    },

    getPeraName() {
        let string = this.getRandomPera().name;
        string = string.toLowerCase();

        function randomizeString(string) {
            // TODO randomize the string
            return string;
        }
        string = string.substring(0,5);
        string = randomizeString(string);
        if(string.length < 5){
            string += "s";
        }
        return string;
    }
});
