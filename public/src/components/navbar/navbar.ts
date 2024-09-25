

export enum Attribute {
    'icon' = 'icon',
    'img' = 'img',
    'input' = 'input',
    'communityIcon' = 'communityIcon',
    'profilePic' = 'profilePic',
};

class NavBar extends HTMLElement {
    icon?: string;
    img?: string;
    input?: string;
    communityIcon?: string;
    profilePic?: string;

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
        const communityIcon = this.shadowRoot?.querySelector('.community-icon');
        if (communityIcon) {
            communityIcon.addEventListener('click', () => {
                console.log("Community icon clicked");
                // Add logic to navigate to community screen if needed
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/navBar/navBar.css">
                <nav class='navbar-container'>
                    <div class='app-icon'>
                        <img src="${this.icon}" alt="App Icon">
                    </div>

                    <div class='search-bar'>
                        <input type="text" placeholder="${this.input || 'Search PetNet'}">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div class='community-icon'>
                        <img src="${this.communityIcon}" alt="Community Icon">
                    </div>

                    <div class='profile-pic'>
                        <img src="${this.profilePic}" alt="Profile Picture">
                    </div>
                </nav>
            `;
        }
    }
}

customElements.define('nav-bar', NavBar);
export default NavBar;
