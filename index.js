const textContainer = document.querySelector(".adviceCard .adviceText");
const authorContainer = document.querySelector(".adviceCard .author");
const reloadBtn = document.querySelector(".adviceCard .nextBtn");
const pauseBtn = document.querySelector(".adviceCard .pauseBtn");
const slider = document.querySelector(".slider");

// generating random number
const random = () => {
  const temp = Math.floor(Math.random() * 1000 + 643); // Need to be removed
  return temp;
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
    console.log("API call called populate");
  });


let delay = 5000; //new quote delay duration - 30s

//Interval to call get change the current quote
let popInterval; //
let populateAnimationTimer;// timeout to be called when animation is resumed


// Populating the dom
const populate = () => {
  clearInterval(popInterval)
  popInterval = setInterval(populate, delay)
  while (populateAnimationTimer) {
    populateAnimationTimer = null
    window.clearTimeout(populateAnimationTimer); // will do nothing if no timeout with id is present
  }
  let quote = quotes[random()];
  textContainer.innerHTML = `"${quote.text}"`;
  authorContainer.innerHTML = quote.author;
  slider.getAnimations()[0].currentTime = 0;
};
// getting next quote
reloadBtn.addEventListener("click", () => {
  if (
    slider.style.animationPlayState == "paused"
  ) {
    slider.style.animationPlayState = "running";
  }
  populate();
})


// pausing the current quote
pauseBtn.addEventListener("click", () => {
  if (
    slider.style.animationPlayState == "running" ||
    slider.style.animationPlayState == ""
  ) {
    slider.style.animationPlayState = "paused";
    clearInterval(popInterval)
  } else {
    slider.style.animationPlayState = "running";
    console.log("Time left: ", delay - slider.getAnimations()[0].currentTime);
    // This portion contains bug when populate is called these settimeout and the 
    populateAnimationTimer = setTimeout(() => {
      populate();
      console.log("Animation settimeout called populate");
    }, delay - slider.getAnimations()[0].currentTime);
  }
});
