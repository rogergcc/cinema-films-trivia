
// const inputElement = document.querySelector('#search');
// const bntElement = document.querySelector('.btn');
// const mapa = document.querySelector('.mapa');

// const ip = document.getElementById('ip');
// const locationCity = document.getElementById('location');
// const timeZone = document.getElementById('timezone');
// const ispHost = document.getElementById('isp');

// const mapId = document.getElementById('map');
// const searching = document.getElementById('searching');
// const searchContainer = document.getElementById('search-container');
// const address = document.getElementById('address');

// const errorIp = document.getElementById('error-ip');



// getLocation = async function (host) {
async function getLocation(host) {

    const api = `/api/ip-location?host=${host}`;
    let data;
    let todo = {
        item: host
    };

    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            //body: JSON.stringify(todo)
        });
        data = await response.json()

        //return (data);
    } catch (error) {
        console.log(error);
    }
    // return data.data;
    return (data);

}




document.addEventListener("DOMContentLoaded", async function (e) {
    //do work
    //errorIp.style.display = "none";
    
});


inputElement.addEventListener("keydown", function (e) {

    // var key = e.which && e.which || e.keyCode();

    // if (key === 13) {
    //     e.preventDefault();
    //     findIp();
    // }


})
async function findIp() {

    
    let ipAddress = inputElement.value;
    ipAddress = ipAddress.trim();


}

searching.addEventListener('click', function (e) {
    e.preventDefault();


    //findIp();
});


