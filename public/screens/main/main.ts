import * as components from '../../src/components/indexPadre';
import '../../src/components/navbar/navbar';
import CardPost, { Attribute } from '../../src/components/cardspost/cardpost';
import  '../../src/components/cardspost/cardpost';
import '../../src/components/publicitycard/publicitycard'

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

            const publicityCard = this.ownerDocument.createElement('publicity-card');
            publicityCard.setAttribute('background', "https://firebasestorage.googleapis.com/v0/b/petmily-7b24c.appspot.com/o/Assets%20Dash%2FpublicityCard.jpg?alt=media&token=8b20d49b-4388-43c2-8f0d-b87bdc762543");
            publicityCard.setAttribute('cardtitle', "The Social Network for Pet Lovers");
            publicityCard.setAttribute('description', "Together we provide the love and care they deserve. Share experiences, learn from other owners, and be part of a group that values animal welfare as much as you do. Make every footprint count!");
            publicityCard.setAttribute('img', "https://firebasestorage.googleapis.com/v0/b/petmily-7b24c.appspot.com/o/Assets%20Dash%2FimgPublicityCard.png?alt=media&token=bba7b6d2-4dd4-4ab7-9d88-2e69638a2a49");

            this.shadowRoot.appendChild(publicityCard)
            
        }
    }
}

customElements.define('main-page', Main);
export default Main;