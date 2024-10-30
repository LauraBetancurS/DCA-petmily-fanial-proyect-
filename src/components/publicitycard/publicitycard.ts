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
            <link rel="stylesheet" href="../src/components/publicitycard/publicitycard.css" />

            <article style="background-image: url('https://firebasestorage.googleapis.com/v0/b/petmily-7b24c.appspot.com/o/Assets%20Dash%2FpublicityCard.jpg?alt=media&token=8b20d49b-4388-43c2-8f0d-b87bdc762543')" class="card-copy">
                <section class="card-info">
                    <h3>${this.cardtitle}</h3>
                    <p>${this.description}</p>
                </section>
                <img src="${this.img}" class="person-pic" />
            </article>
            `
        }

    }
}
customElements.define('publicity-card', PublicityCard);
export default PublicityCard;
