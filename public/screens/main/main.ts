import * as components from '../../src/components/indexPadre';
import '../../src/components/navbar/navbar';
import CardPost, { Attribute } from '../../src/components/cardspost/cardpost';
import  '../../src/components/cardspost/cardpost';

import { data } from '../../src/data/data';
class Main extends HTMLElement {
    user: any[] = [];
    currentUserPic: string = '';
    post: CardPost[]=[];
    

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const selectedUser = data.find(user => user.username === 'doglover99');
        if (selectedUser) {
            this.currentUserPic = selectedUser.profileImg;
        }

        data.forEach(dataUser => {
            const userCard = this.ownerDocument.createElement('user-info');
            userCard.setAttribute('background', dataUser.profileBanner);
            userCard.setAttribute('userpic', dataUser.profileImg);
            userCard.setAttribute('name', dataUser.name);
            userCard.setAttribute('at', dataUser.username);
            this.user.push(userCard);
        });


        data.forEach(post => {
            const cardPost = this.ownerDocument.createElement('card-post') as CardPost;
            cardPost.setAttribute(Attribute.name, post.name);
            cardPost.setAttribute(Attribute.username, post.username);
            cardPost.setAttribute(Attribute.profileimg, post.profileImg);
            cardPost.setAttribute(Attribute.postdesc, post.postDesc);
            cardPost.setAttribute(Attribute.imgpost, post.imgPost)
            this.post.push(cardPost);
       });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        if (this.shadowRoot) {
            
            const navBar = this.ownerDocument.createElement('nav-bar');
            navBar.setAttribute('icon', "http://imgfz.com/i/DjpNIAU.png");
            navBar.setAttribute('input', "Search PetNet");
            navBar.setAttribute('communityIcon', "http://imgfz.com/i/rxAefV8.png");
            navBar.setAttribute('profilePic', this.currentUserPic);

            const container = this.ownerDocument.createElement('section');
            container.className = 'container';

            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../public/src/screens/main/main.css">
            `;
           
            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(container);

           
            this.post.forEach(post =>{
                this.shadowRoot?.appendChild(post)
            })
           
        }
    }
}

customElements.define('main-page', Main);
export default Main;