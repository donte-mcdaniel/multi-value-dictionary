#!/usr/bin/env node
'use strict';

// Importing modules
const inquirer = require('inquirer');
const colors = require('colors/safe');

// Setting global variables
let dictionary = new Map;

/**
 * Main Prompt
 */
function mainPrompt() {
    inquirer.prompt([
    // questions
    {
        type: 'list',
        message: "Choose an option:",
        name: "options",
        choices: ['KEYS', 'MEMBERS', 'ADD', 'REMOVE', 'REMOVEALL', 'CLEAR', 'KEYEXISTS', 'MEMBEREXISTS', 'ALLMEMBERS', 'ITEMS']
    }
    ]).then((answers) => {
        // user feedback
        console.log(answers.options);
        switch(answers.options) {
            case 'KEYS':
                console.log(keys());
                mainPrompt();
                break;
            case 'ADD':
                promptAdd();
                break;
            case 'REMOVE':
                promptRemove();
                break;
            case 'MEMBERS':
                promptMembers();
                break;
            case 'REMOVEALL':
                promptRemoveAll();
                break;
            case 'CLEAR':
                console.log(clear());
                mainPrompt();
                break;
            case 'KEYEXISTS':
                promptKeyExists();
                break;
            case 'MEMBEREXISTS':
                promptMemberExists();
                break;
            case 'ALLMEMBERS':
                console.log(allMembers());
                mainPrompt();
                break;
            case 'ITEMS':
                console.log(items());
                mainPrompt();
                break;
        }
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Prompt for view members of a specific key
 */
function promptMembers() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter key:",
            name: "key"
        }
    ]).then((answer) => {
        console.log(members(answer.key));
        mainPrompt();
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Prompt for adding a key/value
 */
function promptAdd() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter key:",
            name: "key"
        },
        {
            type: 'input',
            message: "Enter value:",
            name: "value"
        }
    ]).then((answers) => {
        // console.log(answers.key);
        console.log(add(answers.key, answers.value));
        mainPrompt();
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Prompt for removing a key/value
 */
function promptRemove() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter key:",
            name: "key"
        },
        {
            type: 'input',
            message: "Enter value:",
            name: "value"
        }
    ]).then((answers) => {
        console.log(remove(answers.key, answers.value));
        mainPrompt();
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Prompt for removing a key/value
 */
 function promptRemoveAll() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter key:",
            name: "key"
        }
    ]).then((answers) => {
        console.log(removeAll(answers.key));
        mainPrompt();
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Prompt for checking if key exists
 */
 function promptKeyExists() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter key:",
            name: "key"
        }
    ]).then((answers) => {
        console.log(keyExists(answers.key));
        mainPrompt();
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Prompt for checking if member exists
 */
 function promptMemberExists() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter key:",
            name: "key"
        },
        {
            type: 'input',
            message: "Enter value:",
            name: "value"
        }
    ]).then((answers) => {
        console.log(memberExists(answers.key, answers.value));
        mainPrompt();
    }).catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error(error);
        } else {
            // Something else went wrong
            console.error(error);
        }
    });
}

/**
 * Adds value to key
 * @param key dictionary key
 * @param value value being added
 * @returns {String} String
 */
function add(key: String, value: String) {
    if (dictionary.has(key)) {
        let valuesArray = Array.from(dictionary.get(key));
        if (valuesArray.indexOf(value) !== -1) {
            return colors.red('ERROR, member already exists for key');
        }
        else {
            valuesArray.push(value);
            dictionary.set(key, valuesArray);
        }
    }
    else {
        dictionary.set(key, [value]);
    }
    
    return colors.green('Added');
}

/**
 * Removes value from key
 * @param key dictionary key
 * @param value value being removed
 * @returns {String} String
 */
function remove(key: String, value: String) {
    if (dictionary.has(key)) {
        let valuesArray: Array<String> = Array.from(dictionary.get(key));

        if (valuesArray.length === 1) {
            dictionary.delete(key);
        }
        if (valuesArray.length > 1) {
            const index = valuesArray.indexOf(value);
            if (index > -1) {
                valuesArray.splice(index, 1);
            }
            else {
                return colors.red('ERROR, member does not exist');
            }
            dictionary.set(key, valuesArray);
        }
    }
    else {
        return colors.red('ERROR, key does not exist');
    }
    return colors.green('Removed');
}

/**
 * Gets all members in key
 * @param key dictionary key
 * @returns {String} String
 */
function members(key: String) {
    if (dictionary.has(key)) {
        const members = Array.from(dictionary.get(key));
        let array = [];

        for (let i = 0; i < members.length; i++) {
            array.push(`${i+1}) ${members[i]} \n`);
        }

        return colors.green(array.join('').toString());
    }
    else {
        return colors.red('ERROR, key does not exist.');
    }
}

/**
 * Gets all the keys from the dictionary
 * @returns {String} String
 */
function keys() {
    const keys = Array.from(dictionary.keys());

    if (keys.length > 0) {
        let array = [];
        for (let i = 0; i < keys.length; i++) {
            array.push(`${i+1}) ${keys[i]} \n`);
        }
    
        return colors.green(array.join('').toString());
    }
    else {
        return colors.red('(empty set)');
    }
}

/**
 * Removes all values in key
 * @param key dictionary key
 * @returns {String} String
 */
function removeAll(key: String) {
    if (dictionary.has(key)) {
        dictionary.delete(key);
        return colors.green(`Removed All ${key}`);
    }
    else {
        return colors.red('ERROR, key does not exist');
    }
}

/**
 * Removes all keys and all members from the dictionary
 * @returns {String} String
 */
function clear() {
    dictionary.clear();
    return colors.green('Cleared');
}

/**
 * Checks whether a key exists or not
 * @param key dictionary key
 * @returns {String} String
 */
function keyExists(key: String) {
    if (dictionary.has(key)) {
        return colors.green('true');
    }
    else {
        return colors.red('false');
    }
}

/**
 * Checks whether a member exists within a key
 * @param key dictionary key
 * @param value member to check
 * @returns {String} String
 */
function memberExists(key: String, value: String) {
    const members = Array.from(dictionary.get(key));
    const index = members.indexOf(value);
    if (index > -1) {
        return colors.green('true');
    }
    else {
        return colors.red('false');
    }
}

/**
 * Returns all the members in the dictionary
 * @returns {String} String
 */
function allMembers() {
    const keys = Array.from(dictionary.keys());
    let array = [];
    let count = 1;

    keys.forEach(key => {
        const members = Array.from(dictionary.get(key));

        for (let i = 0; i < members.length; i++) {
            array.push(`${count}) ${members[i]} \n`);
        }

        count++;
    });

    return colors.green(array.join('').toString());
}

/**
 * Returns all keys in the dictionary and all of their members
 * @returns {String} String
 */
function items() {
    const keys = Array.from(dictionary.keys());
    let array = [];
    let count = 1;

    keys.forEach(key => {
        const members = Array.from(dictionary.get(key));

        for (let i = 0; i < members.length; i++) {
            array.push(`${count}) ${key}: ${members[i]} \n`);
        }

        count++;
    });

    return colors.green(array.join('').toString());
}

// start
mainPrompt();
