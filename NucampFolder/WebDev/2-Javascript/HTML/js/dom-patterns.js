const colorsArr = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

let topPosition = 25;
let leftPosition = 25;
let width = 500;
let height = 500;

function showPattern() {
while (width > 50) {
     const randomColorIdx = Math.floor(Math.random() * colorsArr.length);
        // document.createElement used to create a new div element
        const newDiv = document.createElement('div');
        // CSS properties of new div element use global variables' values
        newDiv.style.top = topPosition + 'px';
        newDiv.style.left = leftPosition + 'px';
        newDiv.style.width = width + 'px';
        newDiv.style.height = height + 'px';
        
        // a random color from the array for the background:
        newDiv.style.background = colorsArr[randomColorIdx];

        // Attach div just created to the DOM. Attach it with the following:
        document.body.appendChild(newDiv);

        // Update the values of these variables. Values will be used in next
        // iteration to set the properties of the next div that is created:
        topPosition += 10;
        leftPosition += 10;
        width -= 20;
        height -= 20;
    }
}