function rollDice() {
    let goldCoins = 0;
    for (let i = 0; i < 10; i++) {
   
    // Generate a random number between 1 and 6 and bind it to the variable roll
        const roll = Math.floor(Math.random() * 6) + 1;
           // If the roll is 6, add 10 gold coins
        if (roll === 1) {
            alert("Game Over! You rolled a 1.");
            break;
        } else if (roll === 2 || roll === 3 || roll === 4) {
            alert("You rolled a " + roll + ".");
            continue;
        } else if (roll === 5) {
            alert("You rolled a 5! You win 5 gold coins.");
            goldCoins += 5;
            continue;
        } else if (roll === 6) { // or just else when (roll === 6)
            alert("You rolled a 6! You win 10 gold coins.");
            goldCoins += 10;
            continue;
        } 

    }
    

    alert("You finished the game with " + goldCoins + " gold coins.");
    return goldCoins;
}
 
    // This function simulates rolling a die
    // It returns a random number between 1 and 6
    // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive)
    // Multiplying by 6 gives a range from 0 to 5.999
    // Adding 1 shifts the range to 1 to 6
    // Math.floor() rounds down to the nearest whole number
    // Thus, the final result is a random integer from 1 to 6
    // Example usage: console.log(rollDice());
    // It is a pure function that always returns the same output for the same input (no parameters)