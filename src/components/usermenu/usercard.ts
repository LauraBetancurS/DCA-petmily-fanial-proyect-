import { data } from '../../data/data';
import { datacommunity } from '../../data/datacommunity';
import { logOut } from '../../utils/firebase';
import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
    'profilepic' = 'profilepic',
    'name' = 'name',
    'username' = 'username',
    'profiledesc' = 'profiledesc',
    'communitydata' = 'communitydata',
}

class UserCard extends HTMLElement {
    profilepic?: string;
    name?: string;
    username?: string;
    profiledesc?: string;
    communitydata?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute) as Array<Attribute>;
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        const logoutButton = this.shadowRoot?.querySelector('.logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                console.log('logout clickeado');
                logOut();
            });
        }

        const myProfileBtn = this.shadowRoot?.querySelector('.btn');
        if (myProfileBtn) {
            myProfileBtn.addEventListener('click', () => {
                console.log('my profile clickeado');
                dispatch(navigate(Screens.PROFILE));
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            const communityItems = datacommunity.map(community => `
                <div class="community-item">
                    <img src="${community.communityimg}" alt="${community.communityname}" class="community-img">
                    <span class="community-name">${community.communityname}</span>
                </div>
            `).join('');

            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/usermenu/usercard.css" />
                <div class="card-container">
                    <div class="profile-card">
                        <img src="${this.profilepic}" alt="Profile Picture" class="profile-pic">
                        <h2 class="name">${this.name}</h2>
                        <p class="username">@${this.username}</p>
                        <p class="description">${this.profiledesc}</p>
                        <button class="btn">Mi perfil</button>
                    </div>
                    <div class="community-card">
                        <h2 class="community-title">Communities</h2>
                        <div class="community-list">
                            ${communityItems}
                        </div>
                    </div>
                    <div class="logout-section">
                        <div class="logout-btn">Cerrar Sesión</div>
                        <div class="petmily-logo">
                            <img src="https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/petmily%20logo.png?alt=media&token=65392fad-3e98-435c-a2ac-d0a4d13ef514" alt="Petmily Logo" class="logo-img">
                            <p class="logo-text">Petmily</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('user-banner', UserCard);
export default UserCard;
