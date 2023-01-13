const createPost = (event) => {
    event.preventDefault();
    console.log('create-post clicked');
    document.location.replace('/dashboard/new-post');
}

document
.querySelector('#create-post-button')
.addEventListener('click', createPost);
