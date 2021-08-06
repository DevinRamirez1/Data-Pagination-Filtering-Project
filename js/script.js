/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



//variables used in multiple functions/events
const itemsPerPage = 9;
const linkList = document.querySelector('.link-list');
const studentList = document.querySelector('.student-list');
let itemData = data;
let currentPage = 1;


//showPage function to grab data from array and display correct data
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   studentList.innerHTML = '';
   let studentInfo = '';
   //If no results found during search
   if(list.length === 0){
      studentInfo += `<p class="no-results">No Results Found</p>`;
   } else {
      for (i = 0; i < list.length; i++) {
       if (i >= startIndex && i < endIndex) {
            studentInfo += `
                  <li class="student-item cf">
                     <div class="student-details">
                        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                        <h3>${list[i].name.first} ${list[i].name.last}</h3>    
                        <span class="email">${list[i].email}</span>
                     </div>
                     <div class="joined-details">
                        <span class="date">Joined ${list[i].registered.date}</span>
                   </div>
                  </li>`;
         
      }
   }
 }
   studentList.insertAdjacentHTML("beforeend", studentInfo);
}



//addPagination function to create pages that can access data through buttons
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   linkList.innerHTML = '';
   for (i = 1; i <= numOfPages; i++) {
      let button = `
         <li>
            <button type="button" id="pages">${i}</button>
         </li>`;
      linkList.insertAdjacentHTML("beforeend", button);
   }
   const firstBtn =document.getElementById('pages');
   firstBtn.className = "active";
};

//function to create and insert search bar in to header
function insertSearchBar() {
   const header = document.querySelector('.header');
   searchBarHTML = `
   <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button" class="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`;
   header.insertAdjacentHTML("beforeend", searchBarHTML);
}


// Call functions
showPage(data, currentPage);
addPagination(data);
insertSearchBar();

// Variables for search bar
const searchField = document.getElementById('search');
const searchBtn = document.querySelector('button.submit');

//click event for pagination buttons
linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      document.querySelector('button.active').className = '';
      currentPage = e.target.innerText;
      e.target.className = "active";
      showPage(itemData, currentPage);
   }
});

// Click event for search bar
searchField.addEventListener('keyup', () => {
   let searchText = searchField.value.toUpperCase();
   searchBtn.onclick = () => {
      searchField.value = '';
   }

   const filteredList = data.filter(student => {
      return (
         student.name.first.toUpperCase().includes(searchText) ||
         student.name.last.toUpperCase().includes(searchText)
      );
   });
   itemData = filteredList;
   currentPage = 1
   showPage(itemData, currentPage);
   addPagination(itemData);
 
});
