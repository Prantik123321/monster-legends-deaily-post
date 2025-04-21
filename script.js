document.getElementById('image-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const imageFeed = document.getElementById('image-feed');
  const imageInput = document.getElementById('image-upload');
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      imageFeed.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
  imageInput.value = ''; // Clear the input
});
