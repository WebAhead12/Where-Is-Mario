const githubButton = document.querySelector(".githubSubmit");
const input = document.querySelector("#username");
const profileContainer = document.querySelector(".profileContainer");
const output = document.querySelector(".output");

input.addEventListener("click", () => {
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
      bio.textContent = data.bio;
      profile.textContent = data.login;
      const image = document.createElement("img");
      image.className = "profileImage";
      image.src = data.avatar_url;
      image.alt = "profile pic";
      profileContainer.appendChild(image);
      profileContainer.appendChild(profile);
      profileContainer.appendChild(bio);
      fetch(data.followers_url)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((data) => {
          const followers = document.createElement("div");
          followers.textContent = "followers: " + data.length;
          profileContainer.appendChild(followers);
        });
      fetch(data.followings_url)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.json();
        })
        .then((data) => {
          const followings = document.createElement("div");
          followings.textContent = "followings: " + data.length;
          profileContainer.appendChild(followers);
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
