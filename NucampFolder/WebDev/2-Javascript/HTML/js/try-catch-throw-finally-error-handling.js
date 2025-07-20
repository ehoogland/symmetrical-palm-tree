/*
    Week 3: Objects, Classes, and JSON
    Error Handling and Debugging

Error Handling and Debugging
Completion requirements
To do: View
1. Error Handling

Error Handling

Coding errors, incorrect inputs, and other unforeseeable issues can all lead to errors in your JavaScript code. Today, we'll discuss how to handle these errors and how to debug them.

Error handling is particularly important when working with data from external sources or user inputs, as these can be unpredictable. You'll often find error handling in conjunction with API calls and asynchronous code.
The Basic Keywords of Error Handling

Error handling in JavaScript revolves around four keywords: try, catch, finally, and throw.

    The try keyword allows you to test a block of code for errors.
    Catch enables you to handle the error.
    Throw lets you create custom errors.
    Finally executes code after the try and catch blocks, regardless of the outcome.

An Example

Let's dive into some code. We'll start by writing a try block of code to test for any potential errors.
*/
try {
  console.log("start of try runs"); // "start of try runs" 
  nucamp; // error, there's no such variable!
  console.log("end of try (never reached)"); // skipped due to error
} catch(error) {
  console.log("Error has occurred", error.stack); // "Error has occurred ReferenceError: nucamp is not defined"
} finally {
  console.log("this is the finally block"); // always runs
}
/*
This program starts by logging "start of try runs". 
It then encounters an error because there's nothing named "nucamp" in the program. 
Upon encountering an error, it skips the rest of the try block and jumps directly to the catch block.

In the catch block, we pass an error object (err) and then log "Error has occurred",
followed by err.stack, which provides a stack trace.

The error object primarily has two properties: name and message. 
The name here is 'ReferenceError', while the message reads "nucamp is not defined".

The finally block always runs, regardless of whether an error occurred.


Important Note

It's crucial to note that try-catch only works with runnable code. The code must be valid JavaScript. 
For instance, if there's an opening brace without a matching closing brace, try-catch won't work, 
resulting in a parse-time error. 

In essence, try-catch handles runtime errors, requiring the code to be executable.

Custom Errors with 'Throw'

While JavaScript has several built-in errors, you can create custom ones using 'throw'. 
Let's discuss 'throw' within a practical use case for 'try-catch'.

Imagine you're fetching data from a server, often JSON data, maybe through an API call. 
Let's simulate this scenario:
*/
try {
//let userData = '{"age": 30 }'; // data received from server
// let userData = '{"name": "Joe", "age": 30 }'; // my correction of data received from server
  let user = JSON.parse(userData); // parsing JSON
 

  
  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); 
  }

  console.log(user.name); 

} catch(e) {
  console.log("jsonErr " + e.message);
  console.log(e.name); 
  console.log(e); 
}
/*
We parse the received data with JSON.parse. If the user data doesn't include a name, we throw a new SyntaxError, stating "Incomplete data: no name".

The error's name is SyntaxError, which we can see when we log e.name. The error message "Incomplete data: no name" is displayed when we log e.message.

If the user data included a name, the name would be logged. However, since it doesn't, the error is thrown and subsequently caught, resulting in the error message being logged.

In conclusion, understanding error handling is crucial for writing robust JavaScript code. The try, catch, finally, and throw statements offer a way to handle errors gracefully and continue executing your code. Always remember, a good programmer is not the one who does not make mistakes but the one who handles them effectively.
*/