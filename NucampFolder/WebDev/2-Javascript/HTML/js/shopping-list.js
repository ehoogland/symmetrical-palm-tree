const list = [];
const shoppingList = document.getElementById("shoppingList");
// The getItem function is responsible for retrieving the value of the input field
// with the ID "item" and adding it to the shopping list if it is not already present.
// It first retrieves the value of the input field, trims any whitespace,
// and checks if the item is already in the list. If it is not, it adds the item
// to the list, sorts the list, and logs a message to the console.
// If the item is already in the list, it logs a different message.
// After adding the item, it resets the form to clear the input field,
// removes the existing list items from the DOM, and calls the makeList function
// to create new list items in the DOM based on the updated list array.
function showAlert() {
    alert("Please enter an item to add to the shopping list."); // Alert if the input is empty
    console.error("No item entered. Please enter an item to add to the shopping list.");
    reset(); // Clear the HTML form's input field
    console.log("Input field has been reset.");
}

function getItem() {
    event.preventDefault(); // Prevent form submission--deprecated in HTML5

        // Create local variable inside function; assign to DOM node containing user input.
        // One way is to target the ID of the input, which is #item in the HTML.
        // However, we only want to get the value of the input, not the entire input element.
        // Since the value property of the input element contains the text that the user has entered,
    // we can use document.getElementById("item") to get the input element's value.
    // remember we have previously bound const item to just the trimmed value of
    // the input field and not to the entire input element. 
    
    try {
        const item = document.getElementById("item").value.trim(); // Get the value of the input field and trim whitespace

        if (!item) {
            showAlert(); // If the item is empty, show an alert and return
        }

        else if (!list.includes(item) && item) { // Check if the item variable is not already in the list
            list.push(item);
            
            list.sort();
        
            console.log(`${item} has been added to the list.`); // Log the item (variable) to the console     
        } else {
            console.log(`${item} is already in the list.`); // Log the item (variable) to the console
            // Clear the HTML form's input field
        }
        // Clear the HTML form's input field
        reset();
        // debug to ensure grocery items (values) are added to the list array and not duplicated
        // before coding to manipulate the DOM
        // console.log(list); 
    } catch {
        showAlert();
    }

    removeList(); // Call to clear the existing list items in the DOM
    
    // Call the makeList function to create new list items in the DOM
    // based on the updated list array.
    // This will ensure that the DOM reflects the current state of the list array.
    // The makeList function is responsible for creating new list items in the DOM
    // based on the items in the list array. It does this by iterating over the
    // list array and creating a new list item for each element.
    // The function is called after a new item is pushed into the list array
    // and sorted, ensuring that the DOM reflects the current state of the list array.  
    makeList();
}

function reset() {
    document.getElementById("myForm").reset(); // Clear the HTML form's input field,
    // of anything that was entered, in this case generally whitespace.
}
// The function first clears the existing 'shopping list' array values in the DOM by
// setting the textContent of the shoppingList element to an empty string. Then, it
// uses forEach to iterate over the 'list' array, creating a new list item for each element. Each list
// The list item is created using document.createElement("li"), and its textContent
// is set to the current item in the iteration. The list item is then appended
// to the shoppingList element in the HTML document. Additionally, an event listener
// is added to each list item that listens for a click event. When the list item
// is clicked, the removeItem function is called, allowing the user to remove
// an item from the shopping list by clicking on it. The removeItem function is
// defined elsewhere in the code and is responsible for removing the clicked item
// from the list and updating the DOM accordingly.
// The makeList function is responsible for creating new list items in the DOM
// based on the items in the 'list' array. It does this by iterating over
// the 'list' array and creating a new list item for each element.
// The function is called after a new item is pushed into the 'list' array
// and sorted, ensuring that the DOM reflects the current state of the 'list' array.
// The function first clears the existing 'shopping list' array values in the DOM
// by setting the textContent of the shoppingList element to an empty string.
function makeList() {
    // alternative to using innerHTML
    
    // clear existing 'shopping list' array values
    shoppingList.textContent = ""; 
    
    // Function first uses forEach to iterate over the list array, manipulating the DOM
    // to create a new list item for each element of the array. It does so by:
    // 1. Creating a new list item <li> element using document.createElement("li").
    // 2. Setting the textContent property of the list item to the current item
    //    in the iteration.
    // 3. Appending the list item to the shoppingList element in the HTML document
    //    using shoppingList.appendChild(listItem).
    list.forEach(item => {
        const listItem = document.createElement("li");
        // The textContent property of the listItem is set to the current item
        // in the iteration. This means that each list item will display the text
        // of the corresponding item in the list array.
        listItem.textContent = item;

        // Add an event listener to the list item that listens for a click event.
        // When the list item is clicked, the removeItem function will be called.
        // This allows the user to remove an item from the shopping list by clicking on it.
        // The removeItem function is defined elsewhere in the code and is responsible
        // for removing the clicked item from the list and updating the DOM accordingly.
        listItem.addEventListener("click", removeItem);
        // Append the new list item to the shoppingList element
        // in the HTML document.
        // This will add the new list item to the end of the shopping list.
        // The shoppingList variable is a reference to the <ul> element in the HTML document
        shoppingList.appendChild(listItem);
    });
    // Log to console that the shopping list has been updated. The html page will
    // display the updated list of items.
    console.log("Shopping list has been updated."); 
}

function removeList() {
    while (shoppingList.firstChild) {
        shoppingList.removeChild(shoppingList.firstChild);
    }
    console.log("Shopping list has been cleared.");  
}
// The removeItem(event) function is designed to remove the clicked item 
// from the shopping list. It takes an event parameter, which is 
// automatically passed to the function when it is called as an event handler 
// for the click event on a list item. This allows the function
// to access information about the specific item that was clicked.
// The event parameter contains information about the event that occurred,
// such as the element that was clicked and any additional data associated with the event.
function removeItem(event) {
    // The event.currentTarget property refers to the element that the 
    // event listener is attached to, which in this case is the list item that was clicked.
    // The textContent property of the event.currentTarget is used to get the text content of
    // the clicked list item. This text content is then used to remove the item from the
    // list array.
   
    const item = event.currentTarget.textContent;
    const index = list.indexOf(item);
    // Check whether the item exists in the list array before removing it
    try {
        if (index === -1) {
            throw new Error(`${item} is not in the list.`);
        }
        else {
                // Remove item from the list array using splice
                list.splice(index, 1);
                console.log(`${item} has been removed from the list.`);
                // After removing the item from the list array, update the DOM
                // to reflect the changes by calling the removeList function
                // to clear the existing list items in the DOM.
                removeList();
                // Call the makeList function to create new list items in the DOM
                makeList();
            }
    } catch (error) {
        console.error(error.message);
    }
}