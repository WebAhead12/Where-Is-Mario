const githubButton = document.querySelector(".githubSubmit");
const input = document.querySelector("#username");
const profileContainer = document.querySelector(".profileContainer");
const output = document.querySelector(".output");
const profileImage = document.querySelector(".profileImage");
const repoClone = document.querySelector(".cloneRepo");
let infoContainer = document.querySelector(".infoContainer");

input.addEventListener("focusin", () => {
  input.value = "";
});
githubButton.addEventListener("click", () => {
  profileContainer.innerHTML = "";
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
      const bio = document.createElement("div");
      const image = document.createElement("img");
      const followers = document.createElement("div");
      const followings = document.createElement("div");
      const follow = document.createElement("div");
      followings.textContent = "followings: " + data.followers;
      followers.textContent = "followers: " + data.following;
      image.className = "profileImage";
      bio.className = "bio";
      bio.textContent = "bio: " + data.bio;
      profile.textContent = data.login;
      image.src = data.avatar_url;
      image.alt = "profile pic";
      follow.appendChild(followers);
      follow.appendChild(followings);
      profileContainer.appendChild(image);
      profileContainer.appendChild(profile);
      profileContainer.appendChild(bio);
      profileContainer.appendChild(follow);

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
            child[0].innerHTML = `<a href=${repo.html_url}>${repo.name}</a>`; // hyper link for name of repo
            child[1].innerHTML = repo.owner.login;
            child[2].innerHTML = repo.description;
            child[3].innerHTML = repo.updated_at;
            child[4].innerHTML = repo.created_at;
            child[5].innerHTML = repo.stargazers_count;
            infoContainer.appendChild(newRepo);
            console.log(newRepo);
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
