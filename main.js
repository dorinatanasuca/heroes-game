class Hero {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp; //punctele de viata - healthy points
    this.canFly = false; //nu poate sa zboare
    this.shield = false; //nu are scut
  }
  attacked(damage) {
    if (this.canFly) {
      //this.canFly = true
      let chance = Math.random(); // variabila a fost creata pentru dinamicitate, variabila va primi valoare doar in intervalul [0,1]
      console.log("Chance are valoarea " + chance);
      if (chance > 0.5) {
        console.log(this.name + " flew away.");
        damage = 0;
      }
    }
    if (this.shield) {
      //this.shield = true
      damage *= 0.8; //damage = damage * 0.8; damage scade cu 0.2
      console.log(this.name + " defends with a shield.");
    }
    this.hp -= damage;
    console.log(
      this.name +
        " has been attacked. HP reduced by " +
        damage +
        ". HP remaining: " +
        this.hp +
        "."
    );
  }
}
//clasa Hero este clasa Parinte; clasele Dwarf, Sprite si Dragon sunt clasele Copii.
// cream 3 obiecte (let dwarf, let sprite, let dragon)
// lupta finala se da intre 2 eroi (2 obiecte)
// cand un erou ataca prin metoda attack(otherHero) un alt erou (otherHero), acesta din urma este atacat => se apeleaza metoda attacked din Parinte (otherHero este un obiect si prin ajutorul punctului putem accesa metodele din clasa Hero)
// eroul atacat trebuie sa isi calculeze HP remase (se apeleaza metoda otherHero.attacked(damage) si se calculeaza damage-ul primit)
class Dwarf extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.shield = true; //se apara cu scut
  }
  attack(otherHero) {
    let damage = 10;
    console.log(this.name + " attacked with damage: " + damage + ".");
    otherHero.attacked(damage); //un erou ataca prin metoda attack() si celalalt erou isi calculeaza HP ramas scazand damage-ul primit (calculul se face prin metoda attacked(damage))
  }
}
class Sprite extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.canFly = true; //poate sa zboare
  }
  attack(otherHero) {
    let damage = 15;
    console.log(this.name + " attacked with damage: " + damage + ".");
    otherHero.attacked(damage);
  }
}
class Dragon extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.canFly = true;
    this.shield = true;
  }
  attack(otherHero) {
    let damage = 5;
    console.log(this.name + " attacked with damage: " + damage + ".");
    otherHero.attacked(damage);
  }
}

class Fight {
  constructor(hero1, hero2) {
    this.hero1 = hero1;
    this.hero2 = hero2;
    this.turn = 0;
  }
  performAttack() {
    if (this.turn === 0) {
      this.hero1.attack(this.hero2);
    } else {
      this.hero2.attack(this.hero1);
    }
  }
  changeTurn() {
    this.turn = 1 - this.turn;
  }

  findWinner() {
    let findWinner = ''; 
    if (this.hero1.hp > 0) {
      findWinner = this.hero1.name + " won with " + this.hero1.hp + " HP left.";
      console.log(findWinner);
      return findWinner;
    } else if (this.hero2.hp > 0) {
      findWinner = this.hero2.name + " won with " + this.hero2.hp + " HP left.";
      console.log(findWinner);
      return findWinner;
    } else {
      findWinner = "No heroes left alive.";
      console.log(findWinner);
      return findWinner;
    }
  }

  go() {
    do {
      this.performAttack();
      this.changeTurn();
    } while (this.hero1.hp > 0 && this.hero2.hp > 0);
    this.findWinner();
  }
}

let dwarf = new Dwarf("Khurbada Oakenguard Dwarf", 50);
let sprite = new Sprite("Prinna Bumblelace Sprite", 40);
let dragon = new Dragon("Aphat, The Pun Dragon", 60);

let epicFight = new Fight(dwarf, dragon);
epicFight.go();
