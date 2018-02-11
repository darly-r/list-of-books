'use strict';
  	
function setModalWindowParameters(name, imgSrc, modalBody){
	document.getElementById('modal-title').innerHTML = name;
	document.getElementById('book-img').src = imgSrc;
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

let publishedDate = '', title = '', author = '', pageCount = '';
let book = {publishedDate, title, author, pageCount};
let arrayOfBooks = [];

function loadDoc() {
  	let search = document.getElementById("books").value;
  	let xhttp = new XMLHttpRequest();
  	document.getElementById("result").innerHTML = '';
  	if (search == '') {
  		document.getElementById('list-all').innerHTML = '';
  		alert('Insert some text'); 
  		return false;
  	}
  		else {
  		xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200)	{
      			let responseJSON = JSON.parse(this.responseText);
      			for (let i = 0; i < responseJSON.items.length; i++) {
        			arrayOfBooks[i] = 
        			{
        			publishedDate : responseJSON.items[i].volumeInfo.publishedDate,
       				title : responseJSON.items[i].volumeInfo.title,
       				author : responseJSON.items[i].volumeInfo.authors,
       				pageCount : responseJSON.items[i].volumeInfo.pageCount 
       				};
      			};  	  
			viewList(arrayOfBooks);
    		};    	
  		};
  		xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + search, true);
  		xhttp.send(); 
  		}  
}

function viewList(arrayOfBooks){
	document.getElementById('list-all').innerHTML = '';
	for (let i = 0; i < arrayOfBooks.length; i++) {
		let classRow = (i % 2 == 0) ? "row bg-light text-dark" : "row bg-secondary text-white";
		let div = document.createElement('div');
		div.innerHTML = `<div class="${classRow}">
			<div class="col-lg-1">${arrayOfBooks[i].publishedDate}</div>
			<div class="col-lg-3">${arrayOfBooks[i].title}</div>
			<div class="col-lg-2">${arrayOfBooks[i].author}</div>
			<div class="col-lg-1">${arrayOfBooks[i].pageCount}</div>
			</div>`;
		document.getElementById('list-all').appendChild(div);
		};
};