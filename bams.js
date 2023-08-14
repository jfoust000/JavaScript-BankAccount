class BankAccount {
  
    acctNum;
    acctHolder;
    bal;

    constructor(accountNumber, accountHolder, balance) {

        this.acctNum = accountNumber;
        this.acctHolder = accountHolder;
        this.bal = balance;

    }

    deposit(amount) {

        this.bal += amount;
        
    }

    withdraw(amount) {

        this.bal -= amount;

    }

}

console.log("\n\nWelcome to the Bank Account Management System!");

let accounts = [];
const input = require('readline-sync');

let acct = 0;
let holder = "";
let bal = 0;
let depositAmt = 0;
let withdrawAmt = 0;
let acctFound = false;

let regExNum = /^[1-4]$/;
let regExLetters = /^[A-Za-z ]+$/
let regExLongInt = /^[0-9]*$/;
let regExLongDecimal = /^[0-9]*\.[0-9][0-9]$/;

let userSelection = input.question(`\n\nPlease enter a number between 1 and 4:\n\n1 = ADD ACCOUNT\n2 = DEPOSIT\n3 = WITHDRAW\n4 = EXIT\n\nEnter your selection: `);

while (Number(userSelection) != 4) {

    while (!userSelection.match(regExNum)) {

        userSelection = input.question(`\n\nPlease enter a number between 1 and 4:\n\n1 = ADD ACCOUNT\n2 = DEPOSIT\n3 = WITHDRAW\n4 = EXIT\n\nEnter your selection: `);

    }

    if (Number(userSelection) === 1) {

        acct = input.question(`\n\nPlease enter account number: `);

        while (!acct || !acct.match(regExLongInt)) {

            console.log(`\nInvalid account number! Please try again.\n\n`);
            acct = input.question(`\n\nPlease enter account number: `);

        }

        holder = input.question(`\n\nPlease enter the account holder name: `);

        while (!holder || !holder.match(regExLetters)) {

            console.log(`\nInvalid account holder! Please try again.\n\n`);
            holder = input.question(`\n\nPlease enter the account holder name: `);

        }

        bal = input.question(`\n\nPlease enter the opening balance: `); 

        while (!bal || (!bal.match(regExLongInt) && !bal.match(regExLongDecimal))) {

            console.log(`\nInvalid opening balance! Please try again.\n\n`);
            bal = input.question(`\n\nPlease enter the opening balance: `); 

        }

        let newAccount = new BankAccount(Number(acct),holder,Number(bal));
        accounts.push(newAccount);
        console.log(`\n\nAccount added successfully!`);
        userSelection = '';

    } else if (Number(userSelection) === 2) {

        acct = input.question(`\n\nPlease enter account number: `);

        while (!acct || !acct.match(regExLongInt)) {

            console.log(`\nPlease enter a valid account number: `);
            acct = input.question(`\n\nPlease enter account number: `);

        }

        for (let i = 0; i < accounts.length; i++) {
            
            if (accounts[i].acctNum === Number(acct)) {

                acctFound = true;

            }

        }

        if(!acctFound) {

            console.log(`\n\nAccount not found.`);

        } else {

            depositAmt = input.question(`\n\nPlease enter a deposit amount: `);

            while (!depositAmt || (!depositAmt.match(regExLongInt) && !depositAmt.match(regExLongDecimal))) {

                console.log(`\nPlease enter a valid deposit amount.\n\n`);
                depositAmt = input.question(`\n\nPlease enter a deposit amount: `);

            }
            
            for (let i = 0; i < accounts.length; i++) {

                if (accounts[i].acctNum === Number(acct)) {

                    accounts[i].deposit(Number(depositAmt));
                    console.log(`Transaction successful!`);

                }

            }

        }
        
        userSelection = '';

    } else if (Number(userSelection) === 3) {

        acct = input.question(`\n\nPlease enter account number: `);

        while (!acct || !acct.match(regExLongInt)) {

            console.log(`\nPlease enter a valid account number: `);
            acct = input.question(`\n\nPlease enter account number: `);

        }

        for (let i = 0; i < accounts.length; i++) {
            
            if (accounts[i].acctNum === Number(acct)) {

                acctFound = true;

            }

        }

        if(!acctFound) {

            console.log(`\n\nAccount not found.`);

        } else {

            withdrawAmt = input.question(`\n\nPlease enter a withdraw amount: `);

            while (!withdrawAmt || (!withdrawAmt.match(regExLongInt) && !withdrawAmt.match(regExLongDecimal))) {

                console.log(`\nPlease enter a valid withdraw amount.\n\n`);
                withdrawAmt = input.question(`\n\nPlease enter a withdraw amount: `);

            }

            for (let i = 0; i < accounts.length; i++) {

                if (accounts[i].acctNum === Number(acct)) {

                    accounts[i].withdraw(Number(withdrawAmt));
                    console.log(`Transaction successful!`);

                }

            }

        }

        userSelection = '';

    } 

    

}

console.log(`Thank you for using the Bank Accout Management System, have a great day!`);

    console.log(`\n\nAccounts:\n\n`);

    for (let i = 0; i < accounts.length; i++) {

        console.log(`Account Number: ${accounts[i].acctNum}\nAccount Holder: ${accounts[i].acctHolder}\nBalance: $${accounts[i].bal}\n\n`);

    }




