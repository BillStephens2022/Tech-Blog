const saveButton = document.getElementsByClassName('edit-submit-button')[0];


const editPost = async (event) => {
    event.preventDefault();
    post_id = getEditPostId(event);
    const post_title = document.querySelector('#edit-post-title').value.trim();
    const post_content = document.querySelector('#edit-post-content').value.trim();
    console.log('sending edit request for post ID: ' + post_id);
    if (post_id) {
        const response = await fetch(`/api/posts/${post_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            post_title,
            post_content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
      });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
          alert('Failed to Edit Post');
        }
      }
}

saveButton.addEventListener('click', editPost);

// Array.from(editButtons).forEach((editButton) => {
//     editButton.addEventListener('click', editPost);
// });

function getEditPostId (event) {
    event.preventDefault();
    let buttonId = event.target.id;
    const post_id = buttonId.slice(5,);
    return post_id;
}