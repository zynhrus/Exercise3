function loadPage() {
  getData();
}

function getData() {
  fetch("https://swapi.co/api/people/?format=json")
    .then(response)
    .then(data)
    .catch(error);
}

function response(myResponse) {
  return myResponse.json();
}

function data(dataSwapi) {
  const characters = dataSwapi.results;
  // console.log(characters);
  let showAll = "";
  // Loop data from API
  for (const item of characters) {
    let name = item.name;
    let height = item.height;
    let mass = item.mass;
    let birth_year = item.birth_year;
    let url = item.url;

    showAll += `
          <tr>            
            <td data-label="Name"><a class="trigger" data-characters="${url}">${name}</a></td>
            <td data-label="Height">${height}</td>
            <td data-label="Mass">${mass}</td>
            <td data-label="Birth Year">${birth_year}</td>            
          </tr>`;
  }
  let table = document.getElementById("table");
  table.innerHTML = showAll;
  let trigger = document.getElementsByClassName("trigger");
  clickCharacters(trigger);
}

// Get Data for Pop-Up
clickCharacters = trigger => {
  let arrayCharacters = Array.from(trigger);
  for (itemArrayCharacters of arrayCharacters) {
    // console.log(itemArrayCharacters);
    itemArrayCharacters.addEventListener("click", endpointCharacters);
  }
};

endpointCharacters = e => {
  let apiEndpoint = e.target.dataset.characters;
  // console.log(apiEndpoint);
  fetch(apiEndpoint)
    .then(response)
    .then(paintDataCharacters)
    .catch(error);
};

paintDataCharacters = infoCharacters => {
  // console.log(infoCharacters);
  const paintModal = `
      <h2 class="center">${infoCharacters.name}</h2>
      <p class="left"><strong>Eyes Color:</strong> ${
        infoCharacters.eye_color
      }</p>
      <p class="left"><strong>Height:</strong> ${
        infoCharacters.height
      }</p>      
      <p class="left"><strong>Hair Color:</strong> ${
        infoCharacters.hair_color
      }</p>
      <p class="left"><strong>Mass:</strong> ${infoCharacters.mass}</p>
      <p class="left"><strong>Skin Color:</strong> ${
        infoCharacters.skin_color
      }</p>
      <p class="left"><strong>Gender:</strong> ${infoCharacters.gender}</p>`;

  const display = document.getElementById("display");
  display.innerHTML = paintModal;
};

// Pop-Up Click
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//Error
function error() {
  console.log("error");
}

//Load Page
window.onload = loadPage();
