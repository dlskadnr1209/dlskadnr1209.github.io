document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
    fetchGitHubRepos();
});

function includeHTML() {
    let z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function fetchGitHubRepos() {
    const username = "your-username";
    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById("repo-list");
            data.forEach(repo => {
                const listItem = document.createElement("li");
                listItem.textContent = repo.name;
                repoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching GitHub repositories:', error));
}

