const $comment = document.getElementById('comment');
const $commentSubmitBtn = document.getElementById('commentSubmitBtn');
const $selectedBlogId = document.getElementById('selectedBlogId');





$commentSubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
  
    if ($comment.value.trim() === '') {
      return alert('Please type your comment');
    }
  
    try {
      // Get the selected blog ID from the hidden input field
      const selectedBlogId = document.getElementById('selectedBlogId').value;

  
      // Send the comment to the server using fetch
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          content: $comment.value,
          blogId: selectedBlogId, // Pass the selected blog ID
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      location.reload();
  
    } catch (error) {
      console.log(error);
    }
  });
  

