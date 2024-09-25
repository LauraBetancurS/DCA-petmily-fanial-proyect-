enum Attribute {
    "cardtitle" = "cardtitle",
    "description" = "description",
    "img" = "img"

}

class PublicityCard extends HTMLElement{
    cardtitle?: string;
    description?: string;
    img?: string;



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
            <section>
               
            </section>
            
           
            
            `
        }

    }
}
customElements.define('publicity-card', PublicityCard);
export default PublicityCard;

