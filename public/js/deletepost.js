const deleteButtons = document.getElementsByClassName('delete-button');

const deletePost = async (event) => {
    let post_id = getPostId(event);
    // const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    if (post_id) {
      console.log("Post ID to be deleted: " + post_id);
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
    });
      if (response.ok) {
          document.location.reload();
      } else {
        alert('Failed to Delete Post');
      }
    }
}
let i = 0;

Array.from(deleteButtons).forEach((deleteButton) => {
    deleteButton.addEventListener('click', deletePost);
});

function getPostId (event) {
    event.preventDefault();
    console.log(`sending delete request! for ${event.target.id}`);
    let buttonId = event.target.id;
    const post_id = buttonId.slice(7,);
    console.log(post_id);
    console.log(typeof(post_id));
    return post_id;
}
