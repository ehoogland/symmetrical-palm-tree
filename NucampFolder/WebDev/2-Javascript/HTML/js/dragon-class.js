class Dragon {
    constructor(color, maxHP) {
        this.color = color;
        this.maxHP = maxHP;
    }
    // a default method for the Dragon class
    // this method is not required to be overridden by subclasses
    roar() {
        console.log(`The ${this.color} dragon lets out a tremendous roar!`);
    }
}    
    const dragon = new Dragon("red", 1200);
    const dragon2 = new Dragon("blue", 1000);
    dragon//.roar();
    dragon2.roar();