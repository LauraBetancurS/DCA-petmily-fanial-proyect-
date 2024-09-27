import * as components from '../../src/components/indexPadre';
import '../../src/components/navbar/navbar';
import '../../src/components/usermenu/usercard';
import CardPost, { Attribute } from '../../src/components/cardspost/cardpost';
import  '../../src/components/cardspost/cardpost';
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

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const selectedUser: User | undefined = data.find((user: User) => user.username === 'doglover99');
        if (selectedUser) {
            this.currentUserPic = selectedUser.profileImg;
            this.currentUserName = selectedUser.name;
            this.currentUserDesc = selectedUser.profileDesc;
        }
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';

            const navBar = this.ownerDocument.createElement('nav-bar');
            navBar.setAttribute('icon', "http://imgfz.com/i/DjpNIAU.png");
            navBar.setAttribute('input', "Search PetNet");
            navBar.setAttribute('communityIcon', "http://imgfz.com/i/rxAefV8.png");
            navBar.setAttribute('profilePic', this.currentUserPic);
            navBar.setAttribute('createicon', "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276");
            navBar.setAttribute('searchicon', "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029");

            const userCard = this.ownerDocument.createElement('user-card');
            userCard.setAttribute('profilepic', this.currentUserPic);
            userCard.setAttribute('name', this.currentUserName);
            userCard.setAttribute('username', 'doglover99');
            userCard.setAttribute('profiledesc', this.currentUserDesc);

            const container = this.ownerDocument.createElement('div');
            container.classList.add('main-container');

            container.appendChild(userCard);

            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(container);
        }
    }
}

customElements.define('main-page', Main);
export default Main;
