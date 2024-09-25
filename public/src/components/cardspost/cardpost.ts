enum Attribute {
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

    attributeChangedCallback(oldValue: string | undefined, newValue: string | undefined, propName: Attribute){
        this[propName] = newValue; 
        this.render();

    }

    connectedCallback(){
        this.render()

    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML=`
            <article>
                <section>
                    <div>
                        <img ${this.profileimg || "no image"}>
                    </div>
                    <div>
                        <h4>${this.name || "no name"}</h4>
                        <h5>${this.username || "no user"}</h5>
                        <p>${this.postdesc || "no description"}</p>
                    </div>
                </section>

                <div>
                    <img ${this.imgpost} || "no post">
                </div>
            
            </article>
            
           
            
            `
        }

    }
}
customElements.define('card-post', CardPost);
export default CardPost