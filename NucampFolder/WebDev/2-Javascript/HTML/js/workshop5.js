class Student {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
testStudent = new Student('Bugs Bunny', 'bugs@bunny.com');
console.log(testStudent);
if ( testStudent.name === 'Bugs Bunny' && testStudent.email === 'bugs@bunny.com' ) {
console.log('TASK 1: PASS');
}
