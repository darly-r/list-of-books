'use strict';
  	
function setModalWindowParameters(name, publisher, modalBody){
	document.getElementById('modal-title').innerHTML = name;
	document.getElementById('book-publisher').innerHTML = publisher;
	document.getElementById('description').innerHTML = modalBody;
};
function sortByPrice() {
    document.getElementById('list-all').innerHTML = '';
    arrayOfBooks.sort((a, b) => a.price - b.price);
    viewList(arrayOfBooks);
};
function sortByPriceRev() {
    arrayOfBooks.reverse((a, b) => a.price - b.price);
    document.getElementById('list-all').innerHTML = '';
    viewList(arrayOfBooks);
};
function sortByID() {
    arrayOfBooks.sort((a, b) => a.id - b.id);
    document.getElementById('list-all').innerHTML = '';
    viewList(arrayOfBooks);
};

let publishedDate = '', title = '', author = '', pageCount = '', publisher = '', description = '';
let book = {publishedDate, title, author, pageCount, publisher, description};
let arrayOfBooks = [];
function clearList(){
  document.getElementById("list-all").innerHTML = '';
};

function viewList(arrayOfBooks){
	clearList();
	for (let i = 0; i < arrayOfBooks.length; i++) {
		let classRow = (i % 2 == 0) ? "row bg-light text-dark" : "row bg-secondary text-white";
		let div = document.createElement('div');
		div.innerHTML = `<div class="${classRow}">
			               <div class="col-lg-1">${arrayOfBooks[i].publishedDate}</div>
			               <div class="col-lg-3">${arrayOfBooks[i].title}</div>
			               <div class="col-lg-2">${arrayOfBooks[i].author}</div>
                		 <div class="col-lg-1">${arrayOfBooks[i].pageCount}</div>
                     <div class="col-lg-2">
                     <button type="button" class="btn btn-outline-light text-dark" 
                     data-toggle="modal" data-target="#modal-details" onclick= "setModalWindowParameters('${arrayOfBooks[i].title}', 
                     '${arrayOfBooks[i].publisher}', '${arrayOfBooks[i].description}')">View details</button></div>                     
                		 </div>`;
		document.getElementById('list-all').appendChild(div);
	};
};

function loadDocCallBack(callbackFunction) {
  let search = document.getElementById('searchBooks').value;
  let xhttp = new XMLHttpRequest();
  if (search === '') {
    clearList();      
    alert('Insert some text'); 
    return false;
  }
  else {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {            
        callbackFunction(this);
      }
      else {
        clearList();
        alert(`Try new search or check URL. Error code = ${this.status}`);        
      };
    };           
  };
  xhttp.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + search, true);
  xhttp.send(); 
  }; 
};

function getResponse(xhttp){  
  clearList();
  let responseJSON = JSON.parse(xhttp.responseText);
  for (let i = 0; i < responseJSON.items.length; i++) {
    arrayOfBooks[i] = 
    {
    publishedDate : responseJSON.items[i].volumeInfo.publishedDate,
    title : responseJSON.items[i].volumeInfo.title,
    author : responseJSON.items[i].volumeInfo.authors,
    pageCount : responseJSON.items[i].volumeInfo.pageCount,
    publisher: responseJSON.items[i].volumeInfo.publisher,
    description : responseJSON.items[i].volumeInfo.description   
    };
  }; 
  viewList(arrayOfBooks);  
};
