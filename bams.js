// Class BankAccount contains properties acctNum, acctHolder, and bal

class BankAccount {
  
    acctNum;
    acctHolder;
    bal;

    // Initialize properties in the constructor

    constructor(accountNumber, accountHolder, balance) {

        this.acctNum = accountNumber;
        this.acctHolder = accountHolder;
        this.bal = balance;

    }

    // Deposit

    deposit(amount) {

        this.bal += amount;
        
    }

    // Withdraw

    withdraw(amount) {

        this.bal -= amount;

    }

}

// Greeting

console.log("\n\nWelcome to the Bank Account Management System!");

// account array to store accounts created by the user

let accounts = [];

// for getting input from user

const input = require('readline-sync');

// variables to store account number, account holder, deposit amount, withdraw amount, and balance from the user

let acct = 0;
let holder = "";
let bal = 0;
let depositAmt = 0;
let withdrawAmt = 0;

// Boolean to indicate an account was found when user searches for account when making a deposit or withdraw

let acctFound = false;

// Regular expressions 

// For main menu selection to Add Account, Make Deposit, Make Withdraw, or Exit

let regExNum = /^[1-4]$/;

// For letters and spaces only when entering account holder

let regExLetters = /^[A-Za-z ]+$/;

// For allowing only numbers 0-9 when entering deposit or withdraw amounts

let regExLongInt = /^[0-9]*$/;

// For allowing numbers with two decimal places when entering deposit or withdraw amounts

let regExLongDecimal = /^[0-9]*\.[0-9][0-9]$/;

// Get user selection from main menu

let userSelection = input.question(`\n\nPlease enter a number between 1 and 4:\n\n1 = ADD ACCOUNT\n2 = DEPOSIT\n3 = WITHDRAW\n4 = EXIT\n\nEnter your selection: `);

// While the user hasn't select Exit (4)

while (Number(userSelection) != 4) {

    // While user has antered a valid number between 1-4 (regExNum = /^[1-4]$/)
    // Keep asking for selection

    while (!userSelection.match(regExNum)) {

        userSelection = input.question(`\n\nPlease enter a number between 1 and 4:\n\n1 = ADD ACCOUNT\n2 = DEPOSIT\n3 = WITHDRAW\n4 = EXIT\n\nEnter your selection: `);

    }

    // Convert selection from string to number and check if it is 1 for Add Account

    if (Number(userSelection) === 1) {

        // Set acct variable to account number entered by user

        acct = input.question(`\n\nPlease enter account number: `);

        // While account number doesn't match regExLongInt (regExLongInt = /^[0-9]*$/) keep asking for account number

        while (!acct || !acct.match(regExLongInt)) {

            console.log(`\nInvalid account number! Please try again.\n\n`);
            acct = input.question(`\n\nPlease enter account number: `);

        }

        // Set holder to name entered by user

        holder = input.question(`\n\nPlease enter the account holder name: `);

        // While holder doesn't martch regExLetters (regExLetters = /^[A-Za-z ]+$/) keep asking for the account holder name

        while (!holder || !holder.match(regExLetters)) {

            console.log(`\nInvalid account holder! Please try again.\n\n`);
            holder = input.question(`\n\nPlease enter the account holder name: `);

        }

        // Set bal to the opening balance entered by the user

        bal = input.question(`\n\nPlease enter the opening balance: `); 

        // While bal isn't entered, or doesn't match regExLongInt and bal doesn't match regExLongDecimal - the user hasn't entered in an integer of floating point value with 2 decimal places, so keep asking for balance

        while (!bal || (!bal.match(regExLongInt) && !bal.match(regExLongDecimal))) {

            console.log(`\nInvalid opening balance! Please try again.\n\n`);
            bal = input.question(`\n\nPlease enter the opening balance: `); 

        }

        // Now that information is valid, create a new BankAccount object and push it onto the accounts array. Make sure acct and bal are converted to Numbers in order to perform arithmetic

        let newAccount = new BankAccount(Number(acct),holder,Number(bal));
        accounts.push(newAccount);
        console.log(`\n\nAccount added successfully!`);

        // Clear userSelection to enter loop again and display main menu

        userSelection = '';

        // If userSelection is 2, we are making a Deposit

    } else if (Number(userSelection) === 2) {

        // Get the account number from user

        acct = input.question(`\n\nPlease enter account number: `);

        // While acct is empty or doesn't match regExLongInt (regExLongInt = /^[0-9]*$/) keep asking for the account number

        while (!acct || !acct.match(regExLongInt)) {

            console.log(`\nPlease enter a valid account number: `);
            acct = input.question(`\n\nPlease enter account number: `);

        }

        // Loop through accounts array to see if we can find the account number entered by the user. If we do, set acctFound to true

        for (let i = 0; i < accounts.length; i++) {
            
            if (accounts[i].acctNum === Number(acct)) {

                acctFound = true;

            }

        }

        // If the account number is not found, print error to the console

        if(!acctFound) {

            console.log(`\n\nAccount not found.`);

            // Else, we found the account number so we can get the deposit amount from the user

        } else {

            depositAmt = input.question(`\n\nPlease enter a deposit amount: `);

            // While the deposit amount is 0, deposit amount is empty, or depsit amount doesn't match regExLongInt and regExLongDecimal (an integer or decimal with 2 decimal places) keep asking for the deposit amount

            while (Number(depositAmt) === 0 || !depositAmt || (!depositAmt.match(regExLongInt) && !depositAmt.match(regExLongDecimal))) {

                console.log(`\nPlease enter a valid deposit amount.\n\n`);
                depositAmt = input.question(`\n\nPlease enter a deposit amount: `);

            }

            // Loop through the accounts array. If the account object's account number matches the account number entered by the user, then we have the correct account object and we can call that object's deposit method - passing the deposit amount.
            
            for (let i = 0; i < accounts.length; i++) {

                if (accounts[i].acctNum === Number(acct)) {

                    accounts[i].deposit(Number(depositAmt));
                    console.log(`\n\nTransaction successful!`);

                } 

            }

        }

        // Clear userSelection to re-enter main menu loop
        
        userSelection = '';

        // If main menu selection is 3, we are making a withdraw

    } else if (Number(userSelection) === 3) {

        // get account number from user

        acct = input.question(`\n\nPlease enter account number: `);

        // While the account numebr is empty or doesn't match format of regExLongInt, keep asking for the account number 

        while (!acct || !acct.match(regExLongInt)) {

            console.log(`\nPlease enter a valid account number: `);
            acct = input.question(`\n\nPlease enter account number: `);

        }

        // Loop through the accounts array to see if we find the account number. If we do, set acctFound to true

        for (let i = 0; i < accounts.length; i++) {
            
            if (accounts[i].acctNum === Number(acct)) {

                acctFound = true;

            }

        }

        // If the account wasn't found, print message to the console

        if(!acctFound) {

            console.log(`\n\nAccount not found.`);

          // Else, we found the account and can get withdraw ammount  

        } else {

            withdrawAmt = input.question(`\n\nPlease enter a withdraw amount: `);

            // While withdrawAmt is 0 or empty, or withdrawAmt doesn't match regExLongInt and regExLongDecimal, the user hasn't emtered an enteger or a float with 2 decimal places, so keep asking for the withdrawAmt

            while (Number(withdrawAmt) === 0 || !withdrawAmt || (!withdrawAmt.match(regExLongInt) && !withdrawAmt.match(regExLongDecimal))) {

                console.log(`\nPlease enter a valid withdraw amount.\n\n`);
                withdrawAmt = input.question(`\n\nPlease enter a withdraw amount: `);

            }

            // Loop through accounts array and see if the account i acctNum matches user entered account number. If it does, make the withdraw by calling accounts i withdraw

            for (let i = 0; i < accounts.length; i++) {

                if (accounts[i].acctNum === Number(acct)) {

                    if (accounts[i].bal - withdrawAmt < 0) {

                        console.log(`\n\nInsuffiecient Funds!`);

                    } else {

                        accounts[i].withdraw(Number(withdrawAmt));
                        console.log(`\n\nTransaction successful!`);

                    }
                    

                }

            }

        }

        // Clear userSelection to re-enter the main menu loop

        userSelection = '';

    }    

}

// Once the user has entered 4 to Exit, print the Goodbye message and loop the the accounts array. Print the account info for each account

console.log(`Thank you for using the Bank Accout Management System, have a great day!`);

    console.log(`\n\nAccounts:\n\n`);

    for (let i = 0; i < accounts.length; i++) {

        console.log(`Account Number: ${accounts[i].acctNum}\nAccount Holder: ${accounts[i].acctHolder}\nBalance: $${accounts[i].bal.toFixed(2)}\n\n`);

    }




