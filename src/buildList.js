'use strict';
const arrayOfBooks = [
{
	id: 10001,
	name: 'Mr. Penumbras 24-Hour Bookstore',
	author: 'Robin Sloan',
	price: 38.87,
	imgSrc: 'images/penumbra.jpg',
	modalBody: `<p>Farrar, Straus and Giroux, 02/10/2012. 304p.</p> <p>A gleeful and exhilarating tale of global conspiracy, complex code-breaking, high-tech data visualization, young love, rollicking adventure, and the secret to eternal life—mostly set in a hole-in-the-wall San Francisco bookstore</p>`
},
{
	id: 10002,
	name: 'The Book Thief',
	author: 'Markus Zusak',
	price: 8.89,
	imgSrc: 'images/bookThief.jpg',
	modalBody: `<p>Hardcover, 552 pages. Published March 14th 2006 by Alfred a Knopf Inc</p> <p>It’s just a small story really, about among other things: a girl, some words, an accordionist, some fanatical Germans, a Jewish fist-fighter, and quite a lot of thievery ...Set during World War II in Germany, Markus Zusak’s groundbreaking new novel is the story of Liesel Meminger, a foster girl living outside of Munich</p>`
},
{
	id: 10003,
	name: 'Flowers For Algernon',
	author: 'Daniel Keyesk',
	price: 5.89,
	imgSrc: 'images/flowers.jpg',
	modalBody: `<p>Hardcover, 552 pages. Published March 14th 2006 by Alfred a </p>`
},
{
	id: 10004,
	name: 'THE THIRTEENTH TALE',
	author: 'Markus Zusak',
	price: 29.89,
	imgSrc: 'images/13thTale.jpg',
	modalBody: `<p>Hardcover, 552 pages. Published March 14th </p>`
},
{
	id: 10005,
	name: 'The Girl on the Train',
	author: 'Paula Hawkins',
	price: 19.79,
	imgSrc: 'images/trainGirl.jpg',
	modalBody: `<p>Hardcover, 552 pages. Published March 14th 2006 by Alfred </p>`
},
];
	function viewList(){
		for (let i = 0; i < arrayOfBooks.length; i++) {
			let classRow = (i % 2 == 0) ? "row bg-light text-dark" : "row bg-secondary text-white";
			let name = arrayOfBooks[i].name;
			let div = document.createElement('div');
			div.innerHTML = `<div class="${classRow}">
			<div class="col-lg-1">${arrayOfBooks[i].id}</div>
			<div class="col-lg-3">${arrayOfBooks[i].name}</div>
			<div class="col-lg-2">${arrayOfBooks[i].author}</div>
			<div class="col-lg-1">${arrayOfBooks[i].price}</div>
			<div class="col-lg-2">
			<button type="button" class="btn btn-outline-light text-dark" 
			data-toggle="modal" data-target="#modal-details" onclick= "setModalWindowParameters('${arrayOfBooks[i].name}', 
			'${arrayOfBooks[i].imgSrc}', '${arrayOfBooks[i].modalBody}')">View details</button></div>
			</div>`;
			document.getElementById('list-all').appendChild(div);
		};
	};
	function setModalWindowParameters(name, imgSrc, modalBody){
		document.getElementById('modal-title').innerHTML = name;
		document.getElementById('book-img').src = imgSrc;
		document.getElementById('description').innerHTML = modalBody;
	};
	function sortByPrice() {
	    arrayOfBooks.sort((a, b) => a.price - b.price);
	    document.getElementById('list-all').innerHTML = '';
	    viewList();
	};
	function sortByPriceRev() {
	    arrayOfBooks.reverse((a, b) => a.price - b.price);
	    document.getElementById('list-all').innerHTML = '';
	    viewList();
	};
	function sortByID() {
	    arrayOfBooks.sort((a, b) => a.id - b.id);
	    document.getElementById('list-all').innerHTML = '';
	    viewList();
	};
	function sortByID() {
	    arrayOfBooks.sort((a, b) => a.id - b.id);
	    document.getElementById('list-all').innerHTML = '';
	    viewList();
	};
function loadDoc() {
  var search = document.getElementById("books").value;
  var xhttp = new XMLHttpRequest();
  var id = [];
  var title = [];
  var author = [];
  document.getElementById("result").innerHTML = '';
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var responseJSON = JSON.parse(this.responseText);
      for (var i = 0; i < responseJSON.items.length; i++) {
       id[i] = responseJSON.items[i].id;
       title[i] = responseJSON.items[i].volumeInfo.title;
       document.getElementById("result").innerHTML += "<br>" + id[i] + ':' + title[i];
      }
      
    } 
  };
  xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + search, true);
  xhttp.send();
}
	viewList();