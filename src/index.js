console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded",function() {
  let breedList = [];

  function renderBreeds() {
    let ul = document.querySelector("#dog-breeds");

    breedList.forEach( function(breed) {
      let li = document.createElement("li");
      li.innerText = breed;
      ul.append(li);

      li.addEventListener( "click", function(e) {
        if(e.target.style.color === "red") {
          e.target.style.color = "black";
        } else {
          e.target.style.color = "red";
        }
      });
    });
  }

  function selectBreeds(filter) {
    let ul = document.querySelector("#dog-breeds");

    for( let i=0; i < ul.children.length; i++) {
      let li = ul.children[i];
      let text = li.innerText;
      if (text[0] === filter) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    }
  }


  let dropDown = document.querySelector("#breed-dropdown");


  dropDown.addEventListener("change", function(e) {
    selectBreeds(e.target.value);
  });

  // fetch images
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then( function(res) {
    return res.json();
  }).then( function(data) {
    data.message.forEach( function(elem) {
      let img = document.createElement("img")
      img.src = elem
      let div = document.getElementById("dog-image-container");
      div.append(img);
    });
  });

  // fetch breeds
  fetch('https://dog.ceo/api/breeds/list/all')
  .then( function(res) {
    return res.json();
  }).then( function(data) {
    let message = data.message;
    Object.keys(message).forEach( function(elem) {
      breedList.push(elem);
      message[elem].forEach( function(modifier) {
        breedList.push(`${modifier} ${elem}`);
      });
    });
    renderBreeds();
  });
});
