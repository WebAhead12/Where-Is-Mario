const inputText = document.querySelector("#username");
const githubButton = document.querySelector(".submitButton");
const profileContainer = document.querySelector(".profileContainer");
const infoContainer = document.querySelector(".infoContainer");
const repoClone = document.querySelector(".cloneRepo").cloneNode(true);
document.querySelector(".cloneRepo").remove();

inputText.addEventListener("focusin", () => {
  inputText.value = "";
});

inputText.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    event.preventDefault()
    inputText.blur()
    githubButton.click()
  }
})

githubButton.addEventListener("click", () => {
  infoContainer.innerHTML = "";
  profileContainer.innerHTML = "";
  
  const usernameInput = inputText.value;
  inputText.value = "";
  if (usernameInput == "") {
    profileContainer.innerHTML = "";
    return;
  }
  fetch(`https://api.github.com/users/${usernameInput}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      const profile = document.createElement("h2");
      profile.innerHTML = `<a href=${data.html_url}>${data.login}</a>`;
      profileContainer.appendChild(profile);

      const bio = document.createElement("div");
      bio.className = "bio";
      bio.innerHTML =`<strong>Bio</strong><div><p>${data.bio}</p></div>` ;
      profileContainer.appendChild(bio);

      const image = document.createElement("img");
      image.src = data.avatar_url;
      image.alt = "profile pic";
      image.className = "profileImage";
      profileContainer.appendChild(image);


      const follow = document.createElement("div");
      follow.className="follow";
      profileContainer.appendChild(follow);


      const followers = document.createElement("div");
      followers.textContent = "followers: " + data.following;
      follow.appendChild(followers);

      const followings = document.createElement("div");
      followings.textContent = "followings: " + data.followers;
      follow.appendChild(followings);

      //repositories//
      const repoHeading = document.createElement("h1");
      repoHeading.innerHTML = "Repositories";
      infoContainer.appendChild(repoHeading);

      fetch(data.repos_url)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((dataRepo) => {
          for (let repo of dataRepo) {
            let newRepo = repoClone.cloneNode("true");
            let child = newRepo.children;
            child[0].innerHTML = `<a href=${repo.html_url} target="_blank">${repo.name}</a>`; // hyper link for name of repo
            child[1].innerHTML = "Owner: ".bold() + repo.owner.login;
            child[2].innerHTML = "Description: ".bold() + repo.description;
            child[3].innerHTML = "Updated at: ".bold() + repo.updated_at;
            child[4].innerHTML = "Created at: ".bold() + repo.created_at;
            child[5].innerHTML = `<i class="fa fa-star"> ${repo.stargazers_count}</i>`;
            infoContainer.appendChild(newRepo);
          }
        });
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "404") {
        inputText.value = `⚠️ Couldn't find "${usernameInput}"`;
      } else {
        inputText.value = "⚠️ Something went wrong";
      }
      let tempVal = inputText.value;
      setTimeout(() => {
        if (inputText.value == tempVal) inputText.value = "";
      }, 5000);
    });
});
