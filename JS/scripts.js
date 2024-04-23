const searchButton = document.getElementById('SearchButton');
const searchResultDiv = document.getElementById('SearchResultDiv');

searchButton.addEventListener('click', async function()
{
    const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=' + document.getElementById('SearchInput').value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b4143b935msh14d84608bb7062bp1e3116jsnea621a7f5b6c',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();

    /*const response = await fetch('../JSON/film.json');
    const result = await response.json();*/

    let parentAmount = 0;

    for (let i = 0; i < result.data.length; i++)
    {
        if (searchResultDiv.children[parentAmount].children.length == 3) 
        {
            const resultParentDiv =
            "<div class='resultParent'></div>"
            searchResultDiv.insertAdjacentHTML("beforeend", resultParentDiv);
            parentAmount++;
        }
        if (searchResultDiv.children[parentAmount].children.length < 3)
        {

            if (result.data[i].id[0] == "t")
            {
                const movieDiv = 
                "<div class='result'>" +
                    "<img class='resultImgContainer' src=" + result.data[i].image + " alt=''>" +
                    "<div>" + 
                        "<h2 class='resultTitle'>" + result.data[i].title + "</h2>" +
                        "<p>Year: " + result.data[i].year + "</p>" +
                        "<p>Stars: " + result.data[i].stars + "</p>" +                        
                    "</div>" +
                "</div>";
                searchResultDiv.children[parentAmount].insertAdjacentHTML("beforeend", movieDiv);
            }
            else if (result.data[i].id[0] == "n")
            {
                const actorDiv = 
                "<div class='result'>" +
                    "<img class='resultImgContainer' src=" + result.data[i].image + " alt=''>" +
                    "<div>" + 
                        "<h2 class='resultTitle'>" + result.data[i].title + "</h2>" +
                        "<p>Work: " + result.data[i].stars + "</p>" +                        
                    "</div>" +
                "</div>";
                searchResultDiv.children[parentAmount].insertAdjacentHTML("beforeend", actorDiv);
            }
        }
    }

    while (true)
    {
        if  (searchResultDiv.children[parentAmount].children.length < 3)
        {
            const movieDiv = "<div class='result'> </div>"
            searchResultDiv.children[parentAmount].insertAdjacentHTML("beforeend", movieDiv);
        }
        else
            break;
    }
});