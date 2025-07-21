const listItems = [];


 

function getItem(event) {    // This function is called when the form is submitted.
    // The event parameter is an object that contains information about the event.
    // We can use this object to prevent the default behavior of the form submission.
    // The default behavior of a form submission is to reload the page,
    // which we don't want to happen in this case.
    // So we can call event.preventDefault() to prevent the default behavior.
    // This will stop the form from submitting and reloading the page.
    // Instead, we can handle the form submission in our own way.
    event.preventDefault(); // Prevent form submission
    // Create local variable inside function; assign it
    // to the DOM node containing the input.
    // One way is to target the ID of the input, which is #item in the HTML.
    // However, we only want to get the value of the input, not the entire input element.
    // Since the value property of the input element contains the text that the user has entered,
    // we can use document.getElementById("item") to get the input element,
    // and then access its .value property to get the text that the user has entered.
    // The .value property is a string that contains the text that the user has entered.
    // In this case, we are getting the value of the input element with the ID "item".
    // The input element is an object, and the .value property is a property of that object.
    // So we can use document.getElementById("item").value to get the value of the input element.
    // This will return a string that contains the text that the user has entered.
    // In this case, we are getting the value of the input element with
    // whatever data is stored inside the value property on this object.
    // So we can use the .value property to get the value of the input.
    const item = document.getElementById("item").value.trim();

    if (!listItems.includes(item.value)) { // Check if the item is not already in the list
        listItems.push(item); // Add the item to the list
        listItems.sort();
    } else {
        console.log(`${item} is already in the list.`); // Log the item to the console
    }
    document.getElementById("item").value = ""; // Clear the input field
    console.log(listItems);

}