export enum Attribute {
    "name" = "name",
    "username" = "username",
    "profileimg" = "profileimg",
    "postdesc" = "postdesc",
    "imgpost" = "imgpost"

}

class CardPost extends HTMLElement{
    username?: string;
    name?: string;
    profileimg?: string;
    postdesc?: string;
    imgpost?: string;


    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }

    static get observedAttributes(){
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName:Attribute, oldValue: string | undefined, newValue: string | undefined){
        this[propName] = newValue; 
        this.render();        
    }

    connectedCallback(){
        this.render()        
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML=`
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
                    <i class="fa-regular fa-heart" style="color: #2b2b2b;"></i>
                    <i class="fa-regular fa-comment" style="color: #1c1c1c;"></i>
                </div>
            
            </article>
            
           
            
            `
        }

    }
}
customElements.define('card-post', CardPost);
export default CardPost