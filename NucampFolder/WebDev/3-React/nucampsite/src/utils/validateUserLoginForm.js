/**
 * Validates the user login form values.
 * @name validateUserLoginForm
 * @type {Function}
 * @description This function checks the username and password fields for the following:
 * - Username is required, must be between 6 and 15 characters.
 * - Password is required, must be at least 8 characters.
 * @param {Object} values - The form values to validate.
 * @param {string} values?.username - The username to validate.
 * @param {string} values?.password - The password to validate.
 * @operator ? - the optional chaining operator provides a safe way to access properties
 * or call methods on potentially null or undefined objects without causing a runtime error. 
 * You can access deeply nested properties without having to check whether each 
 * reference in the chain is nullish (null or undefined).
 * @returns undefined if values is null/undefined; otherwise it returns values.username.
 * @operator ?? - The nullish coalescing operator (??) returns the right-hand operand
 * when the left-hand operand is null or undefined. The nullish coalescing operator (??) 
 * distinguishes itself from the logical OR operator (||) because ?? only reacts to null
 * or undefined, whereas || reacts to any falsy value. This means ?? allows you to preserve
 * values like 0, "", or false if they are intended as valid inputs, providing a more precise
 * way to handle default values.
 * @function trim() - Removes whitespace from both ends of a string.
 * @function length - The length property of a string returns the number of characters in the string.
 * @function includes() - Determines whether a string contains a specified substring.
 * @return {Object} An object containing validation errors, if any.
 * @variable {Object} errors - An object to hold validation error messages.
 * @variable {Object} values - The form values to validate.
 */

export function validateUserLoginForm(values) {
    const errors = {};

    const username = (values?.username ?? '').trim();
    const password = (values?.password ?? '').trim();

    if (!username) {
        errors.username = 'Username is required';
    } else if (username.length < 6) {
        errors.username = 'Username must be at least 6 characters';
    } else if (username.length > 15) {
        errors.username = 'Username must be 15 characters or fewer';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    return errors;
}
