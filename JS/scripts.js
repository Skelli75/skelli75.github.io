const searchButton = document.getElementById('movieSearchButton');

searchButton.addEventListener('click', async function()
{
    const url = 'https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=' + document.getElementById('movieSearch');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b4143b935msh14d84608bb7062bp1e3116jsnea621a7f5b6c',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        }
    };

    const repsone = await fetch(url, options);
    const result = await repsone.json();





});