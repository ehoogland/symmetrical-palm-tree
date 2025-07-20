
        class Monster {
        roar() {
        console.log("The monster lets out a tremendous roar!");
    }
}
//From this parent class of Monster, we can create a child class, Dragon.
//To do this, we need to use the extends keyword:
class Dragon extends Monster {
    fly() { 
       console.log("The dragon flaps its wings and begins to fly.");
    }
}
//Then we can create a new dragon from the Dragon class:
const dragon3 = new Dragon();
// And you can see that it has inherited the roar() method from the Monster class, even though it doesn't exist in the Dragon class:
dragon3.roar();
// And it also has the fly method from the Dragon class:
dragon3.fly();
// You could create a monster from just the Monster class, and it would be able to roar(), 
// but it would not be able to fly(). 
// Child classes automatically inherit the methods of their parent class, but not vice versa.

// Super and properties
// F5 (refresh) to clear the console.
//Remember, for any class to store default properties, it must have a constructor method.
//Recreate the Monster class, this time with a constructor for the type and color, 
// and using those properties in the roar() method as well:
class Monster {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.isScary = true;
    }
    roar() {
        console.log(`The ${this.color} ${this.type} lets out a tremendous roar!`);
    }
}
// Notice that two properties are passed into the constructor, 
// but one property (isScary) is created in the constructor. 
// This is a variable that we want to always have set to true for all monsters, 
// so we do not need to pass it in, it's just created and set in the constructor. 
// Next, remake the Dragon class, also using a constructor. This constructor will have three parameters: type, color, element:
class Dragon extends Monster {
    constructor(type, color, element) {
        super(type, color);
        this.element = element;
    }
    fly() {
       console.log(`The ${this.color} ${this.element} ${this.type} flaps its wings and begins to fly.`);
    }
}
/*
The super method is a special method for child constructors to pass those properties that are inherited from the parent class 
to be initialized in the constructor there. You must use it with inherited properties, properties that are defined in the parent class's constructor.
The element property here is a property of the child class, not inherited from the parent class. So this property is initialized in the child class's constructor. 
Then all properties are able to be used inside the fly() method. 
Now try creating a method from the Dragon class:
*/
const dragon1 = new Dragon("dragon", "blue", "water");
dragon1.roar();
dragon1.isScary;
dragon1.fly();
// You can see that the dragon1 object has received the roar() method and the isScary property from the parent class, 
// and also has its own fly() method which can access the type, color, and element.
// Create a different child class from the parent Monster class:
class Werewolf extends Monster {
    constructor(type, color) {
        super(type, color);
    }
    howl() {
        console.log(`The ${this.type} howls loudly.`);
    }
}
// Then create a new werewolf object:
const werewolf1 = new Werewolf("werewolf", "gray");
werewolf1.roar();
werewolf1.isScary;
werewolf1.howl();
// Like the dragon, the werewolf can roar, and it has the isScary variable set to true. 
// But unlike the dragon, the werewolf can howl(), but it cannot fly(). 
// Now you can see how useful class inheritance can be: When you have multiple classes 
// that will share some of the properties and methods, but not all, 
// you can set up a parent class for the shared properties and methods and reuse that code. 
