let books = document.getElementsByClassName('book');
console.log(books);

for (let i = 0; i < books.length; i++) {
	books[i].addEventListener('mouseover', function() {
	  books[i].classList.add('lift-cover');
	});
  
	books[i].addEventListener('mouseout', function() {
	  books[i].classList.remove('lift-cover');
	});
  
	books[i].addEventListener('touchstart', function() {
	  books[i].classList.add('lift-cover');
	});
  
	books[i].addEventListener('touchend', function() {
	  books[i].classList.remove('lift-cover');
	});
  }