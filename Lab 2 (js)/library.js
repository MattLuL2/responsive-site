let books = [];

class Book {
    constructor(id,title,author,status){
        this.id = id;
        this.title = title;
        this.author = author;
        this.status = status;
    }
}

function displayBooks(){
    let availbooks = document.getElementById('availbooks');
    let borrowedbooks = document.getElementById('borrowedbooks');
    let overduebooks = document.getElementById('overduebooks');
    availbooks.innerHTML = '';
    borrowedbooks.innerHTML = '';
    overduebooks.innerHTML = '';

    books.forEach(book =>{
        if(book.status == 'available'){
            availbooks.innerHTML += `<li>${book.title} by ${book.author} 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onclick="changeBookStatus(${book.id},'borrowed')">Mark as Borrowed</button> 
            <button onclick="changeBookStatus(${book.id},'overdue')">Mark as Overdue</button></li>`;
        }
       else if(book.status == 'borrowed'){
            borrowedbooks.innerHTML += `<li>${book.title} by ${book.author} 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onclick="changeBookStatus(${book.id},'available')">Mark as Available</button> 
            <button onclick="changeBookStatus(${book.id},'overdue')">Mark as Overdue</button></li>`;
        }
        else if(book.status == 'overdue'){
            overduebooks.innerHTML += `<li>${book.title} by ${book.author} 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onclick="changeBookStatus(${book.id},'available')">Mark as Available</button> 
            <button onclick="changeBookStatus(${book.id},'overdue')">Mark as Borrowed</button></li>`;
        }
    });
}

function addBook(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let status = document.getElementById('availability').value;
    let id = books.length + 1;
    if (title != '' && author != '' && status != ''){
        books.push(new Book(id,title,author,status));
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        displayBooks();
    }
    else{
        alert('Please fill in all fields');
    }
    
}

function changeBookStatus(id,status){
    let book = books.find(book => book.id == id);
    book.status = status;
    displayBooks();
}

function removeOverdueBooks(){
    books = books.filter(book => book.status != 'overdue');
    displayBooks();
}
