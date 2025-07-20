class Monster {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }
    roar() {
        console.log(`The ${this.color} ${this.type} lets out a tremendous roar!`);
    }
}

class Dragon extends Monster {
    constructor(type, color, element) {
      super(type, color); 
      this.element = element;
    }
    fly() {
        console.log(`The ${this.color} ${this.type} flaps its wings and begins to fly.`);
    }
    hoard() {
      console.log(`The ${this.type} that hoards ${this.element} is on the prowl.`);
    }
}


/* Challenge 2 part 1
Add a new method to the Dragon class that console.logs a behavior of the dragon. This behavior can be anything you wish - use your imagination. Use at least one object property (such as color, element, or type) in the method. */
class Werewolf extends Monster {
   
    constructor(type, color){
      super(type, color);
    }
  howl() {
    console.log(`The ${this.type} howls loudly.`);
    }
  isScary() {
    console.log(`The ${this.color} ${this.type} is super scary.`);
  }
}
/* Challenge 3
Write a line of code that will instantiate a new werewolf object with the variable name werewolf1, using the Werewolf class. Pass in the type of "werewolf" and a color of your choice. Then write a line of code that will call the howl() method on this new object. */
// create a werewolf object
const werewolf1 = new Werewolf("Werewolf of London", "brown");
// these two method calls return undefined after logging to console. Logging is
// a side effect, not a return value. The default return value is undefined, as displayed.
console.log(werewolf1.howl());
console.log(werewolf1.isScary()); // remember this came with the constructor

// remember Dragon is child class of (i.e., extends) Monster
const woodDragon = new Dragon("dragon", "brown", "wood");
// Challenge 1
// call roar() and fly() methods on the woodDragon object
woodDragon.roar();
woodDragon.fly();
/* Challenge 2 part 2 
Below where you called the roar() and fly() methods on the woodDragon object, also call this new method that you just created. */
woodDragon.hoard();

class Zombie extends Monster {
  constructor(type, color, teeth, diet) {
    super(type, color);
    this.teeth = teeth;
    this.diet = diet;
  }
  bites() {
    console.log(`The ${this.color} ${this.type} has ${this.teeth} and is strictly a ${this.diet}!`);
  }
  } 
const zombie1 = new Zombie("zombie", "yellow", "fangs", "carnivore");
zombie1.bites();