
let data1 = {
  name: "John Doe",
  age: 30
};

let json1 = JSON.stringify(data);

console.log(json); 

// {"name":"John Doe","age":30}

//Parsing JSON in JavaScript

// To convert JSON back into a JavaScript value, 
// we use the JSON.parse() method:

let json2 = '{"name":"John Doe","age":30}';
let data2 = JSON.parse(json2);
console.log(data2.name); // John Doe
/*
Use Cases

JSON is commonly used for:

Storing data in files or databases
Transmitting data between a server and web application
Implementing web APIs that return JSON data

Conclusion
JSON provides a simple and universal way to represent structured data that can be easily transmitted 
between different systems and programming languages. Its simple syntax makes it easy to read and write 
for humans, and parse and generate for machines. JSON is an essential technology for building and 
consuming web APIs and handling data in web and mobile apps.
*/
