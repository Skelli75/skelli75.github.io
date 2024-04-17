const searchButton = document.getElementById('movieSearchButton');
const movieSearchResultDiv = document.getElementById('movieSearchResultDiv');

searchButton.addEventListener('click', async function()
{
    const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=' + document.getElementById('movieSearch').value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b4143b935msh14d84608bb7062bp1e3116jsnea621a7f5b6c',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        }
    };

    const repsone = await fetch(url, options);
    const result = await repsone.json();


    for (let i = 0; i < result.data.length; i++)
    {
        const movieDiv = 
        "<div class='movie'>" +
            "<img class='movieImgContainer' src=" + result.data[i].image + " alt=''>" +
            "<div>" + 
                "<h2 class='movieTitle'>" + result.data[i].title + "</h2>" +
                "<p>Year: " + result.data[i].year + "</p>" +
                "<p>Stars: " + result.data[i].stars + "</p>" +                        
            "</div>" +
        "</div>";

        movieSearchResultDiv.insertAdjacentHTML("beforeend", movieDiv);

    }
});