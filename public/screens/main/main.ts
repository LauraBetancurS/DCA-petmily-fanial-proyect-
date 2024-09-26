import * as components from '../../src/components/indexPadre';
import '../../src/components/navbar/navbar';
import '../../src/components/myprofilecard/myprofilecard';
import '../../src/components/communitycard/communitycard'; // Importa el componente de tarjeta de comunidad

import { data } from '../../src/data/data';

class Main extends HTMLElement {
    currentUserPic: string = '';
    currentUserName: string = '';
    currentUserDesc: string = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Seleccionamos el usuario doglover99
        const selectedUser = data.find(user => user.username === 'doglover99');
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
            navBar.setAttribute('createbtntext', 'Create');

            const myProfileCard = this.ownerDocument.createElement('my-profile-card');
            myProfileCard.setAttribute('profileImg', this.currentUserPic);
            myProfileCard.setAttribute('username', 'doglover99');
            myProfileCard.setAttribute('name', this.currentUserName);
            myProfileCard.setAttribute('profileDesc', this.currentUserDesc);

            // Crear un solo componente CommunityCard
            const communityCard = this.ownerDocument.createElement('community-card');

            // Añadir los elementos al shadow DOM
            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(myProfileCard);
            this.shadowRoot.appendChild(communityCard);
        }
    }
}

customElements.define('main-page', Main);
export default Main;
