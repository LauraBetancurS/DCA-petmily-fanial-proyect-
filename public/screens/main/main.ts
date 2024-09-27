import * as components from '../../src/components/indexPadre';
import '../../src/components/navbar/navbar';
import '../../src/components/usermenu/usercard';
import CardPost, { Attribute } from '../../src/components/cardspost/cardpost';
import '../../src/components/cardspost/cardpost';
import '../../src/components/publicitycard/publicitycard';
import { data } from '../../src/data/data';

interface User {
    uid: number;
    username: string;
    profileImg: string;
    name: string;
    profileDesc: string;
}

class Main extends HTMLElement {
    currentUserPic: string = '';
    currentUserName: string = '';
    currentUserDesc: string = '';
    user: any[] = [];
    post: CardPost[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const selectedUser: User | undefined = data.find((user: User) => user.username === 'doglover99');
        if (selectedUser) {
            this.currentUserPic = selectedUser.profileImg;
            this.currentUserName = selectedUser.name;
            this.currentUserDesc = selectedUser.profileDesc;
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
            cardPost.setAttribute(Attribute.imgpost, post.imgPost);
            this.post.push(cardPost);
        });
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../public/screens/main/main.css">
            `;

            // Navbar
            const navBar = this.ownerDocument.createElement('nav-bar');
            navBar.setAttribute('icon', "http://imgfz.com/i/DjpNIAU.png");
            navBar.setAttribute('input', "Search PetNet");
            navBar.setAttribute('communityIcon', "http://imgfz.com/i/rxAefV8.png");
            navBar.setAttribute('profilePic', this.currentUserPic);
            navBar.setAttribute('createicon', "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276");
            navBar.setAttribute('searchicon', "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029");

            // Contenedor principal
            const mainContainer = this.ownerDocument.createElement('section');
            mainContainer.className = 'main-container';

            // Contenedor lateral izquierdo (UserCard)
            const leftSidebar = this.ownerDocument.createElement('div');
            leftSidebar.className = 'left-sidebar';

            // Contenedor del contenido principal (Posts y Publicidad)
            const contentContainer = this.ownerDocument.createElement('div');
            contentContainer.className = 'content-container';
            const rightSidebar = this.ownerDocument.createElement('div');
            rightSidebar.className = 'right-sidebar';

            // User Card - Se coloca en el sidebar izquierdo
            const userCard = this.ownerDocument.createElement('user-banner');
            userCard.setAttribute('profilepic', this.currentUserPic);
            userCard.setAttribute('name', this.currentUserName);
            userCard.setAttribute('username', 'doglover99');
            userCard.setAttribute('profiledesc', this.currentUserDesc);
            
          
            // Añadir user-card al sidebar izquierdo
          
            // Añadir los posts al contenedor del contenido principal
            this.post.forEach(post => {
                contentContainer.appendChild(post);
            });

            // Publicity Card - Se añade al contenedor del contenido principal
            const publicityCard = this.ownerDocument.createElement('publicity-card');
            publicityCard.setAttribute('cardtitle', "The Social Network for Pet Lovers");
            publicityCard.setAttribute('description', "Together we provide the love and care they deserve. Share experiences, learn from other owners, and be part of a group that values animal welfare as much as you do. Make every footprint count!");
            publicityCard.setAttribute('img', "https://firebasestorage.googleapis.com/v0/b/petmily-7b24c.appspot.com/o/Assets%20Dash%2FimgPublicityCard.png?alt=media&token=bba7b6d2-4dd4-4ab7-9d88-2e69638a2a49");

            rightSidebar.appendChild(publicityCard);
            leftSidebar.appendChild(userCard);

            // Añadir navbar, sidebar izquierdo y contenedor principal al shadowRoot
            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(mainContainer);
            mainContainer.appendChild(leftSidebar);
            mainContainer.appendChild(contentContainer);
            mainContainer.appendChild(rightSidebar);
        }
    }
}

customElements.define('main-page', Main);
export default Main;
