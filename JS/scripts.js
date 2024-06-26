const searchButton = document.getElementById('SearchButton');
const searchResultDiv = document.getElementById('SearchResultDiv');

searchButton.addEventListener('click', async function() //fyller sökresultaten med filmer
{
    EmptyResults(); 


    const searchquery = document.getElementById('SearchInput').value.replace(/\s/g, ""); //tar bort mellanrum i sökorden


    const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=' + searchquery;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b4143b935msh14d84608bb7062bp1e3116jsnea621a7f5b6c',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com',
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();

    /*const response = await fetch('JSON/horror.json');*/ /*test för att inte använda upp alla api anrop*/ 
    /*const result = await response.json();*/

    for (let i = 0; i < result.data.length; i++)
    {
        let parentDiv = searchResultDiv.children[searchResultDiv.children.length - 1];

        if (parentDiv.children.length == 3) //Lägger till en ny förälder om den aktuella föräldern innehåller 3 barn
        {
            const resultParentDiv =
            "<div class='resultParent'></div>"
            searchResultDiv.insertAdjacentHTML("beforeend", resultParentDiv);

            parentDiv = searchResultDiv.children[searchResultDiv.children.length - 1];
        }
        if (parentDiv.children.length < 3) //om föräldern inte är full
        {

            if (result.data[i].id[0] == "t" || result.data[i].id[0] == "/") //Kollar om resultatet är en film 
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
            else if (result.data[i].id[0] == "n") //Kollar om resultatet är en skådespelare
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

    SetUpCollapsible();
});


async function Top10() //fyller top10 med resultat
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

    /*test för att inte använda upp alla api anrop*/
    const response = await fetch('JSON/weektop10.json'); 
    const result = await response.json();

    for (let i = 0; i < result.data.length; i++)
    {
        let parentDiv = top10Div.children[top10Div.children.length - 1];

        if (parentDiv.children.length == 2) //skapar en ny förälder om den senaste föräldern är full
        {
            const resultParentDiv =
            "<div class='resultParent'></div>"
            top10Div.insertAdjacentHTML("beforeend", resultParentDiv);

            parentDiv = top10Div.children[top10Div.children.length - 1];
        }
        if (parentDiv.children.length < 2) //om den aktulle föräldern inte är full
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
};



function AddImg(div, img) 
{
    let imgDiv;

    if (img === undefined) //om bilden är undefined ersätts den med en standard bild
    {
        imgDiv = "<img class='resultImgContainer' src='../Resources/No-Image-Placeholder.svg' alt=''>";
    }
    else //Om bilden inte är undefined läggs den till i diven
    {
        imgDiv = "<img class='resultImgContainer' src=" + img + " alt=''>";
    }

    div.insertAdjacentHTML("afterbegin", imgDiv)
};

function EmptyResults() //Tömmer searchresultdiven och fyller den med standard värdena.
{
    searchResultDiv.innerHTML = "";
    searchResultDiv.insertAdjacentHTML("beforeend", "<Button class='collapsible' style='color: white;''><img src='Resources/right-arrow-small.png' alt='right-arrow-small'><h1>Search results:</h1></Button>")
    searchResultDiv.insertAdjacentHTML("beforeend", "<div class='resultParent'></div>")
};


document.addEventListener('DOMContentLoaded', function() //laddar in top10 när sidan laddats in
{
    Top10();
    SetUpCollapsible();
});


function SetUpCollapsible() //gör så att resultaten går att gömma med en knapp
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

                for(var j = 1; j < content.length; j++){
                    if (content[j].style.display === "none")
                    {
                        content[j].style.display = "flex";
                        PointCollapsibleImgDown(this.children[0]);
                    } 
                    else 
                    {
                        content[j].style.display = "none";
                        PointCollapsibleImgUp(this.children[0]);
                    }
                };
            });
        }
    }
};

function PointCollapsibleImgUp(img) //vänder pilen som representerar collapsible knappen uppåt
{
    img.style.transform = 'rotate(180deg)';
};

function PointCollapsibleImgDown(img) //vänder den neråt
{
    img.style.transform = 'rotate(0deg)';
};