const $blogsubmitBtn = document.getElementById('blogsubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $blogInput = document.getElementById('blogInput');
const $blogTitle = document.getElementById('blogTitle');
const $profileBlogsListEl = document.getElementById('blogList');
const $deleteBtn = document.getElementById('deleteBtn');
const $editBtn = document.getElementById('editBtn');
const $category = document.getElementById('category');

$blogsubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
 
    if ($blogInput.value.trim() === '') {
      return alert('Please type your blog content');
    }
  
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ content: $blogInput.value, title: $blogTitle.value, category: $category.value }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  console.log(response);
      const data = await response.json();
     
      location.reload();
  
    } catch (error) {
      console.log(error);
    }
  
  
  });



  document.addEventListener("DOMContentLoaded", function () {
    // Get all edit buttons
    const editButtons = document.querySelectorAll(".editBtn");
  
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const blogId = button.classList[0]; // Get the blog ID from the class
  
        // Get the editable content element
        const contentElement = document.getElementById(`content_${blogId}`);
        const content = contentElement.textContent;
  
        // Create an input field for editing
        const inputField = document.createElement("textarea");
        inputField.value = content;
        inputField.classList.add("form-control", "input-lg");
        inputField.style.height = "300px";
        inputField.style.resize = "vertical"; 

        // Add CSS styles to wrap text within the textarea
        inputField.style.maxHeight = "300px";
        inputField.style.width = "100%"; // To take up the full width

        // Replace the content with the input field
        contentElement.innerHTML = "";
        contentElement.appendChild(inputField);
  
        // Create a "Repibliye" (Save) button
        const saveButton = document.createElement("button");
        saveButton.textContent = "Repibliye";
        saveButton.classList.add("saveBtn", "btn-primary", "btn-sm");
        saveButton.addEventListener("click", async function () {
          const editedContent = inputField.value;
          try {
            const response = await fetch(`/api/blogs/${blogId}`, {
              method: 'PUT',
              body: JSON.stringify({ content: editedContent }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // const data = await response.json();
            contentElement.innerHTML = editedContent; // Update content first
            location.reload(); // Then reload the page
          } catch (error) {
            console.log(error);
          } 
          
  
          // Here, you can send the edited content to your backend for updating
  
          // Clean up the input field and save button
          inputField.remove();
          saveButton.remove();
        });
  
        // Add the "repibliye" button below the input field
        contentElement.appendChild(saveButton);
      });
    });
  });

 
    $profileBlogsListEl.addEventListener('click', async (event) => {
      if (event.target.id === 'deleteBtn') {
        event.preventDefault();

        const id = event.target.classList[0];
        try {
          const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
   
          location.reload();
        }
        catch (error) {
          console.log(error);
        }
        return;
      }
      if (event.target.id && event.target.id !== 'blogList') {
        const profileBlogId = event.target.id;
        
        location.href = `/blogs/${profileBlogId}`;
      }

    });



if ($logoutBtn) {
  $logoutBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/authors/logout', {
        method: 'POST',
      });
      const data = await response.json();
      location.href = '/login';
    } catch (error) {
      alert(error);
    }
  });
  }

 
  
      