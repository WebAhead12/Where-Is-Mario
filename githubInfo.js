const githubButton = document.querySelector(".githubSubmit");
const input = document.querySelector("#username");
const profileContainer = document.querySelector(".profileContainer");
const output = document.querySelector(".output");

const profileImage = document.querySelector(".profileImage");

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
      bio.textContent = "bio: " + data.bio;
      profile.textContent = data.login;
      image.className = "profileImage";
      image.src = data.avatar_url;
      image.alt = "profile pic";
      const followers = document.createElement("div");
      const followings = document.createElement("div");
      followings.textContent = "followings: " + data.followers;
      followers.textContent = "followers: " + data.following;
      profileContainer.appendChild(image);
      profileContainer.appendChild(profile);
      profileContainer.appendChild(bio);
      profileContainer.appendChild(followings);
      profileContainer.appendChild(followers);
      //repositories//
      fetch(data.repos_url)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((dataRepo) => {
          console.log(dataRepo);
          for (let repo of dataRepo) {
            const followers = document.createElement("div");
            console.log(repo);
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

// repos
//name of repo, the name of the owner and pic, desc, link, created at , update at
