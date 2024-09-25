

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
                <style>
                .navbar-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                background-color: #fff;
                border-bottom: 1px solid #ccc;
            }

            .app-icon img, .community-icon img, .profile-pic img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .search-bar {
                display: flex;
                align-items: center;
                width: 50%;
            }

            .search-bar input {
                width: 100%;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            .search-bar i {
                margin-left: -30px;
                cursor: pointer;
            }

            @media screen and (max-width: 768px) {
                .navbar-container {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .search-bar {
                    width: 100%;
                    margin: 10px 0;
                }
            }

                </style>
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
