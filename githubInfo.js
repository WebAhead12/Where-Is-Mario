const githubButton = document.querySelector(".githubSubmit");
const input = document.querySelector("#username");
const profileContainer = document.querySelector(".profileContainer");
const output = document.querySelector(".output");

githubButton.addEventListener("click", () => {
  profileContainer.innerHTML = "";

  const usernameInput = input.value;
  fetch(`https://api.github.com/users/${usernameInput}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      const profile = document.createElement("h2");
      console.log(data.login);
      profile.textContent = data.login;
      const image = document.createElement("img");
      image.className = "profileImage";
      image.src = data.avatar_url;
      image.alt = "";
      profileContainer.appendChild(image);
      profileContainer.appendChild(profile);
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
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "404") {
        output.textContent = `⚠️ Couldn't find "${input.value}"`;
      } else {
        output.textContent = "⚠️ Something went wrong";
      }
    });
});
