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

function addItem(e){

    // stoppoinng the default behaviour
    e.preventDefault();
    const newInput = itemInput.value;

    // checking the empty string case
    if(newInput === ''){
        alert('please enter the item');
        return;
    }

    addItemToDOM(newInput);
    addItemToLocalStorage(newInput);
    checkUI();
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
    localStorage.setItem('items',JSON.stringify(itemsInLocalStorage));ß
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

function enteringText(){
    itemInput.style.outlineStyle = 'solid';
    itemInput.style.outlineColor = '#3399FF80';
}

function notEnteringText(){
    itemInput.style.outlineStyle = 'none';
}


function deleteItem(e){
    if(e.target.className.includes('fa-xmark')){
        if(confirm('Do you want to delete?'))
        e.target.parentElement.parentElement.remove();
        checkUI();
    }
}

function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.lastChild);
    }
    checkUI();
}

// Hide Filter items and clear all button
function checkUI(){
    const items = itemList.querySelectorAll('li');
    if(items.length == 0){
        clearBtn.style.display = 'none';
        filterInput.style.display = 'none';
    }
    else{
        clearBtn.style.display = 'block';
        filterInput.style.display = 'block';
    }
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


//Initialize the app
function init(){
itemForm.addEventListener('submit',addItem);
itemForm.addEventListener('focusin',enteringText);
itemForm.addEventListener('focusout',notEnteringText);
// console.log(removeIcon.outerHTML);
itemList.addEventListener('click',deleteItem);
clearBtn.addEventListener('click',clearItems);
filterInput.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);
checkUI();
}

init();