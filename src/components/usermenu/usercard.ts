import { datacommunity } from '../../data/datacommunity';
import { getDocumentIdByUsername, getFileUrlProfileImg, logOut } from '../../utils/firebase';
import { appState, dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

export enum Attribute {
    'profilepic' = 'profilepic',
    'name' = 'name',
    'uid' = 'uid',
    'username' = 'username',
    'profiledesc' = 'profiledesc',
    'communitydata' = 'communitydata',
}

class UserCard extends HTMLElement {
    uid?: string;
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

    async connectedCallback() {
        // Cargar la URL actualizada de la imagen si no está ya definida
        if (!this.profilepic) {
            this.profilepic = await this.fetchProfilePic();
        }
        this.render();
    }

    async fetchProfilePic(): Promise<string> {
        try {
            const profilePicUrl = await getFileUrlProfileImg(appState.user);
            return profilePicUrl || "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg";
        } catch (error) {
            console.error("Error fetching profile picture:", error);
            return "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"; // Default image
        }
    }

    addEventListeners() {
        const logoutButton = this.shadowRoot?.querySelector('.logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
                console.log('logout clickeado');
                logOut();
                dispatch(navigate(Screens.LOGIN))
            });
        }

        const myProfileBtn = this.shadowRoot?.querySelector('.btn');

        myProfileBtn?.addEventListener('click', async () => {
            if (!this.username) {
                return
            }

            const profileId = await getDocumentIdByUsername(this.username);

            dispatch(navigate(
                appState.screen === Screens.PROFILE && profileId === appState.user ?
                    Screens.EDIT : Screens.PROFILE,
                { username: this.username }))
        });
    }

    async render() {
        if (this.shadowRoot) {
            const communityItems = datacommunity.map(community => `
                <div class="community-item">
                    <img src="${community.communityimg}" alt="${community.communityname}" class="community-img">
                    <span class="community-name">${community.communityname}</span>
                </div>
            `).join('');

            const buttonLabel = this.username
                ? (await getDocumentIdByUsername(this.username)) === appState.user
                    ? appState.screen === Screens.PROFILE
                        ? 'Editar Perfil ✏️'
                        : appState.screen === Screens.MAIN
                            ? 'Mi perfil'
                            : 'Compartir perfil'
                    : 'Compartir perfil'
                : 'Compartir perfil';

            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/usermenu/usercard.css" />
                <div class="card-container">
                    <div class="profile-card">
                        <img src="${this.profilepic}" alt="Profile Picture" class="profile-pic">
                        <h2 class="name">${this.name || "Usuario"}</h2>
                        <p class="username">@${this.username || "Sin nombre"}</p>
                       
                        <button class="btn">${buttonLabel}</button>
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

            this.addEventListeners();
        }
    }
}

customElements.define('user-banner', UserCard);
export default UserCard;
