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

    /*const response = await fetch(url, options);
    const result = await response.json();*/

    const response = await fetch('../JSON/film.json');
    const result = await response.json();

    const gridArea = ["a","b","c"];

    let parentAmount = 0;

    for (let i = 0; i < result.data.length; i++)
    {
        if (movieSearchResultDiv.children[parentAmount].length < 3)
        {
            const movieDiv = 
            "<div class='movie' style='grid-area:" + gridArea[movieSearchResultDiv.children[j].children.length] + ";' >" +
                "<img class='movieImgContainer' src=" + result.data[i].image + " alt=''>" +
                "<div>" + 
                    "<h2 class='movieTitle'>" + result.data[i].title + "</h2>" +
                    "<p>Year: " + result.data[i].year + "</p>" +
                    "<p>Stars: " + result.data[i].stars + "</p>" +                        
                "</div>" +
            "</div>";

            movieSearchResultDiv.children[parentAmount].insertAdjacentHTML("beforeend", movieDiv);
        }
        else 
        {
            const movieParentDiv =
            "<div class='movieParent'></div>"
            movieSearchResultDiv.insertAdjacentHTML("beforeend", movieParentDiv);
            parentAmount++;
        }
    }
});