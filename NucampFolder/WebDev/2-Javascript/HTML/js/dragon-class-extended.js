// Next, remake the Dragon class, also using a constructor. 
// This constructor will have three parameters: type, color, element:
class Dragon extends Monster {
    constructor(type, color, element) {
        super(type, color);
        this.element = element;
    }
    fly() {
       console.log(`The ${this.color} ${this.element} ${this.type} flaps its wings and begins to fly.`);
    }
}