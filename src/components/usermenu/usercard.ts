import { data } from '../../data/data';
import { datacommunity } from '../../data/datacommunity';
import { logOut } from '../../utils/firebase';


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
                logOut()
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
                        <button class="btn">My Profile</button>
                    </div>
                    <div class="community-card">
                        <h2 class="community-title">Communities</h2>
                        <div class="community-list">
                            ${communityItems}
                        </div>
                    </div>
                    <div class="logout-btn">Log out</div>
                </div>
            `;
        }
    }
}

customElements.define('user-banner', UserCard);
export default UserCard;