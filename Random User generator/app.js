const infoButtons = document.querySelectorAll(".info-btn");
const btnUser = getElement(".btn");
const display = getElement(".display");
const URL = "https://randomuser.me/api/";
/* name and img */
const displayUsername = getElement(".user-name");
const displayImg = getElement(".user-img");
/* info btns */
const emailBtn = getElement(".email-info");
const phoneBtn = getElement(".phone-info");
const ageBtn = getElement(".age-info");
const countryBtn = getElement(".country-info");
const usernameBtn = getElement(".username-info");
const passwordBtn = getElement(".password-info");
let lastActiveButtonType = "";

/* getElement */
function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(`Please check "${selection}", no such element exist`);
}

/* ainult üks highlightitud nupp - mis siin täpselt toimub??? */
for (let i = 0; i < infoButtons.length; i++) {
  infoButtons[i].addEventListener("click", function () {
    document.querySelector(".active")
      ? document.querySelector(".active").classList.remove("active")
      : "";
    this.classList.add("active");
    lastActiveButtonType = this.dataset.type;
  });
}

/* RANDOM USER GENERATOR API*/
window.addEventListener("DOMContentLoaded", () => {
  emailBtn.classList.add("active");
  display.innerHTML = "Click The Button";
  /* fetch data  */
  btnUser.addEventListener("click", async (e) => {
    try {
      const url = await fetch(URL);
      const data = await url.json();
      const response = data.results[0];
      /* properties */
      const age = response.dob.age;
      const country = response.location.country;
      const username = response.login.username;
      const password = response.login.password;
      const img = response.picture.large;
      const {
        email,
        phone,
        name: { first, last },
      } = response;
      const fullName = first + " " + last;
      console.log(response);

      /* display data */
      emailBtn.addEventListener("click", () => {
        display.innerHTML = `Email: ${email}`;
      });
      phoneBtn.addEventListener("click", () => {
        display.innerHTML = `Phone: ${phone}`;
      });
      ageBtn.addEventListener("click", () => {
        display.innerHTML = `Age: ${age}`;
      });
      countryBtn.addEventListener("click", () => {
        display.innerHTML = `Country: ${country}`;
      });
      usernameBtn.addEventListener("click", () => {
        display.innerHTML = `Username: ${username}`;
      });
      passwordBtn.addEventListener("click", () => {
        display.innerHTML = `Password: ${password}`;
      });
      /* display name, image and email on "random user" btn click */
      displayUsername.innerHTML = `${fullName}`;
      displayImg.src = img;

      display.innerHTML = `${lastActiveButtonType}: ${email}`;

      /* remove other active classes and add it to email class on "random user" btn click */
      infoButtons.forEach((btn) => {
        btn.classList.remove("active");
        const lastActiveButton = document.querySelector(
          `[data-type="${lastActiveButtonType}"]`
        );
        lastActiveButton.classList.add("active");
      });
      /* catch */
    } catch (error) {
      display.innerHTML = "There's an error";
    }
  });
});
