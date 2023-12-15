const $authorname = document.getElementById('authorname');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $submitBtn = document.getElementById('submitBtn');
const $loginBtn = document.getElementById('loginBtn');
const $comment = document.getElementById('comment');
const $commentSubmitBtn = document.getElementById('commentSubmitBtn');
const $selectedBlogId = document.getElementById('selectedBlogId');

let filePath = '';
let isLiked = false;



function setSelectedBlogId(blogId) {
  $selectedBlogId.value = blogId;
}

// Function to submit a comment
function submitComment() {
  const comment = $comment.value;
  const blogId = $selectedBlogId.value;


  // Clear the comment input field
  $comment.value = '';
}




if($loginBtn) {
    $loginBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const authorname = $authorname.value;
        const password = $password.value;

        if(!authorname ||!password) {return alert('Please enter authorname and password');}
    
    try{
        const response = await fetch('/api/authors/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({authorname, password})});
        const data = await response.json();
       
        if(response.ok) {
            location.href =`/authors/${data.id}`;
        } 
        else {
            alert ('Pa fe mwen sa. infomasyon ou antre ya pa valid. Tanpri antre non itilizatè kòrèk ak modpas kòrèk.');
        }
 }
 catch(err) {
     alert(err.message);
 }
});
}


if($submitBtn) {
    $submitBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const authorname = $authorname.value;
        const email = $email.value;
        const password = $password.value;
        
        if(!authorname ||!password || !email) {return alert('Please enter authorname and password');}
    
    try{
        const response = await fetch('/api/authors/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({authorname, password, email}),
        });
        const data = await response.json();

            location.href =`/authors/${data.id}`;
        
 } catch(err) {
    alert(err.message);}
});
}

if($loginBtn) {
async function dislike(event) {
    try {
      console.log('dislike');
      const blogId = event.classList[0];
      let likes = event.classList[1];
      let isLiked = false;
      likes--;
      const dislikeData = await fetch(`/api/like/dislike/${blogId}`, {
        method: 'POST',
        body: JSON.stringify({ likes, isLiked }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await dislikeData.json();
      console.log(data);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  
  async function like(event) {
    try {
      const blogId = event.classList[0];
      let likes = event.classList[1];
      const authorId = event.classList[2];
      console.log(userId);
      let isLiked = true;
      const getLikes = await fetch(`/api/like/get/${blogId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await getLikes.json();
      console.log(data);
      if (data.message) {
        alert(data.message);
      }
      if (data.length > 0) {
        console.log(data[0].authorLikedId);
        console.log(authorId);
        if (data[0].authorLikedId == authorId) {
          dislike(event);
          return;
        }
      }
      likes++;
      const likePost = await fetch(`/api/like/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({ likes, isLiked }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data2 = await likePost.json();
      console.log(data2);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}
  

  

  
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
  
