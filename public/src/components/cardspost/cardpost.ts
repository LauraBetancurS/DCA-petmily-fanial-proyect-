export enum Attribute {
    "name" = "name",
    "username" = "username",
    "profileimg" = "profileimg",
    "postdesc" = "postdesc",
    "imgpost" = "imgpost"

}

class CardPost extends HTMLElement {
    username?: string;
    name?: string;
    profileimg?: string;
    postdesc?: string;
    imgpost?: string;


    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render()
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../public/src/components/cardspost/cardpost.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

            <article class='cardpost-container'>
                <section class='post-container'>
                    <div class='profile-icon'>
                        <img src="${this.profileimg || "no image"}">
                    </div>
                    <div class='info-post'>
                        <h4>${this.name || "no name"}</h4>
                        <h5>@${this.username || "no user"}</h5>
                        <p>${this.postdesc || "no description"}</p>
                    </div>
                </section>

                <div class='image-post'>
                    <img src="${this.imgpost || "no post"}" />
                </div>
                 <div class='icon-container'>
                   <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                   <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" /></svg>
                </div>
            
            </article>
            
           
            
            `
        }

    }
}
customElements.define('card-post', CardPost);
export default CardPost