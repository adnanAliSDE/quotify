const textContainer = document.querySelector(".adviceCard .adviceText");
const authorContainer = document.querySelector(".adviceCard .author");
const reloadBtn=document.querySelector('.adviceCard .btn');
const slider=document.querySelector('.slider');

// generating random number
const random = () => {
  return Math.floor(Math.random() * 1000 + 643);
};

// fetching data
let quotes;
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    quotes = data;
    populate();
  });

// Populating the dom
const populate = () => {
  let quote = quotes[random()];
  if(quote.author==''){
    populate();
  }
  textContainer.innerHTML =`"${quote.text}"`;
  authorContainer.innerHTML = quote.author;
  slider.getAnimations()[0].currentTime=0;
};

// getting new quotes
reloadBtn.addEventListener('click',populate);

setInterval(() => {
    populate()
}, 20000);
