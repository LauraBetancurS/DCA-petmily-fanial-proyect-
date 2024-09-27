export enum Attribute {
    'icon' = 'icon',
    'img' = 'img',
    'input' = 'input',
    'communityicon' = 'communityicon',
    'profilepic' = 'profilepic',
    
};

class NavBar extends HTMLElement {
    icon?: string;
    img?: string;
    input?: string;
    communityicon?: string;
    profilepic?: string;

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
                console.log("Community icon clicked");
                // Add logic to navigate to community screen if needed
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../public/src/components/navbar/style.css" />
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
