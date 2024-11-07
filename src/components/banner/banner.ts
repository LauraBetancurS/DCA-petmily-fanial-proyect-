export enum Attribute {
    'bannerImage' = 'bannerImage'
}

class Banner extends HTMLElement {
    bannerImage?: string;

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
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/banner/banner.css">
                <div class="banner-container">
                    <img src="${this.bannerImage || 'https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/banner%20componenet.png?alt=media&token=19fb1727-6c11-4281-8723-c0100079d0be'}" 
                         alt="Banner Image" class="banner-image">
                </div>
            `;
        }
    }
}

customElements.define('app-banner', Banner);
export default Banner;
