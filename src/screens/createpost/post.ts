import {addPost, getPost} from '../../utils/firebase'

class CreatePost extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render();
    }

    render(){

    }
}
customElements.define('create-post', CreatePost);