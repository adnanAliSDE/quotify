// DOM elements
const textContainer = document.querySelector(".adviceCard .adviceText");
const authorContainer = document.querySelector(".adviceCard .author");
const nextBtn = document.querySelector(".adviceCard .nextBtn"); // Updated identifier
const pauseBtn = document.querySelector(".adviceCard .pauseBtn");
const slider = document.querySelector(".slider");

// Constants
const URL = "https://type.fit/api/quotes";
const DELAY = 30000;

// Variables
let quotes = [];
let popInterval;
let populateAnimationTimer;

// Helper function to get a random integer between min and max (inclusive)
const getRandomInteger = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Fetch quotes from the API
const fetchQuotes = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    quotes = data;
    console.log("Data", quotes);
    populate();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
};

// Populate the DOM with a new quote
const populate = () => {
  clearInterval(popInterval);
  popInterval = setInterval(populate, DELAY);
  clearTimeout(populateAnimationTimer);

  const quote = quotes[getRandomInteger(0, quotes.length - 1)];
  textContainer.innerHTML = `"${quote.text}"`;
  authorContainer.innerHTML = quote.author;

  // Restart the slider animation
  slider.style.animation = "none";
  void slider.offsetWidth; // Trigger reflow
  slider.style.animation = null;
};

// Event listeners
nextBtn.addEventListener("click", () => {
  if (slider.style.animationPlayState === "paused") {
    slider.style.animationPlayState = "running";
  }
  populate();
});

pauseBtn.addEventListener("click", () => {
  const animationState = slider.style.animationPlayState || "";
  if (animationState === "running" || animationState === "") {
    slider.style.animationPlayState = "paused";
    clearInterval(popInterval);
  } else {
    slider.style.animationPlayState = "running";
    const remainingTime = DELAY - (slider.getAnimations()[0].currentTime * 1000);
    console.log("Time left:", remainingTime);
    populateAnimationTimer = setTimeout(() => {
      populate();
      console.log("Animation setTimeout called populate");
    }, remainingTime);
  }
});

// Initial fetch of quotes
fetchQuotes();