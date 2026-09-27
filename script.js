
const form = document.getElementById("blogForm");
const blogList = document.getElementById("blogList");
const search = document.getElementById("search");

let blogs = JSON.parse(localStorage.getItem("foodBlogs")) || [
  {
    title: "Delicious Pizza",
    content: "Pizza is a popular Italian dish with cheese, sauce and tasty toppings.",
    image: "https://images.unsplash.com/photo- pizza"
  },
  {
    title: "Tasty Burger",
    content: "A delicious burger with fresh vegetables, cheese and sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    title: "Yummy Pasta",
    content: "Pasta is a delicious Italian dish served with tasty sauce.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600"
  }
];

// Display all blogs
function displayBlogs(items = blogs) {
  blogList.innerHTML = "";

  items.forEach((blog) => {
    const card = document.createElement("div");
    card.className = "blog-card";

    if (blog.image) {
      const img = document.createElement("img");
      img.src = blog.image;
      img.alt = blog.title;
      img.onerror = () => img.remove();
      card.appendChild(img);
    }

    const title = document.createElement("h3");
    title.textContent = blog.title;

    const content = document.createElement("p");
    content.textContent = blog.content;

    const button = document.createElement("button");
    button.textContent = "Delete";

    button.addEventListener("click", () => {
      blogs = blogs.filter(item => item !== blog);
      saveBlogs();
      displayBlogs();
    });

    card.append(title, content, button);
    blogList.appendChild(card);
  });
}

// Save blogs in browser
function saveBlogs() {
  localStorage.setItem("foodBlogs", JSON.stringify(blogs));
}

// Add new blog
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!title || !content) return;

  blogs.unshift({
    title: title,
    content: content,
    image: image
  });

  saveBlogs();
  displayBlogs();
  form.reset();
});

// Search blogs
search.addEventListener("input", function() {
  const keyword = search.value.toLowerCase();

  const filtered = blogs.filter(blog =>
    blog.title.toLowerCase().includes(keyword) ||
    blog.content.toLowerCase().includes(keyword)
  );

  displayBlogs(filtered);
});

displayBlogs();