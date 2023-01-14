const editButtons = document.getElementsByClassName('edit-button');

const editPost = async (event) => {
    event.preventDefault();
    console.log('sending edit request!');
}



Array.from(editButtons).forEach((editButton) => {
    editButton.addEventListener('click', editPost);
});