export enum Attribute {
    'icon' = 'icon',
    'img' = 'img',
    'input' = 'input',
    'communityicon' = 'communityicon',
    'profilepic' = 'profilepic',
    'createbtntext' = 'createbtntext', // Declaramos el atributo para el botón
};

class NavBar extends HTMLElement {
    icon?: string;
    img?: string;
    input?: string;
    communityicon?: string;
    profilepic?: string;
    createbtntext?: string; // Declaramos la propiedad para el texto del botón

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

        const createButton = this.shadowRoot?.querySelector('.create-button');
        if (createButton) {
            createButton.addEventListener('click', () => {
                window.location.href = '/createpost'; // Ruta de la página de creación de posts
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./navbar.css" />
                <nav class='navbar-container'>
                    <div class='app-icon'>
                        <img src="${this.icon}" alt="App Icon">
                    </div>

                    <div class='search-bar'>
                        <input type="text" placeholder="${this.input || 'Search PetNet'}">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div class='community-icon'>
                        <img src="${this.communityicon}" alt="Community Icon">
                    </div>

                    <button class="create-button">${this.createbtntext || 'Create'}</button>

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
