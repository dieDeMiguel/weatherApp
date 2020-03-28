//importing all necessary elements
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';


weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading';
    e.preventDefault();
    const location = search.value;
    const url = 'http://localhost:3000/weather?address='+location;
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


