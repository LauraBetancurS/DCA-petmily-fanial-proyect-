export enum Attribute {
    'icon' = 'icon',
    'img' = 'img',
    'input' = 'input',
    'communityicon' = 'communityicon',
    'profilepic' = 'profilepic',
    'createicon' = 'createicon', 
    'searchicon' = 'searchicon', // Añadimos el atributo para el ícono de lupa
};

class NavBar extends HTMLElement {
    icon?: string;
    img?: string;
    input?: string;
    communityicon?: string;
    profilepic?: string;
    createicon?: string;
    searchicon?: string; // Añadimos la propiedad para el ícono de lupa

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
        const communityicon = this.shadowRoot?.querySelector('.community-icon');
        if (communityicon) {
            communityicon.addEventListener('click', () => {
                window.location.href = '/community'; // Ruta de la página de comunidad
            });
        }

        const createIcon = this.shadowRoot?.querySelector('.create-icon');
        if (createIcon) {
            createIcon.addEventListener('click', () => {
                window.location.href = '/createpost'; // Ruta de la página de creación de posts
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
                        <input type="text" placeholder="${this.input || 'Search PetNet'}">
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
