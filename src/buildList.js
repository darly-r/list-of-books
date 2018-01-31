const arrayOfBooks = 
[
	{id: 10001,
	name: "Mr. Penumbra's 24-Hour Bookstore",
	author: "Robin Sloan",
	price: 38.87},
    {id: 10002,
	name: 'The Book Thief',
	author: 'Markus Zusak',
	price: 8.89},
    {id: 10003,
	name: 'Flowers For Algernon',
	author: 'Daniel Keyesk',
	price: 5.89},
    {id: 10004,
	name: 'THE THIRTEENTH TALE',
	author: '"Markus Zusak',
	price: 29.89},
    {id: 10005,
	name: 'The Girl on the Train',
	author: 'Paula Hawkins',
	price: 19.79}
	];


function viewList(){
	for (let i = 0; i < arrayOfBooks.length; i++) {
	 let classRow="row bg-secondary text-white";
	 if (i % 2 == 0) {classRow="row bg-light text-dark"} else {classRow="row bg-secondary text-white"};

	let div = document.createElement('div');
	div.innerHTML = `<div class="${classRow}">
	<div class="col-lg-1">${arrayOfBooks[i].id}</div>
	<div class="col-lg-3">${arrayOfBooks[i].name}</div>
	<div class="col-lg-2">${arrayOfBooks[i].author}</div>
	<div class="col-lg-1">${arrayOfBooks[i].price}</div>
	<div class="col-lg-2">Details</div>
	</div>`;
	document.getElementById("listAll").appendChild(div);

}
}
 
    

function sortByPrice() {
    arrayOfBooks.sort(function(a, b){return a.price - b.price});
    document.getElementById("listAll").innerHTML ="";
    viewList();
    }
function sortByPriceRev() {
    arrayOfBooks.reverse(function(a, b){return a.price - b.price});
    document.getElementById("listAll").innerHTML ="";
    viewList();
    }
function sortByID() {
    arrayOfBooks.sort(function(a, b){return a.id - b.id});
    document.getElementById("listAll").innerHTML ="";
    viewList();
    }
viewList();
