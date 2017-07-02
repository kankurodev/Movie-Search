//Create a new xhr
var xhr = new XMLHttpRequest();

//On load populate the form with popular movies by default
xhr.onload = function() {
    
    //Parse the JSON data
    var resObj = JSON.parse(xhr.responseText);
    
    //Create variables to populate the page
    var result = document.querySelectorAll("#results article");
    var viewMore = document.querySelector("#main a");
    var imgBaseUrl = "https://image.tmdb.org/t/p/w300/";
    var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    
    //verify the 
    if (result !== null) {
        
        //Loop through each article and assign each on it's contents
        for (i = 0; i < result.length; i++) {
            
            //Create the variable for the image of the current article
            var resultImg = result[i].querySelector("img");
            
            //Change the attributes for the image to it's proper values
            resultImg.src = imgBaseUrl + resObj.results[i].poster_path;
            resultImg.alt = resObj.results[i].title + " poster image";
            
            //Create the variable for the title of the current article
            var resultTitle = result[i].querySelector("h3");
            resultTitle.innerHTML = resObj.results[i].title;
            
            //Create the variable for the rating of the current article
            var resultRating = result[i].querySelector(".rating");
            resultRating.innerHTML = resObj.results[i].vote_average.toFixed(1);
            
            //Split the release date
            var dateStr = resObj.results[i].release_date.split("-")
            
            //Create a new date with the split string
            var resObjDate = new Date(dateStr);
            
            //Create the variable for the date of the current article
            var resultDate = result[i].getElementsByTagName("p")[1];
            
            //Change the value of the release date in "month day, year" format
            resultDate.innerHTML = "Release Date: " + months[parseInt(dateStr[1], 10) -1] + " " + resObjDate.getDate() + ", " + resObjDate.getFullYear();
        }
    }
     
    //Make sure the element exists
    if (viewMore !== null) {
        
        //Change the link to it's appropiate value
        viewMore.href = "https://www.themoviedb.org/movie";
    }
}

//Open and send the xhr
xhr.open("GET", "https://api.themoviedb.org/3/movie/popular?api_key=bf500a5966c902b3fa4dc1fc69fcf904&language=en-US&page=1", true);
xhr.send(null);