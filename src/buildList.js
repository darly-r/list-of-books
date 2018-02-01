'use strict';
const arrayOfBooks = 
[
	{id: 10001,
	name: "Mr. Penumbras 24-Hour Bookstore",
	author: "Robin Sloan",
	price: 38.87,
	imgSrc: "images/penumbra.jpg",
	modalBody: `<p>Farrar, Straus and Giroux, 02/10/2012. 304p.</p> <p>A gleeful and exhilarating tale of global conspiracy, complex code-breaking, high-tech data visualization, young love, rollicking adventure, and the secret to eternal life—mostly set in a hole-in-the-wall San Francisco bookstore</p>`},
    {id: 10002,
	name: 'The Book Thief',
	author: 'Markus Zusak',
	price: 8.89,
	imgSrc: "images/bookThief.jpg",
	modalBody: `<p>Hardcover, 552 pages. Published March 14th 2006 by Alfred a Knopf Inc</p> <p>It’s just a small story really, about among other things: a girl, some words, an accordionist, some fanatical Germans, a Jewish fist-fighter, and quite a lot of thievery ...Set during World War II in Germany, Markus Zusak’s groundbreaking new novel is the story of Liesel Meminger, a foster girl living outside of Munich</p>`},
    {id: 10003,
	name: 'Flowers For Algernon',
	author: 'Daniel Keyesk',
	price: 5.89,
	imgSrc: "images/flowers.jpg",
	modalBody: `<p>Hardcover, 552 pages. Published March 14th 2006 by Alfred a </p>`
    },
    {id: 10004,
	name: 'THE THIRTEENTH TALE',
	author: 'Markus Zusak',
	price: 29.89,
	imgSrc: "images/13thTale.jpg",
	modalBody: `<p>Hardcover, 552 pages. Published March 14th </p>`
    },
    {id: 10005,
	name: 'The Girl on the Train',
	author: 'Paula Hawkins',
	price: 19.79,
	imgSrc: "images/trainGirl.jpg",
	modalBody: `<p>Hardcover, 552 pages. Published March 14th 2006 by Alfred </p>`
	},

];





function viewList(){
	for (let i = 0; i < arrayOfBooks.length; i++) {
		let classRow="row bg-secondary text-white";
		if (i % 2 == 0) {classRow="row bg-light text-dark"} else {classRow="row bg-secondary text-white"};
		let name = arrayOfBooks[i].name;

		let div = document.createElement('div');
		div.innerHTML = `<div class="${classRow}">
		<div class="col-lg-1">${arrayOfBooks[i].id}</div>
		<div class="col-lg-3">${arrayOfBooks[i].name}</div>
		<div class="col-lg-2">${arrayOfBooks[i].author}</div>
		<div class="col-lg-1">${arrayOfBooks[i].price}</div>
		<div class="col-lg-2">
		<button type="button" class="btn btn-outline-light text-dark" 
		data-toggle="modal" data-target="#detailsModal" onclick= "setModalWindowParameters('${arrayOfBooks[i].name}', 
		'${arrayOfBooks[i].imgSrc}', '${arrayOfBooks[i].modalBody}')">View details</button></div>
		</div>`;

		document.getElementById("listAll").appendChild(div);

	};
};
 
function setModalWindowParameters(name, imgSrc, modalBody){
	document.getElementById("modalTitle").innerHTML = name;
	document.getElementById("imgSource").src = imgSrc;
	document.getElementById("description").innerHTML = modalBody;
};

function sortByPrice() {
    arrayOfBooks.sort(function(a, b){return a.price - b.price});
    document.getElementById("listAll").innerHTML ="";
    viewList();
};
function sortByPriceRev() {
    arrayOfBooks.reverse(function(a, b){return a.price - b.price});
    document.getElementById("listAll").innerHTML ="";
    viewList();
};
function sortByID() {
    arrayOfBooks.sort(function(a, b){return a.id - b.id});
    document.getElementById("listAll").innerHTML ="";
    viewList();
};

viewList();
