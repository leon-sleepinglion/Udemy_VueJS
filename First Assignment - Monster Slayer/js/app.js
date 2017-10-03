vm = new Vue({
	el: "#app",
	data: {
		gameOn: false,
		playerHP: 100,
		monsterHP: 100,
		logs: []
	},
	computed: {
		playerHPBar(){return this.playerHP+"%";},
		monsterHPBar(){return this.monsterHP+"%";}
	},
	methods: {
		startGame(){
			this.playerHP = 100;
			this.monsterHP = 100;
			this.logs = [];
			this.gameOn = true;
		},
		attack(){
			var damage = this.randomNumber(5, 11);
			this.monsterHP -= damage;
			this.logs.unshift({isPlayer: true, description: "PLAYER HITS MONSTER FOR "+damage});
			if(this.dirtyChecking()) return;
			else this.monsterAttack();
		},
		specialAttack(){
			var damage = this.randomNumber(10, 16);
			this.monsterHP -= damage;
			this.logs.unshift({isPlayer: true, description: "PLAYER HITS MONSTER FOR "+damage});
			if(this.dirtyChecking()) return;
			else this.monsterAttack();
		},
		heal(){
			if((this.playerHP + 10) > 100)
				this.playerHP = 100;
			else
				this.playerHP += 10;
			this.logs.unshift({isPlayer: true, description: "PLAYER HEALS HIMSELF FOR 10"});
			if(this.dirtyChecking()) return;
			else this.monsterAttack();
		},
		giveUp(){
			this.gameOn = false;
		},
		monsterAttack(){
			var damage = this.randomNumber(5,11);
			this.playerHP -= damage;
			this.logs.unshift({isPlayer: false, description: "MONSTER HITS PLAYER FOR "+damage});
			this.dirtyChecking();
		},
		randomNumber(min, max){
			return Math.floor(Math.random() * (max-min) + min);
		},
		dirtyChecking(){
			if(this.playerHP <= 0)
				return this.box("You lose! New Game?");
			else if(this.monsterHP <=0)
				return this.box("You win! New Game?");
			else
				return false;
				
		},
		box(message){
			var r = confirm(message);
			if (r==true){
				this.startGame();
				return true;
			}
			else{
				this.giveUp();
				return true;
			}
		}
	}
});