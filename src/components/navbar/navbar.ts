import { dispatch, appState } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { getFileUrlProfileImg } from '../../utils/firebase'; // Importamos la función para obtener la imagen de perfil

export enum Attribute {
    'icon' = 'icon',
    'img' = 'img',
    'input' = 'input',
    'communityicon' = 'communityicon',
    'profilepic' = 'profilepic',
    'createicon' = 'createicon', 
    'searchicon' = 'searchicon', 
};

class NavBar extends HTMLElement {
    icon?: string;
    img?: string;
    input?: string;
    communityicon?: string;
    profilepic?: string;
    createicon?: string;
    searchicon?: string; 

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
        // Obtener la imagen de perfil del usuario logueado
        this.profilepic = await this.fetchProfilePic();
        this.render();
        this.addEventListeners();
    }

    async fetchProfilePic(): Promise<string> {
        try {
            // Intentar obtener la imagen de perfil del usuario logueado
            const profilePicUrl = await getFileUrlProfileImg(appState.user);
            return profilePicUrl || "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"; // Imagen por defecto
        } catch (error) {
            console.error("Error fetching profile picture:", error);
            return "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"; // Imagen por defecto
        }
    }

    addEventListeners() {
        const appIcon = this.shadowRoot?.querySelector('.app-icon');
        if (appIcon) {
            appIcon.addEventListener('click', () => {
                dispatch(navigate(Screens.MAIN)); // Navega a la pantalla principal 'main'
            });
        }

        const communityicon = this.shadowRoot?.querySelector('.community-icon');
        if (communityicon) {
            communityicon.addEventListener('click', () => {
                window.location.href = '/community'; // Ruta de la página de comunidad
            });
        }

        const createIcon = this.shadowRoot?.querySelector('.create-icon');
        if (createIcon) {
            createIcon.addEventListener('click', () => {
                dispatch(navigate(Screens.CREATEPOST)); // Navega a la pantalla de creación de posts
            });
        }

        const profileImgUser = this.shadowRoot?.querySelector('.profile-pic img'); // Selector ajustado para el elemento <img>
        if (profileImgUser) {
            profileImgUser.addEventListener('click', async () => {
                console.log('Navegando al perfil del usuario logueado');

                // Obtener el username del usuario logueado desde el estado
                const userId = appState.user;

                if (userId) {
                    dispatch(navigate(Screens.PROFILE, { username: userId })); // Pasa el username como parámetro
                } else {
                    console.error('No se pudo obtener el ID del usuario logueado.');
                }
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
              <link rel="stylesheet" href="../src/components/navbar/style.css" />
                <nav class='navbar-container'>
                    <div class='app-icon'>
                        <img src="${this.icon}" alt="App Icon">
                    </div>

                    <div class='search-bar'>
                        <input type="text" placeholder="${this.input || 'Busca en PetNet'}">
                        <img class="search-icon" src="${this.searchicon}" alt="Search Icon"> <!-- Icono de lupa -->
                    </div>

                    <div class='community-icon'>
                        <img src="${this.communityicon}" alt="Community Icon">
                    </div>

                    <div class='create-icon'>
                        <img src="${this.createicon}" alt="Create Icon">
                    </div>

                    <div class='profile-pic'>
                        <img src="${this.profilepic}" alt="Profile Picture">
                    </div>
                </nav>
            `;
        }
    }
}

customElements.define('nav-bar', NavBar);
export default NavBar;
