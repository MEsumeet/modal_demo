// get all elements into declarations

const search = document.getElementById("search");
const addBtn1 = document.getElementById("addBtn1");
const modalForm = document.querySelector(".modalForm");
const addMovie = document.querySelector(".addMovie");
const cancelBtnModalForm = document.getElementById("cancelBtnModalForm");
const closeIcon = document.querySelector(".modalHeading > i");
const titleInput = document.getElementById("title");
const posterPathInput = document.getElementById("poster");
const ratingInput = document.getElementById("rating");
const reviewInput = document.getElementById("review");
const movieCards = document.querySelector(".movieCards");

let moviesdb = [];           //for storing data from form submission


// functions
// 'search' input event callback 
const searchEventHandler = (e) => {
    let searchVal = (e.target.value).toLowerCase().trim();
    let temp = moviesdb.filter(movie => movie.title.toLowerCase().includes(searchVal));
    templating(temp);
}
// interaction 'add movie' btn event callback
const addBtn1ClickEvent = () => {
    modalForm.classList.remove("d-none");
}
// 'modalForm' closing- (cross icon & cancel btn) event callback
const closeEventHandler = (e) => {
        modalForm.classList.add("d-none");
}
// 'outside modal form' click event callback
const closeEventHandler2 = (e) => {
    if(!addMovie.contains(e.target)){
        modalForm.classList.add("d-none");
    }
}

// add movie form submit event callback
const addMovieEventHandler = (e) => {
    e.preventDefault();
    let obj = {
        title : titleInput.value,
        posterPath : posterPathInput.value,
        rating : ratingInput.value,
        review : reviewInput.value
    }
    moviesdb.push(obj);
    localStorage.setItem("movies", JSON.stringify(moviesdb));
    templating(moviesdb);
    modalForm.classList.add("d-none");
    e.target.reset();
}

// html card templating 
function templating(arr){
    let final = '';
    arr.forEach(ele => {
        final += `
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <figure class="posters">
                                <img src= "${ele.posterPath}" class="img-fluid" alt="${ele.title}">
                                <figcaption>
                                    <h4 class="title">${ele.title}</h4>
                                    <span class="rating">${ele.rating} / 5</span>
                                </figcaption>
                                <div class="review">
                                    <h5>Review</h5>
                                    <p>${ele.review}</p>
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>
                `;
    })
    movieCards.innerHTML = final;
}

// if previous data on local storage
if(localStorage.getItem("movies")){
    moviesdb = JSON.parse(localStorage.getItem("movies"));
    templating(moviesdb);
}

// events

search.addEventListener("keyup", searchEventHandler)
addBtn1.addEventListener("click", addBtn1ClickEvent);
addMovie.addEventListener("submit", addMovieEventHandler);
cancelBtnModalForm.addEventListener("click", closeEventHandler);
closeIcon.addEventListener("click", closeEventHandler);
modalForm.addEventListener("click", closeEventHandler2);