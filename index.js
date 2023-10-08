/**
 Challenge:

 With the 5 blog post objects, display the `title` and `body`
properties of the first 5 posts on the browser page.
 
 Hints: 
 * Create a `div` in the HTML file to store these items
 * Loop over the items creating a string of HTML elements you 
   can then put into the div with `innerHTML`
 */

let postsArray = [];
const titleInput = document.querySelector("#post-title-form");
const bodyInput = document.querySelector("#post-body-form");
const form = document.querySelector(".new-post");

function renderPosts() {
  let html = "";
  postsArray.forEach((post) => {
    html += `<h3 class="post-title">${post.title}</h3>
           <p class="post-body">${post.body}</p>`;
  });
  document.querySelector(".post-container").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const postTitleForm = titleInput.value;
  const postBodyForm = bodyInput.value;
  const data = {
    title: postTitleForm,
    body: postBodyForm,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();
      form.reset();
    });
});

