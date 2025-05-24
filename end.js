// Get saved scores from localStorage
const storedScores = localStorage.getItem("personalityScores");
const personalityScores = storedScores ? JSON.parse(storedScores) : null;

if (personalityScores) {
  // Find the personality type with the highest score 
  let highestType = null;
  let highestScore = -1;

  for (let type in personalityScores) {
    if (personalityScores[type] > highestScore) {
      highestScore = personalityScores[type];
      highestType = type;
    }
  }

  // Descriptions for each type
  const personalityDescriptions = {
    Bold: "You’re fearless and full of fire. You charge into the unknown like a true warrior.",
    Strategist: "Every move you make is part of a plan. You see the big picture — always.",
    Joker: "Laughter is your weapon. You bring the energy, the charm, and the fun.",
    Improviser: "You flow with the moment and flip chaos into opportunity. Nothing phases you."
  };

  // Personality image and sound mapping
  const personalityAssets = {
    Bold: {
      image: "./images/bold.png",
      sound: "./sounds/bold.mp3"
    },
    Strategist: {
      image: "./images/strategist.png",
      sound: "./sounds/strategist.mp3"
    },
    Joker: {
      image: "./images/funny.png",
      sound: "./sounds/joker.mp3"
    },
    Improviser: {
      image: "./images/improviser.png",
      sound: "./sounds/improviser.mp3"
    }
  };

  const resultElement = document.getElementById("personality-result");

  if (resultElement) {
    const personality = personalityAssets[highestType];

    // Create image element with glow animation
    const img = document.createElement("img");
    img.src = personality.image;
    img.alt = highestType;
    img.classList.add("personality-image", "pulse"); // 🔁 Add pulse effect

    const sound = new Audio(personality.sound);
    sound.preload = "auto";
    sound.volume = 0.6;

    // Stop pulsing animation on interaction
    const stopPulse = () => {
      img.classList.remove("pulse");
    };

    img.addEventListener("mouseenter", () => {
      sound.currentTime = 0;
      sound.play().catch((err) => console.warn("Image hover sound error:", err));
      stopPulse();
    });

    img.addEventListener("touchstart", () => {
      sound.currentTime = 0;
      sound.play().catch((err) => console.warn("Image tap sound error:", err));
      stopPulse();
    });

    // Create result content  
    const textContent = document.createElement("div");
    textContent.classList.add("text-content");
    textContent.innerHTML = `
      <div class="personality-output">${highestType}</div>
      <p>${personalityDescriptions[highestType] || "You're a unique underdog!"}</p>
    `;

    const resultWrapper = document.createElement("div");
    resultWrapper.classList.add("result-content");
    resultWrapper.appendChild(img);
    resultWrapper.appendChild(textContent);

    resultElement.innerHTML = "";
    resultElement.appendChild(resultWrapper);
  }
} else {
  const resultElement = document.getElementById("personality-result");
  if (resultElement) {
    resultElement.innerText = "Oops! We couldn’t find your results.";
  }
}

// Button sound logic
const playAgainBtn = document.getElementById("playAgainButton");
const hoverSound = document.getElementById("hoverSound");
const clickSound = document.getElementById("clickSound");

if (playAgainBtn) {
  // Hover sound
  playAgainBtn.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.volume = 0.5;
    hoverSound.play().catch((err) => console.warn("Hover sound error:", err));
  });

  // Click sound with delay before redirect
  playAgainBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clickSound.currentTime = 0;
    clickSound.volume = 0.7;
    clickSound.play().catch((err) => console.warn("Click sound error:", err));

    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = playAgainBtn.href;
    }, 2000);
  });
}
