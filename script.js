// Simulate admin role
const ADMIN_USERNAME = 'admin'; // Replace with any admin username

// Handle form submission
document.getElementById('image-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const imageFeed = document.getElementById('image-feed');
  const imageInput = document.getElementById('image-upload');
  const titleInput = document.getElementById('post-title');
  const file = imageInput.files[0];
  const title = titleInput.value.trim();

  // Validate file and title
  if (!file || !title) {
    alert('Please upload an image and add a title.');
    return;
  }

  // Create post container
  const postContainer = document.createElement('div');
  postContainer.className = 'post-container';

  // Add title
  const postTitle = document.createElement('h3');
  postTitle.innerText = title;
  postContainer.appendChild(postTitle);

  // Add image
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    img.alt = title;
    postContainer.appendChild(img);
  };
  reader.readAsDataURL(file);

  // Add delete button for admin
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', function () {
    const username = prompt('Enter admin username:');
    if (username === ADMIN_USERNAME) {
      imageFeed.removeChild(postContainer);
    } else {
      alert('Access denied: You are not the admin.');
    }
  });
  postContainer.appendChild(deleteButton);

  // Add post to feed
  imageFeed.appendChild(postContainer);

  // Clear input fields
  imageInput.value = '';
  titleInput.value = '';
});
// Function to save posts to local storage
function savePostsToLocalStorage(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to load posts from local storage
function loadPostsFromLocalStorage() {
  const savedPosts = localStorage.getItem('posts');
  return savedPosts ? JSON.parse(savedPosts) : [];
}

// Initialize posts
let posts = loadPostsFromLocalStorage();
const imageFeed = document.getElementById('image-feed');

// Function to render posts
function renderPosts() {
  imageFeed.innerHTML = '';
  posts.forEach((post, index) => {
    const postContainer = document.createElement('div');
    postContainer.className = 'post-container';

    // Post Title
    const postTitle = document.createElement('h3');
    postTitle.innerText = post.title;
    postContainer.appendChild(postTitle);

    // Post Image
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    postContainer.appendChild(img);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function () {
      const username = prompt('Enter admin username:');
      if (username === ADMIN_USERNAME) {
        posts.splice(index, 1); // Remove post from array
        savePostsToLocalStorage(posts); // Update local storage
        renderPosts(); // Re-render posts
      } else {
        alert('Access denied: You are not the admin.');
      }
    });
    postContainer.appendChild(deleteButton);

    imageFeed.appendChild(postContainer);
  });
}

// Render posts on page load
renderPosts();

// Handle form submission
document.getElementById('image-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const imageInput = document.getElementById('image-upload');
  const titleInput = document.getElementById('post-title');
  const file = imageInput.files[0];
  const title = titleInput.value.trim();

  if (!file || !title) {
    alert('Please upload an image and add a title.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const newPost = {
      title: title,
      image: e.target.result
    };
    posts.push(newPost);
    savePostsToLocalStorage(posts); // Save to local storage
    renderPosts(); // Re-render posts
  };
  reader.readAsDataURL(file);

  imageInput.value = '';
  titleInput.value = '';
});
