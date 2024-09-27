enum Attribute {
    "cardtitle" = "cardtitle",
    "description" = "description",
    "img" = "img",
    "background" = "background"

}

class PublicityCard extends HTMLElement{
    cardtitle?: string;
    description?: string;
    img?: string;
    background?: string;



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
             <link rel="stylesheet" href="../public/src/components/publicitycard/publicitycard.css" />

            <article class="card-copy">
           
                <section class="card-info">
                    <h3>${this.cardtitle}</h3>
                    <p>${this.description}</p>
                </section>
                <img src="${this.img}" class="person-pic" />
                <img src="${this.background}" class="bg-pattern"  />
            </article>
            `
        }

    }
}
customElements.define('publicity-card', PublicityCard);
export default PublicityCard;
