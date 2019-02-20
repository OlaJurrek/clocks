// Variables

// Hands
const hands = document.querySelectorAll(".hand");
const hourHands = document.querySelectorAll(".hours");
const minuteHands = document.querySelectorAll(".minutes");
const secondHands = document.querySelectorAll(".seconds");

// Digital Time Boxes
const localDigitalTime = document.querySelector(".local-clock .digital-time");
const citiesDigitalTime = document.querySelectorAll(
  ".cities-clocks .digital-time"
);

// Offsets in minutes - NY: -5 h, London: 0 h, Moscow: 3 h, Tokyo: 9 hours from UTC
const citiesOffsets = [-300, 0, 180, 540];

// Set Local Time
function setLocalTime() {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const hoursDegree = (hours / 12) * 360 + 90;
  const minutesDegree = (minutes / 60) * 360 + 90;
  const secondsDegree = (seconds / 60) * 360 + 90;

  // Prevent hands from going backwards in the second between 444 and 0 degrees
  if (secondsDegree == 444) {
    hands.forEach(function(hand) {
      hand.style.transition = "none";
    });
  }

  // Move each second hand
  secondHands.forEach(function(secondHand) {
    secondHand.style.transform = `rotate(${secondsDegree}deg)`;
  });

  // Move each minute hand
  minuteHands.forEach(function(minuteHand) {
    minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
  });

  // Move only local hour hand
  hourHands[0].style.transform = `rotate(${hoursDegree}deg)`;

  //Print local time below the clock face in format '00 : 00 : 00'
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  localDigitalTime.innerHTML = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
}

setInterval(setLocalTime, 1000);

setInterval(setCitiesTime, 1000);

// Set time for 4 other cities

function setCitiesTime() {
  const d = new Date();
  const UTCoffset = d.getTimezoneOffset();

  d.setMinutes(d.getMinutes() + UTCoffset);

  setCityTime(d);
}

function setCityTime(d) {
  for (let i = 0; i < citiesOffsets.length; i++) {
    // Convert UTC to timezone
    d.setMinutes(d.getMinutes() + citiesOffsets[i]);

    // Print local time below the clock face in format '00 : 00 : 00'
    const formattedHours = d
      .getHours()
      .toString()
      .padStart(2, "0");

    const formattedMinutes = d
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const formattedSeconds = d
      .getSeconds()
      .toString()
      .padStart(2, "0");

    citiesDigitalTime[
      i
    ].innerHTML = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;

    // Move hour hand according to timezone
    const hoursDegree = (d.getHours() / 12) * 360 + 90;
    hourHands[i + 1].style.transform = `rotate(${hoursDegree}deg)`;

    // Reset offset to UTC
    d.setMinutes(d.getMinutes() - citiesOffsets[i]);
  }
}
