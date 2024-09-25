import * as components from '../../src/components/indexPadre';
import '../../src/components/navbar/navbar';

import { data } from '../../src/data/data';
class Main extends HTMLElement {
    user: any[] = [];
    currentUserPic: string = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Seleccionamos el usuario doglover99
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
            <link rel="stylesheet" href="../src/screens/main/main.css">
            `;
            this.shadowRoot.appendChild(navBar);
            this.shadowRoot.appendChild(container);
        }
    }
}

customElements.define('main-page', Main);
export default Main;