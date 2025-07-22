const shoppingList = [];



function resetAndFocus() {
    document.getElementById("myForm").reset(); // Clear the HTML form's input field,
    // of anything that was entered, in this case generally whitespace.
    document.getElementById("item").focus(); // Set focus back to the input field
    return;
}

function getItem() {
    event.preventDefault(); // Prevent form submission
    // Create local variable inside function; assign to DOM node containing user input.
    // One way is to target the ID of the input, which is #item in the HTML.
    // However, we only want to get the value of the input, not the entire input element.
    // Since the value property of the input element contains the text that the user has entered,
    // we can use document.getElementById("item") to get the input element's value.

    // The trim() method removes whitespace from both ends of the string.
    const item = document.getElementById("item").value.trim();
    if (item === "") { console.log("Please enter an item."); }
    // remember we have previously bound const item to just the trimmed value of
    // the input field and not to the entire input element.
    if (!shoppingList.includes(item)) { // Check if the item variable is not already in the list
        shoppingList.push(item);
        // research note: ES2023 nonmutating method to sort the array, toSorted()
        shoppingList.sort(); 
        // Call the displayList function to update the HTML with the new item
        //displayList(); // Call the function to display the list
        console.log(`${item} has been added to the list.`); // Log the item (variable) to the console     
    } else {
        console.log(`${item} is already in the list.`); // Log the item (variable) to the console
        // Clear the HTML form's input field
    }
    // avoid redundant code by calling the resetAndFocus function
    // to clear the HTML form's input field and set focus back to the input field.
    resetAndFocus(); // Call the function to reset and focus
    // and exit the function to prevent further execution
    console.log(shoppingList);
    return;
}
/**
 * Function to display the shopping list items in the HTML document.
 * It clears the existing list and appends each item from the shoppingList array.
 * This function is called after an item is added to the list.
 * It uses the textContent property to set the content of the list items.
*//*
function displayList() {
    const shoppingList = document.getElementById("shoppingList");
    // alternative to using innerHTML
    shoppingList.textContent = ""; // Clear the list before displaying items
    
    //The function uses forEach to iterate over the shoppingList array and create a list item for each element.
    // It uses the textContent property to set the content of the list items.
    // It appends each list item to the shoppingList element in the HTML document.
    // It uses the textContent property to set the content of the list items.
    // It appends each list item to the shoppingList element in the HTML document.
    // and create a list item for each element
    shoppingList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}*/
