const deletePost = async (event) => {
    event.preventDefault();
    console.log('sending delete request!');
}



document
.querySelector('#delete-button')
.addEventListener('click', deletePost);