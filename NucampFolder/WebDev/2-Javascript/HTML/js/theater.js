const GENERAL_ADMISSION_TICKET_COST = 20.00;
const CHILD_AND_SENIOR_TICKET_COST = 10.00;
const MATINEE_DISCOUNT = 3.00;

//
function buyTicket() {
    const age = prompt("Please enter your age:");
    let cost = getBaseTicketCost(age);
    const isMatinee = prompt('Are you attending a matinee?');
    cost = Matinee(cost, isMatinee);
    alert("Your ticket price is $" + cost);
}

// This function determines the base ticket cost based on the user's age.
// If the user is 12 or younger, or 65 or older, they receive a discounted ticket.
// Used ternary operator over several lines for readability.
function getBaseTicketCost(age) {
    (age <= 12 || age >= 65)? 
    cost = CHILD_AND_SENIOR_TICKET_COST : 
    cost = GENERAL_ADMISSION_TICKET_COST;
    return cost;
}

// This function applies a discount if the user is attending a matinee.
// If the user is attending a matinee, they receive a discount on their ticket. 

function Matinee (cost, isMatinee){
    if (isMatinee.toLowerCase() === 'yes' || isMatinee.toLowerCase() === 'y') {
        cost = cost - MATINEE_DISCOUNT;
    }
    return cost;
}



  /*
const timeOfDay = prompt("Please enter the time of day (morning, afternoon, evening):").toLowerCase();
            
            
            && (timeOfDay === "morning" || timeOfDay === "afternoon")) {
        ticketPrice = CHILD_AND_SENIOR_TICKET_COST - MATINEE_DISCOUNT;
    } else {
        ticketPrice = GENERAL_ADMISSION_TICKET_COST - MATINEE_DISCOUNT;
    }

    if (timeOfDay === "evening" && (userAge >= 12 && userAge < 65)) {
        ticketPrice = GENERAL_ADMISSION_TICKET_COST;
    } else {
        ticketPrice = CHILD_AND_SENIOR_TICKET_COST;
    }
    
    alert(`The ticket price is $${ticketPrice.toFixed(2)}.`);
    console.log(`Ticket price for age ${userAge} in the ${timeOfDay} is $${ticketPrice.toFixed(2)}.`);
}
const userAge = prompt("Please enter your age:");
const timeOfDay = prompt("Please enter the time of day (morning, afternoon, evening):").toLowerCase();

if ((userAge < 12 || userAge >= 65) && (timeOfDay === "morning" || timeOfDay === "afternoon")) {
    ticketPrice = DiscountedAdmission - MatineeDiscount;
} else {
    ticketPrice = GeneralAdmission - MatineeDiscount;
}

if (timeOfDay === "evening" && (userAge >= 12 && userAge < 65)) {
    ticketPrice = GeneralAdmission;
} elsealert('The ticket price is: $' + cost); {
    ticketPrice = DiscountedAdmission;
}
alert(`The ticket price is $${ticketPrice.toFixed(2)}.`);
console.log(`Ticket price for age ${userAge} in the ${timeOfDay} is $${ticketPrice.toFixed(2)}.`);
*/