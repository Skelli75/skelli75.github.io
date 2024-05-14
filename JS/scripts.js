const searchButton = document.getElementById('SearchButton');
const searchResultDiv = document.getElementById('SearchResultDiv');

searchButton.addEventListener('click', async function()
{

    EmptyResults();

    const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=' + document.getElementById('SearchInput').value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b4143b935msh14d84608bb7062bp1e3116jsnea621a7f5b6c',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com',
        }
    };

    /*const response = await fetch(url, options);
    const result = await response.json();*/

    const response = await fetch('JSON/horror.json');
    const result = await response.json();

    let parentAmount = 1;

    for (let i = 0; i < result.data.length; i++)
    {
        let parentDiv = searchResultDiv.children[parentAmount];

        if (parentDiv.children.length == 3) 
        {
            const resultParentDiv =
            "<div class='resultParent'></div>"
            searchResultDiv.insertAdjacentHTML("beforeend", resultParentDiv);
            parentAmount++;

            parentDiv = searchResultDiv.children[parentAmount];
        }
        if (parentDiv.children.length < 3)
        {

            if (result.data[i].id[0] == "t" || result.data[i].id[0] == "/")
            {
                const movieDiv = 
                "<div class='result'>" +
                    "<div>" + 
                        "<h2 class='resultTitle'>" + result.data[i].title + "</h2>" +
                        "<p>Year: " + result.data[i].year + "</p>" +
                        "<p>Stars: " + result.data[i].stars + "</p>" +                        
                    "</div>" +
                "</div>";

                parentDiv.insertAdjacentHTML("beforeend", movieDiv);
            }
            else if (result.data[i].id[0] == "n")
            {
                const actorDiv = 
                "<div class='result'>" +
                    "<div>" + 
                        "<h2 class='resultTitle'>" + result.data[i].title + "</h2>" +
                        "<p>Work: " + result.data[i].stars + "</p>" +                        
                    "</div>" +
                "</div>";
                parentDiv.insertAdjacentHTML("beforeend", actorDiv);
            }
            
            AddImg(parentDiv.children[parentDiv.children.length - 1], result.data[i].image);
        }
    }
});


async function Top10()
{
    const top10Div = document.getElementById("top10Div");

    const url = 'https://imdb188.p.rapidapi.com/api/v1/getWeekTop10';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1999f328f8mshddb7fa95a20ed12p132dc7jsnc13c09836bd0',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        }
    };

    /*const response = await fetch(url, options);
    const result = await response.json();*/

    const response = await fetch('JSON/weektop10.json');
    const result = await response.json();

    let parentAmount = 1;

    for (let i = 0; i < result.data.length; i++)
    {
        let parentDiv = top10Div.children[parentAmount];

        if (parentDiv.children.length == 2) 
        {
            const resultParentDiv =
            "<div class='resultParent'></div>"
            top10Div.insertAdjacentHTML("beforeend", resultParentDiv);
            parentAmount++;

            parentDiv = top10Div.children[parentAmount];
        }
        if (parentDiv.children.length < 2)
        {
            const movieDiv = 
            "<div class='result'>" +
                "<div>" + 
                    "<h2 class='resultTitle'>" + result.data[i].titleText.text + "</h2>" +
                    "<p>Year: " + result.data[i].releaseYear.year + "</p>" +
                "</div>" +
            "</div>";

            parentDiv.insertAdjacentHTML("beforeend", movieDiv);
            
            AddImg(parentDiv.children[parentDiv.children.length - 1], result.data[i].primaryImage.imageUrl);
        }
    }

    while (true)
    {
        if  (top10Div.children[parentAmount].children.length < 2)
        {
            const movieDiv = "<div class='result'> </div>"
            top10Div.children[parentAmount].insertAdjacentHTML("beforeend", movieDiv);
        }
        else
            break;
    }
};



function AddImg(div, img)
{
    let imgDiv;

    if (img === undefined)
    {
        imgDiv = "<img class='resultImgContainer' src='../Resources/No-Image-Placeholder.svg' alt=''>";
    }
    else 
    {
        imgDiv = "<img class='resultImgContainer' src=" + img + " alt=''>";
    }

    div.insertAdjacentHTML("afterbegin", imgDiv)
};

function EmptyResults()
{
    searchResultDiv.innerHTML = "";
    searchResultDiv.insertAdjacentHTML("beforeend", "<h1 style='color: white;'>Search results:</h1>")
    searchResultDiv.insertAdjacentHTML("beforeend", "<div class='resultParent'></div>")
};


document.addEventListener('DOMContentLoaded', function() 
{
    Top10();
    SetUpCollapsible();
});


function SetUpCollapsible()
{
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) 
    {
        if (!coll[i].hasAttribute("events"))
        {
            coll[i].setAttribute("events", true);
            coll[i].addEventListener("click", function() 
            {
                this.classList.toggle("active");

                var content = this.parentNode.children;
                delete content[0];
                

                for(var j = 0; j < content.length; j++){
                    if (content[j].style.display === "flex")
                    {
                        content[j].style.display = "none";
                    } 
                    else 
                    {
                        content[j].style.display = "flex";
                        content[j].style.flexDirection = "row";
                    }
                };
            });
        }
    }
};