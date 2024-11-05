import {addPost, getPost} from '../../utils/firebase'

const infoPosts= {
    image: '',
    description: ''
}

class CreatePost extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
    }

    changeImage(e: any) {
        infoPosts.image = e.target.value;
    }

    changeDesciption(e: any) {
        infoPosts.description = e.target.value;
    }

    submitForm() {
        console.log('Post submitted:', infoPosts);
        addPost(infoPosts); 
        this.render();
    }

    render(){

    }
}
customElements.define('create-post', CreatePost);