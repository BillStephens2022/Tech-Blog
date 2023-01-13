const editPost = async (event) => {
    event.preventDefault();
    console.log('sending edit request!');
}



document
.querySelector('#edit-button')
.addEventListener('click', editPost);