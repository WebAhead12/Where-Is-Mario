const githubButton = document.querySelector(".githubSubmit");
const input = document.querySelector("#username");
const profileContainer = document.querySelector(".profileContainer");
const output = document.querySelector(".output");
const profileImage = document.querySelector(".profileImage");
const repoClone = document.querySelector(".cloneRepo").cloneNode(true);
document.querySelector(".cloneRepo").remove();
let infoContainer = document.querySelector(".infoContainer");

input.addEventListener("focusin", () => {
  input.value = "";
});
githubButton.addEventListener("click", () => {
  infoContainer.innerHTML = "";
  profileContainer.innerHTML = "";
  const repoHeading = document.createElement("h1");
  repoHeading.innerHTML = "Repositories:";
  infoContainer.appendChild(repoHeading);
  const usernameInput = input.value;
  input.value = "";
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
      profile.textContent = data.login;
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
            child[5].innerHTML = `<i class="fas fa-star"> ${repo.stargazers_count}</i>`;
            infoContainer.appendChild(newRepo);
          }
        });
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "404") {
        input.value = `⚠️ Couldn't find "${usernameInput}"`;
      } else {
        input.value = "⚠️ Something went wrong";
      }
      let tempVal = input.value;
      setTimeout(() => {
        if (input.value == tempVal) input.value = "";
      }, 5000);
    });
});
