//importing all necessary elements
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const sendLocationButton = document.querySelector('#send-location');

messageOne.textContent = '';
messageTwo.textContent = '';


sendLocationButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadingData();
    navigator.geolocation.getCurrentPosition(({ coords },error) => {
        const roundLatitude = Math.round((coords.latitude + Number.EPSILON) * 100) / 100
        const roundLongitude = Math.round((coords.longitude + Number.EPSILON) * 100) / 100
        const url = '/weatherbutton?longitude=' + roundLongitude + '&latitude='+roundLatitude
        fetch(url).then((response) => {
            response.json().then((data) => {
                messageOne.textContent = 'Location near: ' + data.location.location,
                messageTwo.textContent = data.forecast  
            })
        })
    })
})


// fetch promise management
const display = (promiseData) => {
    promiseData.then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
}

weatherForm.addEventListener('submit', (e) => {
    loadingData();
    e.preventDefault();
    const location = search.value;
    const url = '/weather?address='+location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.message) {
                messageTwo.textContent = data.message;
               return console.log(data.message);
            } else if(data.error) {
                messageTwo.textContent = data.error;
                return console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});

const loadingData = () => {
    messageOne.textContent = 'Loading',
    messageTwo.textContent = ''
}


