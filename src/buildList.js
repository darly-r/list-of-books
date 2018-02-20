'use strict';
  	
function setModalWindowParameters(name, publisher, modalBody, imgSrc){
	document.getElementById('modal-title').innerHTML = name;
	document.getElementById('book-publisher').innerHTML = publisher;
	document.getElementById('description').innerHTML = modalBody;
  document.getElementById('book-img').src = imgSrc;
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
                     '${arrayOfBooks[i].publisher}', '${arrayOfBooks[i].description}', '${arrayOfBooks[i].imgSrc}')">View details</button></div>                     
                		 </div>`;
		document.getElementById('list-all').appendChild(div);
	};
};


/* old version
function loadDocCallBack(callbackFunction, rejectCallback) {
  return new Promise(function(resolve, reject) {
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
  				resolve(callbackFunction(this));
  			}
  			else {

  				let error = new Error(this.status);
  				error.code = this.status;
  				// reject(error);
  				reject(rejectCallback(error));
  				// console.log(error.code);
  			};                
  		};
  	};           
  };

  xhttp.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + search, true);
  xhttp.send(); 
  }); 
};

function rejectResponse(xhttp){
	clearList();
	alert(`Try new search or check URL. Error code = ${xhttp.code}`);
}
*/

function getResponse(xhttp){  
  clearList();
  let responseJSON = JSON.parse(xhttp); //.responseText

  arrayOfBooks = responseJSON.items.map((item) => {return {
    publishedDate : item.volumeInfo.publishedDate,
    title : item.volumeInfo.title,
    author : item.volumeInfo.authors,
    pageCount : item.volumeInfo.pageCount,
    publisher: item.volumeInfo.publisher,
    description : item.volumeInfo.description,
    imgSrc : item.volumeInfo.imageLinks.smallThumbnail
    }
  });
  viewList(arrayOfBooks); 
};


//New version 

function searchBook() {
	let search = document.getElementById('searchBooks').value;
	if (search === '') {
		clearList();      
		alert('Insert some text'); 
		return false;
	}
	else {
		httpGet('https://www.googleapis.com/books/v1/volumes?q=' + search)
		.then(
			response => getResponse(response),
			error => alert(`Rejected. Code: ${error.code}`)
			);
	};
};


function httpGet(url) {

  return new Promise(function(resolve, reject) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
    xhr.send();
  });

};


document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    document.getElementById("setRequestButton").addEventListener("click", () => searchBook());
  } //loadDocCallBack(getResponse, rejectResponse)
};