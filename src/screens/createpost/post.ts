import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import {addPost, getPost} from '../../utils/firebase'

import styles from './createpost.css'

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

    async submitForm() {
        console.log('Post submitted:', infoPosts);
        addPost(infoPosts); 
        this.render();
    }

    async render() {
        if(this.shadowRoot){
            const style = this.ownerDocument.createElement('style');
			style.innerHTML = style?.innerHTML + styles;
			this.shadowRoot?.appendChild(style);

            const imagePost = this.ownerDocument.createElement('input');
            imagePost.placeholder = 'Imagen';
            imagePost.addEventListener('change', this.changeImage.bind(this));
            

            const descriptionPost = this.ownerDocument.createElement('input');
            descriptionPost.placeholder = 'Añade tu descripción';
            descriptionPost.addEventListener('change', this.changeDesciption.bind(this));

            const savePost = this.ownerDocument.createElement('button');
            savePost.innerText = 'Post';
            savePost.addEventListener('click', this.submitForm.bind(this));

            
            const title = this.ownerDocument.createElement('h2');
            title.textContent = 'Crea tu publicacion';

        }
    }
}
customElements.define('create-post', CreatePost);