//Create the setup function
function setup() {
    
    //Create the button variable
    var btn = document.getElementById('searchBtn');
    
    //Create the searchDB fuction
    function searchDB() {
        
        //Create a new xhr
        var xhr = new XMLHttpRequest();
        
        //Create variables
        var query = document.getElementById('search').value;
        var url = 'https://api.themoviedb.org/3/search/movie?api_key=bf500a5966c902b3fa4dc1fc69fcf904&language=en-US&query=' + query;
        
        //Create and call the onload function
        xhr.onload = function() {
            
            //Make sure there are no errors with the response
            if (xhr.status === 200) {
                
                //Convert the response text from JSON
                var resObj = JSON.parse(xhr.responseText);
                
                //Declare variables
                var movie = document.querySelectorAll("#results article");
                var viewMore = document.querySelector("#main a");
                var imgBaseUrl = "https://image.tmdb.org/t/p/w300";
                var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                
                //Make sure the element exists before attempting to write to it
                if (movie !== null) {
                    for (i = 0; i < movie.length; i++) {
                        
                        //Create the variable for the image of the current article
                        var movieImg = movie[i].querySelector("img");
                        
                        //Check if the image is null
                        if (resObj.results[i].poster_path === null) {
                            
                            //If the image is null then use placeholder image
                            movieImg.src = "/DWS2-Project1/images/no_img.jpg";
                        }
                        else {
                            //Change the src for the image to it's proper values
                            movieImg.src = imgBaseUrl + resObj.results[i].poster_path;
                        }
                        
                        //Change the alt for the image to it's proper values
                        movieImg.alt = resObj.results[i].title + " poster image";
                        
                        //Create the variable for the title of the current article
                        var movieTitle = movie[i].querySelector("h3");
                        movieTitle.innerHTML = resObj.results[i].title;
                        
                        //Create the variable for the rating of the current article
                        var movieRating = movie[i].querySelector(".rating");
                        movieRating.innerHTML = resObj.results[i].vote_average.toFixed(1);
                        
                        //Create the variable for the date of the current article
                        var movieDate = movie[i].getElementsByTagName("p")[1];
                        
                        //Check if the release date is a proper value
                        if (resObj.results[i].release_date === NaN || resObj.results[i].release_date === null || resObj.results[i].release_date === undefined || resObj.results[i].release_date === "") {
                            
                            //If release date isn't present let the user know that it's unknown.
                            movieDate.innerHTML = "Release Date Unknown";
                        }
                        else {
                            //Split the release date
                            var dateStr = resObj.results[i].release_date.split("-")
                            
                            //Create a new date with the split string
                            var resObjDate = new Date(dateStr);
                            
                            //Change the value of the release date in "month day, year" format
                            movieDate.innerHTML = "Release Date: " + months[parseInt(dateStr[1], 10) -1] + " " + resObjDate.getDate() + ", " + resObjDate.getFullYear();
                        }
                    }
                    
                    //set the view more link to the search page for the user's query
                    viewMore.href = "https://www.themoviedb.org/search?query=" + query;
                }
            }
            
            //If error 401 occurs let user know why
            if (xhr.status === 401) {
                console.log("Error: Invalid API key!");
            }
            
            //If error 404 occurs let user know why
            if (xhr.status === 404) {
                alert("Error: The resource you requested could not be found! Please try again!");
            }
            
            //If error 422 occurs let user know why
            if (xhr.status === 422) {
                alert("Error: Please do not leave blank!");
            }
        }
        
        //Check for connection errors
        xhr.onerror = function() {
            console.log('connection error');
        }
        
        //Open and send the xhr
        xhr.open('GET', url, true);
        xhr.send(null);
    }
    
    //Check to make sure the btn exists
    if (btn !== null) {
        
        //Listen for the click event
        btn.addEventListener('click', searchDB, false);   
    }
}

//Listen for the window load event
window.addEventListener("load", setup, false);