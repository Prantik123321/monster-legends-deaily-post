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
