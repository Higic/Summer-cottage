//Tekijät: Miiko Majewski ja Elias Viro
//Viimeisin muutos 3.5.2022
//Ohjelma tulostaa itemCheckPagen "kaupan" sisällön ja käsittelee
//käyttäjän omaan "ostoskoriin" lisäämiään esineitä ja niiden nappeja.

'use strict'

//Hardcoded items
const hardArray = [
    {name: "", quantity: +0, crossed: "notCrossed"},
    {name: "Makkaraa", quantity: +0, crossed: "notCrossed"},
    {name: "Vettä", quantity: +0, crossed: "notCrossed"},
    {name: "WC-paperia", quantity: +0, crossed: "notCrossed"},
    {name: "Vaihtovaatteita", quantity: +0, crossed: "notCrossed"},
    {name: "Uimavarusteet", quantity: +0, crossed: "notCrossed"},
    {name: "Grillihiiliä", quantity: +0, crossed: "notCrossed"}
];

//Array for custom list
let customArray = [];

const hardList = document.getElementById("hardList");

//Add customizable element
hardList.innerHTML +=
    `<li>
        <div id="userInputElement">
            <div id ="hardListName">
                <input id="nameBox" type="text" placeholder="Oma esine">
            </div>
            <div id="hardListControls">
                <input id="numberBox" type="number" name="quantity" placeholder="quantity" min="1" max="100" value="1" alt="Määrälaatikko">
                <button id="add">+</button>
            </div>
        </div>
    </li>`;

//Add all items from the hardcoded item list to the webpage.
for (let i = 1; i < hardArray.length; i++) { 
    hardList.innerHTML += 
    `<li>
        <div id="userInputElement">
            <div id ="hardListName">
                ${hardArray[i].name}
            </div>
            <div id="hardListControls">
                <input id="numberBox" type="number" name="quantity" placeholder="quantity" min="1" max="100" value="1" alt="Määrälaatikko">
                <button id="add">+</button>
            </div>
        </div>
    </li>`;
}


const addButtons = document.querySelectorAll("#add");
const numBoxes = document.querySelectorAll("#numberBox");
const hardListInputBox = document.getElementById("nameBox");

//Add event listeners for the custom item
addButtons[0].addEventListener('click', function() {
    let tempName = hardListInputBox.value;
    let parsedVal1 = parseInt(numBoxes[0].value);
    let itemAlreadyInList1 = false;
    for (let h = 0; h < customArray.length; h++) { //Check if item is already in the list.
        if (tempName == customArray[h].name) {
            itemAlreadyInList1 = true;
        }
    }
    if (itemAlreadyInList1) { //If element is already in customArray
        if (!isNaN(parsedVal1) && tempName.length > 0) { //Check if the quantity input is a number
            numBoxes[0].value = parseInt(numBoxes[0].value);
            let savedIndex;
            for (let d = 0; d < customArray.length; d++) { //Find the index of the already existing element in list
                if (customArray[d].name == tempName) {
                    savedIndex = d;
                    break;
                }
            }
            if (+numBoxes[0].value > 100 || +numBoxes[0].value < 1) {
                numBoxes[0].value = +1;
            }
            customArray[savedIndex].quantity += +numBoxes[0].value;
            printCustomArray();
        }
        else {
            alert("Tarkista esineen nimen ja määrän oikeinkirjoitus.");
        }
    }
    else { //Else push the element to the customArray
        if (!isNaN(parsedVal1) && tempName.length > 0 && tempName.length < 16) { //Check if the quantity input is a number
            numBoxes[0].value = parseInt(numBoxes[0].value);
            if (+numBoxes[0].value > 100 || +numBoxes[0].value < 1) {
                numBoxes[0].value = +1;
            }
            customArray[customArray.length] = {name: tempName, quantity: +0, crossed: "notCrossed"};
            customArray[customArray.length - 1].quantity += +numBoxes[0].value;
            printCustomArray();
        }
        else {
            if (tempName.length >= 16) {
                alert("Esineen nimi on liian pitkä.")
            }
            else {
                alert("Tarkista esineen nimen ja määrän oikeinkirjoitus.");
            }
        }
    }
});

//Add event listeners to buttons of the hardcoded list
for (let j = 1; j < hardArray.length; j++) {
    addButtons[j].addEventListener('click', function() {
        let parsedVal = parseInt(numBoxes[j].value);
        let itemAlreadyInList = false;
        for (let h = 0; h < customArray.length; h++) { //Check if item is already in the list.
            if (hardArray[j].name == customArray[h].name) {
                itemAlreadyInList = true;
            }
        }
        if (itemAlreadyInList) { //If element is already in customArray
            if (!isNaN(parsedVal) && hardArray[j].name.length > 0) { //Check if the quantity input is a number
                numBoxes[j].value = parseInt(numBoxes[j].value);
                if (+numBoxes[j].value > 100 || +numBoxes[j].value < 1) {
                    numBoxes[j].value = +1;
                }
                let savedIndex;
                for (let d = 0; d < customArray.length; d++) { //Find the index of the already existing element in list
                    if (customArray[d].name == hardArray[j].name) {
                        savedIndex = d;
                        break;
                    }
                }
                customArray[savedIndex].quantity += +numBoxes[j].value;
                printCustomArray();
            }
            else {
                alert("Tarkista, että määrä esineelle " + hardArray[j].name + " on kirjoitettu oikein.");
            }
        }
        else { //Else push the element to the customArray
            if (!isNaN(parsedVal) && hardArray[j].name.length > 0) { //Check if the quantity input is a number
                numBoxes[j].value = parseInt(numBoxes[j].value);
                if (+numBoxes[j].value > 100 || +numBoxes[j].value < 1) {
                    numBoxes[j].value = +1;
                }
                customArray.push(hardArray[j]);
                customArray[customArray.length - 1].quantity += +numBoxes[j].value;
                printCustomArray();
            }
            else {
                alert("Tarkista, että määrä esineelle " + hardArray[j].name + " on kirjoitettu oikein.");
            }
        }
    });
}


const customList = document.getElementById("customList");

//ClearListButton functionality
const clearListButton = document.getElementById("clearListButton");
clearListButton.addEventListener('click', function() {
    let arrayLen = customArray.length;
    for (let p = arrayLen - 1; p >= 0; p--) {
        customArray[p].quantity = +0;
        customArray[p].crossed = "notCrossed";
        customArray.pop();
    }
    customList.innerHTML = ``;
});


//Delete HTML in customList and reprint the status of customArray to it.
function printCustomArray() {
    
    customList.innerHTML = ``; //Set the item list to empty
    for (let i = 0; i < customArray.length; i++) {
        customList.innerHTML += //Add HTML to the checklist
        `<li>
            <div id="userInputItem">
                <div id="listText" class="${customArray[i].crossed}">
                    ${customArray[i].name}
                    <span>&#215;</span> ${customArray[i].quantity}
                </div>
                <div id="listButtons">
                    <button id="listControl"> V </button>
                    <button id="listControl"> + </button>
                    <button id="listControl"> - </button>
                    <button id="listControl"> X </button>
                </div>
            </div>
        </li>`;
    }

    //Give all list control buttons event listeners
    let listControls = document.querySelectorAll("#listControl");
    let listElements = document.querySelectorAll("#listText");

    //Add HTML and button controls to new custom checklist elements on page.
    let b = 0;
    for (let a = 0; a < listElements.length; a++) {
        listControls[b].addEventListener('click', function() { //Checkmark (V) - toggles text crossover
            if (customArray[a].crossed != "crossed") {
                customArray[a].crossed = "crossed";
            }
            else {
                customArray[a].crossed = "notCrossed";
            }
            printCustomArray();
        });
        listControls[b + 1].addEventListener('click', function() { //Plus (+) - adds the stack size of the selected item by one
            customArray[a].quantity++;
            customArray[a].crossed = "notCrossed";
            printCustomArray();
        });
        listControls[b + 2].addEventListener('click', function() { //Minus (-) - reduces the stack size of the selected item by one
            customArray[a].quantity--;
            customArray[a].crossed = "notCrossed";
            if (customArray[a].quantity <= 0) { //If the item quantity falls to zero or below, it is deleted from the list.
                customArray[a].quantity = +0;
                customArray.splice(a, 1);
            }
            printCustomArray();
        });
        listControls[b + 3].addEventListener('click', function() { //Remove (X) - removes the item from the list.
            customArray[a].quantity = +0;
            customArray[a].crossed = "notCrossed";
            customArray.splice(a, 1);
            printCustomArray();
        });
        b += 4;
    }
}