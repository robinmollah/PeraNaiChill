let peraTypes = ['Lift', 'Preadvising','Advising','Assignments','MNS',
                'Termpaper','Drama','Project','Groupwork','Snakes','Jam',
                'Fuckboys','Hoes','Seniors','Snakes'];
let isShuffled = 0;
let isBitten = 0;
let positives = [
    { name : 'lift', score: 10},
    {name: 'Preadvising', score: 10},
    {name: 'Advising', score: 10},
    {name: 'Assignments', score: 10},
    {name: 'Termpaper', score: 10},
    {name: 'Friends', score: 10},
    {name: 'Project', score: 10},];
let notificationManagerPath = '/Canvas/Notification';


let notify = function (msg){
    return cc.find(notificationManagerPath).getComponent('NotificationManager').show(msg);
};
let negatives = [{ name: 'Jam', func: function(){
        let touchctrl = cc.find('TouchCtrl').getComponent('TouchCtrl');
        touchctrl.playerSpeed *= 0.8;
        if(touchctrl.playerSpeed < 190){
            gameOver("You died in jam", );
        }
        notify("Movement speed slowed down by jam.");
    } },
    { name: 'Drama', func: function(){
        notify("Dramabaz, Speeding up.");
        cc.find('/Canvas/SpawnArea').getComponent('Spawner').speedUpFactor *= 1.2;
    } },
    { name: 'fuckboys', func: function(){
        notify("Fuckboy! Maintain a healthy distance.");
        let collider = cc.find('/Canvas/Player').getComponent(cc.BoxCollider);
        collider.size.width *= 1.1;
        } },
    { name: 'Hoes', func: function(){
        notify("You are puzzled by a hoe.");
        isShuffled += 20; // getPeraName() reverses the program
        } },
    { name: 'Snakes', func: function(){
        notify("A venoumous snake bitten you. Avoid next 5 friends.");
        isBitten = 5; // getRandomPera() deducts the score of next 5 friends.
        } }
        // TODO reverse text
        // TODO talbahana move
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
            if(this.realSpeed >= 1100){
                gameOver("You are exhausted by Peras.");
            }
        }
        // TODO if speedFactor too much game over
        // TODO if too much pera on board, game over, you are exhausted by pera
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
        if(isBitten > 0 && peras[index].name.toLowerCase() == 'friends'){
            peras[index].score = -10;
            isBitten--;
        }
        return this.pickedPera = peras[index];
    },

    getPeraName: function() {
        let string = this.getRandomPera().name;
        string = string.toLowerCase();

        function randomizeString(string) {
            let shuffled = '';
            while(string.length > 0){
                if(Math.random() > 0.5){
                    shuffled = shuffled + string[string.length-1];
                } else {
                    shuffled = string[string.length - 1] + shuffled;
                }
                string = string.substring(0, string.length -1);
            }
            return shuffled;
        }
        function reverseString(string){
            let reversed = '';
            while(string.length > 0){
                reversed += string[string.length-1];
                string = string.substring(0, string.length -1);
            }
            return reversed;
        }
        string = string.substring(0,5);
        if(isShuffled > 0){
            string = randomizeString(string);
            isShuffled--;
        }
        while(string.length < 5) string+= "s";

        return string;
    },
});

function gameOver(reason){
    let playerScore = cc.find('/Canvas/Player').getComponent('Player').score;
    cc.director.loadScene('/Scenes/GameOverScene', function(){
        let canvas = cc.director.getScene().getChildByName('Canvas');
        let label = canvas.getChildByName('ScoreLabel')
            .getComponent(cc.Label);
        let reasonLabel = canvas.getChildByName('ReasonLabel').getComponent(cc.Label);
        label.string = "Score: " + playerScore;
        reasonLabel.string = reason;
    });
};
