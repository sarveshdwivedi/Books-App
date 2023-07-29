$(document).ready(function () {

	// The base url for API calls
	var apiBaseURL = 'https://s3.amazonaws.com/api-fun/books.json';


	//==========Function to call books api and get list of books from db=====================//
	let author, authorBirthday, authorBirthPlace;
	function getBooksList() {
		$.getJSON(apiBaseURL, function (booksListData) {
			console.log(booksListData.data.books);
			let booksList = booksListData.data.books;
			author = booksListData.data.author;
			authorBirthday = booksListData.data.birthday;
			authorBirthPlace = booksListData.data.birthPlace;
			for (let i = 0; i < booksList.length; i++) {

				var title = booksList[i].title;
				var imageUrl = booksList[i].imageUrl;
				var purchaseLink = booksList[i].purchaseLink;
				var PublishDate = booksList[i].PublishDate;

				var elementHTML = '';

				elementHTML += '<div class="col-sm-6 eachBook" id="bookId-' + i + '">';
				elementHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + imageUrl + '" style="width: 550px;height: 400px;"></button>';
				elementHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
				elementHTML += '<div class="modal-dialog" role="document">';
				elementHTML += '<div class="modal-content col-sm-12">';
				elementHTML += '<div class="col-sm-6 bookPosterInModal">';
				elementHTML += '<a href="' + purchaseLink + '"><img src="' + imageUrl + '"></a>';
				elementHTML += '</div><br>';
				elementHTML += '<div class="col-sm-6 bookDetails">';
				elementHTML += '<div class="bookName">' + title + '</div><br>';
				elementHTML += '<div class="linkToPurchase"><a href="' + purchaseLink + '"><span class="glyphicon glyphicon-play"></span>&nbsp Purchase URL</a>' + '</div><br>';
				elementHTML += '<div class="release">Publish Date: ' + PublishDate + '</div><br>';
				elementHTML += '</div>';
				elementHTML += '</div>';
				elementHTML += '</div>';
				elementHTML += '</div>';
				elementHTML += '<div class="delBtn" ><a onclick="deleteBooks(' + i + ')" id="deleteBook" bookId="' + i + '" href="javascript:void(0)">Delete Book</a></div><br>';
				elementHTML += '</div>';

				$('#books-grid').append(elementHTML);

				$('#booksListLabel').html("Book Listing");

			}

			//Add books author details

			$('#booksauthor').html('Author : ' + author);
			$('#booksbirthday').html('Birthday : ' + authorBirthday);
			$('#booksbirthPlace').html('birthPlace : ' + authorBirthPlace);
		})
	}



	getBooksList();

	//Reset HTML strings to empty to overwrite with new one!
	var elementHTML = '';

});


//delete book from list
function deleteBooks(index) {
	let text = "Are you sure want to delete selected book";
	if (confirm(text) == true) {
		const element = document.getElementById("bookId-" + index);
		element.remove();
	}
}