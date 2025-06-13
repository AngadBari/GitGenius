

const AnalyzeButton = document.getElementById("Analyzebtn");
const UserInput = document.getElementById("userInput");

if (AnalyzeButton) {
  AnalyzeButton.addEventListener("click", () => {
    const username = UserInput.value.trim();
    if (username) {
      localStorage.setItem("githubUsername", username);
      window.location.href = "GithProfileCrad.html"; 
    } else {
      alert("Please enter a GitHub username.");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const githubname = document.getElementById("Githubname");
  const loader = document.getElementById("loader");
  const profileCard = document.getElementById("profileCard");

  if (githubname) {
    const username = localStorage.getItem("githubUsername");
    if (!username) {
      alert("No GitHub username found.");
      window.location.href = "index.html";
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        document.getElementById("avatar").src = data.avatar_url;
        document.getElementById("Githubname").textContent =
          data.name || "No Name";
        document.getElementById("username").textContent = `@${data.login}`;
        document.getElementById("bio").textContent =
          data.bio || "No bio provided";
        document.getElementById("followers").textContent = data.followers;
        document.getElementById("repos").textContent = data.public_repos;
        document.getElementById("githubLink").href = `https://github.com/${username}`;


        return fetch(`https://api.github.com/users/${username}/repos`);
      })
      .then((res) => res.json())
      .then((repos) => {
        let totalStars = repos.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        document.getElementById("stars").textContent = totalStars;
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch profile. Please check the username.");
        window.location.href = "index.html";
      })
      .finally(() => {

        setTimeout(() => {
          loader?.classList.add("hidden");
          profileCard?.classList.remove("hidden");
          maincard.classList.remove("hidden")
        
        }, 1000); 
      });
  }
});
