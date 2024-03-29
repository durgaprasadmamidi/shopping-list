// const itemInput = document.getElementById('item-input');
// const title = document.querySelector('h1');
// let prevE = 0;
// function onType(e){
    
//    // console.log(`e = ${e.target.value.length}, prevE = ${prevE}`);
//     // prevE < e.target.value.length ? itemInput.style.outlineColor = 'green': itemInput.style.outlineColor = 'red';
//     itemInput.style.outlineWidth = '2px';
//     itemInput.style.outlineStyle = 'solid';  
//     e.target.value.includes('@gmail.com') ? itemInput.style.outlineColor = 'green': itemInput.style.outlineColor = 'red';
//     console.log(e.target.value.includes('@gmail.com'));
//     title.textContent = e.target.value;
//     prevE = e.target.value.length;
// }
    
// function onBlur(e){
//     title.textContent = 'Shopping List',
//     itemInput.style.outlineStyle = 'none'
// }

// function onFocus(e){
//     itemInput.style.outlineWidth = '2px';
//     itemInput.style.outlineStyle = 'solid';    
//     itemInput.style.outlineColor = 'green';
// }
// itemInput.addEventListener('input',onType);
// // itemInput.addEventListener('focus',onFocus);
// itemInput.addEventListener('blur',onBlur);

   

// const button = document.querySelector('button');
// const form = document.getElementById('item-form');



// // button.addEventListener('click', ((e)=>{
// //     alert('clicked button');
// //     // e.stopPropagation();
// // }));
// // form.addEventListener('submit',((e)=> {
// //     alert('clicked submit');
// //     e.preventDefault();
// //     }));
// // document.body.addEventListener('click', (()=>alert('clicked Body')));


// document.querySelector('ul').addEventListener('mouseover',((e)=>{
//     e.target.tagName === 'LI'? e.target.style.color = 'green': '';
//     if(e.target.tagName === 'I'){
//         e.target.parentNode.parentNode.style.borderStyle = 'solid';
//         e.target.parentNode.parentNode.style.borderColor = 'red';
//     }
// }));



// document.querySelector('ul').addEventListener('mouseout',((e)=>{
//     e.target.tagName === 'LI'? e.target.style.color = 'black': '';
//     if(e.target.tagName === 'I'){
//         e.target.parentNode.parentNode.style = 'none';
        
//     }
// }));


// document.querySelector('ul').addEventListener('click', ((e)=>{
// if(e.target.tagName === 'I'){
//     e.target.style.borderStyle = 'solid';
//     e.target.style.borderColor = 'red';
//     e.target.parentNode.parentNode.remove();
// }
// }
// ))
// //.addEventListener('click',(()=>{console.log('btnclicked')}));






// NEW CODE FOR THIS SECTION STARTS FROM HERE



const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const removeIcon = document.querySelector('.fa-xmark');
const clearBtn = document.querySelector('#clear');
const filterInput = document.querySelector('#filter');
const formButton = itemForm.querySelector('button');
let isEditMode = false;

function addItem(e){

    // stoppoinng the default behaviour
    e.preventDefault();
    const newInput = itemInput.value;

    // checking the empty string case
    if(newInput === ''){
        alert('please enter the item');
        return;
    }

    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        // Checking for duplicate during edit mode
        if(checkForDuplicate(newInput.toLowerCase())){
            alert('item is already in list');
            return;
        }
        removeItemFromLocalStorage(itemToEdit.textContent);
        itemToEdit.remove();
        isEditMode = false;

    }
    else{
        if(checkForDuplicate(newInput.toLowerCase())){
            alert('item is already in list');
            return;
        }
    }
    
    

    addItemToDOM(newInput);
    addItemToLocalStorage(newInput);
    checkUI();
}

function checkForDuplicate(item){
    let itemFromLocalStorage = getItemsFromLocalStorage();
    itemFromLocalStorage = itemFromLocalStorage.map((item)=>item.toLowerCase());
    if(itemFromLocalStorage.includes(item))
    return true;
}

function addItemToDOM(newInput){

    // create and return new Item element
    const li = createLi(newInput);
    itemList.appendChild(li);
}

function getItemsFromLocalStorage(){

    let itemsInLocalStorage;

    //Check if local storage has any items
    if(localStorage.getItem('items') == null){
        itemsInLocalStorage = [];
    }
    else{
        //Convert string to array
        itemsInLocalStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsInLocalStorage;
}

function addItemToLocalStorage(newInput){

    let itemsInLocalStorage = getItemsFromLocalStorage();
    itemsInLocalStorage.push(newInput);
    //Convert to JSON string
    localStorage.setItem('items',JSON.stringify(itemsInLocalStorage));
}

// Display items from local storage`
function displayItems(){
    let itemsInLocalStorage = getItemsFromLocalStorage();
    itemsInLocalStorage.forEach((item)=>{
        addItemToDOM(item);
    });
    checkUI();
}

function createLi(newInput){
    const li = document.createElement('li');
    li.textContent = newInput
    //create a child button element
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    return li;
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    //cerate a icon child element
    const Icon = createIcon('fa-solid fa-xmark');
    button.appendChild(Icon);
    return button;
}

function createIcon(classes){
    const Icon = document.createElement('i');
    Icon.className = classes;
    return Icon;
}

let intervalId;

function enteringText(){
    intervalId = setInterval(changeToRandomColour,1000)
}

function notEnteringText(){
    clearInterval(intervalId);
    itemInput.style.outlineStyle = 'none';
}

function setItemToEdit(item){
    isEditMode = true;
    itemList.querySelectorAll('li').
    forEach((i)=> i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formButton.innerHTML = `<i class = "fa-solid fa-pen"></i> Update Item`;
    formButton.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent; 

}
function onClickItem(e){
    if(e.target.className.includes('fa-xmark')){
        deleteItem(e);
    }
    else if(!e.target.className.includes('items')){
        setItemToEdit(e.target);
    }
}

function removeItemFromLocalStorage(itemValue){
    let itemsInLocalStorage = getItemsFromLocalStorage();
    itemsInLocalStorage = itemsInLocalStorage.filter((i) => i!==itemValue);
    localStorage.setItem('items',JSON.stringify(itemsInLocalStorage));
    // displayItems();
}

function deleteItem(e){
        if(e.target.className.includes('fa-xmark')){
        if(confirm('Do you want to delete?'))
        e.target.parentElement.parentElement.remove();
        const itemValue = e.target.parentElement.parentElement.textContent;
        removeItemFromLocalStorage(itemValue);
        checkUI();
        }
}


function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.lastChild);
    }
    localStorage.clear();
    itemInput.value = '';
    checkUI();
}

// Hide Filter items and clear all button
function checkUI(){
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if(items.length == 0){
        clearBtn.style.display = 'none';
        filterInput.style.display = 'none';
    }
    else{
        clearBtn.style.display = 'block';
        filterInput.style.display = 'block';
    }

    formButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    formButton.style.backgroundColor = '#333';
    
}

// Filter items
function filterItems(e){
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach((item)=>{
        if(!item.textContent.toLowerCase().includes(text)){
            item.style.display = 'none';
        }
        else{
            item.style.display = 'flex';
        }
    })
}

function changeToRandomColour(){
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    itemInput.style.outlineStyle = 'solid';
    itemInput.style.outlineColor = `#${randomColor}`;
}

//Initialize the app
function init(){
itemForm.addEventListener('submit',addItem);
itemForm.addEventListener('focusin',enteringText);
itemForm.addEventListener('focusout',notEnteringText);
// console.log(removeIcon.outerHTML);
// itemList.addEventListener('click',deleteItem);
itemList.addEventListener('click',onClickItem);
clearBtn.addEventListener('click',clearItems);
filterInput.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);
checkUI();
}

init();