const textContainer = document.querySelector(".adviceCard .adviceText");
const authorContainer = document.querySelector(".adviceCard .author");
const reloadBtn = document.querySelector(".adviceCard .nextBtn");
const pauseBtn = document.querySelector(".adviceCard .pauseBtn");
const slider = document.querySelector(".slider");

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
  textContainer.innerHTML = `"${quote.text}"`;
  authorContainer.innerHTML = quote.author;
  slider.getAnimations()[0].currentTime = 0;
};

// getting new quotes
let delay = 30000; //new quote delay duration
reloadBtn.addEventListener("click", () => {
  populate();
  clearInterval(popInterval);
  popInterval = setInterval(populate, delay);
});

const popInterval = setInterval(populate, delay);

// pausing the current quote
pauseBtn.addEventListener("click", () => {
  if (
    slider.style.animationPlayState == "running" ||
    slider.style.animationPlayState == ""
  ) {
    slider.style.animationPlayState = "paused";
    clearInterval(popInterval);
  } else {
    slider.style.animationPlayState = "running";
    setTimeout(() => {
      populate();
      popInterval = setInterval(populate, delay);
    }, delay - slider.getAnimations()[0].currentTime);
  }
});
