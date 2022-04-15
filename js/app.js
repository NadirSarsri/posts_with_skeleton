const template = document.querySelector(".post");
const posts = document.querySelector(".posts");
const modal = document.querySelector(".modal");
modal.style.display = "none";

for (let i = 0; i < 15; i++) {
  const skeleton = document.importNode(template, true);
  posts.appendChild(skeleton);
}

const xhttp = new XMLHttpRequest();
const method = "GET";
const url = "https://jsonplaceholder.typicode.com/posts";

xhttp.open(method, url, true);
xhttp.send();

xhttp.onreadystatechange = function () {
  // reponse disponible avec succes
  if (this.readyState === 4 && this.status === 200) {
    // exploiter la reponse

    // responseText => format json
    const posts = JSON.parse(this.responseText);
    handlePosts(posts);
  }
};

function handlePosts(array) {
  posts.innerHTML = "";
  array.forEach((post, index) => {
    if (index < 10) {
      const newPost = document.importNode(template, true);
      newPost.classList.remove("skeleton");
      const postImgContainer = newPost.querySelector(".post-img");
      const postImg = document.createElement("img");
      postImg.className = "post-img";
      newPost.replaceChild(postImg, postImgContainer);
      const xhttp = new XMLHttpRequest();

      const postTitle = newPost.querySelector(".post-title");
      postTitle.classList.remove("animate");
      const postText = newPost.querySelector(".post-text");
      postTitle.innerHTML = post.title;
      postText.innerHTML = post.body;
      posts.appendChild(newPost);

      xhttp.open("get", "https://picsum.photos/1920/1080", true);

      xhttp.send();

      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          postImg.src = this.responseURL;
          postImg.addEventListener("click", function () {
            modal.style.display = "block";
            modal.querySelector(".modal-img").src = this.src;
            modal.querySelector(".modal-title").innerHTML =
              newPost.querySelector(".post-title").innerHTML;
          });

          // posts.appendChild(newPost);
        }
      };
    }
  });
}

const closeModal = document.querySelector(".modal-close");
modal.addEventListener("click", function (e) {
  if (e.currentTarget === this) {
    modal.style.display = "none";
  }
});
