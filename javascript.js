//Create the setup function
function setup() {
    
    //Create the button variable
    const btn = document.getElementById('searchBtn');
    
    //Create the searchDB fuction
    function searchDB() {
        
        //Create a new xhr
        var xhr = new XMLHttpRequest();
        
        //Create variables
        const main = document.querySelector('#results');
        const viewMoreLink = document.querySelector("#main a");
        const viewMoreBtn = main.querySelector("#results + p");
        const mainh2 = document.querySelector('main h2');
        const query = document.getElementById('search').value;
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=bf500a5966c902b3fa4dc1fc69fcf904&language=en-US&query=' + query;
        
        //Create and call the onload function
        xhr.onload = function() {
            
            main.innerHTML = "";
            var i = 0;
            
            //Make sure there are no errors with the response
            if (xhr.status === 200) {
                
                //Convert the response text from JSON
                const resObj = JSON.parse(xhr.responseText);
                
                if (resObj.total_results !== 0) {
                    
                    if (resObj.total_results > 15) {
                        viewMoreBtn.classList.remove("hide");   
                    }
                    mainh2.innerHTML = "Search Results";
                    mainh2.classList.remove("error");
                 
                    //Declare variables
                    const imgBaseUrl = "https://image.tmdb.org/t/p/w300";
                    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

                        while (i < resObj.total_results && i != 15) {
                            
                            let movieImgAlt = [i];
                            let movieImgSrc = [i];
                            let movieTitle = [i];
                            let movieRating = [i];
                            let movieDate = [i];

                            //Check if the image is null
                            if (resObj.results[i].poster_path === null || resObj.results[i].poster_path === undefined || resObj.results[i].poster_path === "") {

                                //If the image is null then use placeholder image
                                movieImgSrc[i] = "../images/no_img.jpg";
                            }
                            else {
                                //Change the src for the image to it's proper values
                                movieImgSrc[i] = imgBaseUrl + resObj.results[i].poster_path;
                                movieImgAlt[i] = resObj.results[i].title + " poster image";
                            }

                            //Create the variable for the title of the current article
                            movieTitle[i] = resObj.results[i].title;

                            //Create the variable for the rating of the current article
                            movieRating[i] = resObj.results[i].vote_average.toFixed(1);

                            //Check if the release date is a proper value
                            if (resObj.results[i].release_date.isNaN || resObj.results[i].release_date === null || resObj.results[i].release_date === undefined || resObj.results[i].release_date === "") {

                                //If release date isn't present let the user know that it's unknown.
                                movieDate[i] = "Release Date Unknown";
                            }
                            else {
                                //Split the release date
                                let dateStr = resObj.results[i].release_date.split("-");

                                //Create a new date with the split string
                                let resObjDate = new Date(dateStr);

                                //Change the value of the release date in "month day, year" format
                                movieDate[i] = "Release Date: " + months[parseInt(dateStr[1], 10) -1] + " " + resObjDate.getDate() + ", " + resObjDate.getFullYear();
                            }
                            
                            main.innerHTML += "<article> <img src='" +movieImgSrc[i]+ "' alt='" +movieImgAlt[i]+ "' width='300' height='450'> <h3>" +movieTitle[i]+ "</h3> <p class='rating'>" +movieRating[i]+ "</p> <p>" +movieDate[i]+ "</p> </article>";
                            
                            
                            i++;
                        }

                    //set the view more link to the search page for the user's query
                    viewMoreLink.href = "https://www.themoviedb.org/search?query=" + query;
                    mainh2.innerHTML = "Results for " + query;
                    
                }
                else {
                    if (mainh2[1] === undefined) {
                        mainh2.innerHTML = ("Error: The movie you requested could not be found! <br>Please try again!");
                        mainh2.classList.add("error");
                    }
                    viewMoreBtn.classList.add("hide");
                }
            }
            
            //If error 401 occurs let user know why
            if (xhr.status === 401) {
                console.log("Error: Invalid API key!");
            }
            
            //If error 404 occurs let user know why
            if (xhr.status === 404) {
                alert("Error: 404 Not Fount!");
            }
            
            //If error 422 occurs let user know why
            if (xhr.status === 422) {
                alert("Error: Please do not leave blank!");
            }
        };
        
        //Check for connection errors
        xhr.onerror = function() {
            console.log('connection error');
        };
        
        //Open and send the xhr
        xhr.open('GET', url, true);
        xhr.send(null);
    }
    
    document.getElementById('search').addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            btn.click();
        }
    });
    
    //Check to make sure the btn exists
    if (btn !== null) {
        
        //Listen for the click event
        btn.addEventListener('click', searchDB, false);
    }
}

//Listen for the window load event
window.addEventListener("load", setup, false);