//Tekijät: Miiko Majewski ja Elias Viro
//Viimeisin muutos 3.5.2022
//Ohjelma tulostaa jobCheckPagen "kaupan" sisällön ja käsittelee
//käyttäjän omaan "ostoskoriin" lisäämiään töitä ja niiden nappeja.

'use strict'

//Hardcoded items
const hardArray = [
    {name: "", crossed: "notCrossed"},
    {name: "Hae vettä kaivosta", crossed: "notCrossed"},
    {name: "Pilko polttopuut", crossed: "notCrossed"},
    {name: "Siivoa mökki", crossed: "notCrossed"},
    {name: "Laske vene vesille", crossed: "notCrossed"},
    {name: "Leikkaa ruohikko", crossed: "notCrossed"},
    {name: "Lämmitä sauna", crossed: "notCrossed"},
    {name: "Grilli tulille", crossed: "notCrossed"},
    {name: "Rentoudu", crossed: "notCrossed"}
];

//Array for custom list
let customArray = [];

const hardList = document.getElementById("hardList");

//Add customizable element
hardList.innerHTML +=
    `<li>
        <div id="userInputElement">
            <div id ="hardListName">
                <input id="nameBox" type="text" placeholder="Valitsemasi työ">
            </div>
            <div id="hardListControls">
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
                    <button id="add">+</button>
                </div>
            </div>
        </li>`;
}


const addButtons = document.querySelectorAll("#add");
const hardListInputBox = document.getElementById("nameBox");

//Add event listeners for the custom item
addButtons[0].addEventListener('click', function() {
    let tempName = hardListInputBox.value;
    let itemAlreadyInList1 = false;
    for (let h = 0; h < customArray.length; h++) { //Check if item is already in the list.
        if (tempName == customArray[h].name) {
            itemAlreadyInList1 = true;
        }
    }
    if (itemAlreadyInList1) { //If element is already in customArray
            alert('"' + tempName + '"' + " on jo listalla.");
            printCustomArray();
    }
    else { //Else push the element to the customArray
        if (tempName.length > 0 && tempName.length <= 17) { //Check if the name input is not nothing
            customArray[customArray.length] = {name: tempName,crossed: "notCrossed"};
            printCustomArray();
        }
        else {
            if(tempName.length > 17)
                alert("Työn nimen pituus on liian pitkä. Alle 18 merkkiä, kiitos!");
            else if(tempName.length <= 0)
                alert("Työn nimi on liian lyhyt!");
        }
    }
});

//Add event listeners to buttons of the hardcoded list
for (let j = 1; j < hardArray.length; j++) {
    addButtons[j].addEventListener('click', function() {
        let itemAlreadyInList = false;
        for (let h = 0; h < customArray.length; h++) { //Check if item is already in the list.
            if (hardArray[j].name == customArray[h].name) {
                itemAlreadyInList = true;
            }
        }
        if (itemAlreadyInList) { //If element is already in customArray
                alert('"' + hardArray[j].name + '"' + " on jo listalla.");
        }
        else { //Else push the element to the customArray
            if (hardArray[j].name.length > 0) { //Check if the name is not nothing
                customArray.push(hardArray[j]);
                printCustomArray();
            }
        }
    });
}


const customList = document.getElementById("customList");

//ClearListButton functionality
const clearListButton = document.getElementById("clearListButton");
clearListButton.addEventListener('click', function() {
    let arrayLen = customArray.length;
    for (let p = (arrayLen - 1); p >= 0; p--) {
        customArray[p].crossed = "notCrossed";
        customArray.pop();
    }
    customList.innerHTML = ``;
});


//Add HTML and button controls to new custom checklist element on page.
function printCustomArray() {
    customList.innerHTML = ``; //Set the item list to empty
    for (let i = 0; i < customArray.length; i++) {
        customList.innerHTML += //Add HTML to the checklist
            `<li>
                <div id="userInputItem">
                    <div id="listText" class="${customArray[i].crossed}">
                        ${customArray[i].name}
                    </div>
                    <div id="listButtons">
                        <button id="listControl"> V </button>
                        <button id="listControl"> X </button>
                    </div>
                </div>
            </li>`;
    }

    //Give all list control buttons event listeners
    let listControls = document.querySelectorAll("#listControl");
    let listElements = document.querySelectorAll("#listText");
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

        listControls[b + 1].addEventListener('click', function() { //Remove (X) - removes the item from the list.
            customArray[a].crossed = "notCrossed";
            customArray.splice(a, 1);
            printCustomArray();
        });
        b += 2;
    }
}