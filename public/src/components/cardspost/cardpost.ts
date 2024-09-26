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
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0002 24.5L12.3085 22.9833C10.3446 21.2139 8.721 19.6875 7.43766 18.4042C6.15433 17.1208 5.1335 15.9736 4.37516 14.9625C3.61683 13.9319 3.08211 12.9889 2.771 12.1333C2.47933 11.2778 2.3335 10.4028 2.3335 9.50833C2.3335 7.68055 2.946 6.15416 4.171 4.92916C5.396 3.70416 6.92239 3.09166 8.75016 3.09166C9.76127 3.09166 10.7238 3.30555 11.6377 3.73333C12.5516 4.1611 13.3391 4.76388 14.0002 5.54166C14.6613 4.76388 15.4488 4.1611 16.3627 3.73333C17.2766 3.30555 18.2391 3.09166 19.2502 3.09166C21.0779 3.09166 22.6043 3.70416 23.8293 4.92916C25.0543 6.15416 25.6668 7.68055 25.6668 9.50833C25.6668 10.4028 25.5113 11.2778 25.2002 12.1333C24.9085 12.9889 24.3835 13.9319 23.6252 14.9625C22.8668 15.9736 21.846 17.1208 20.5627 18.4042C19.2793 19.6875 17.6557 21.2139 15.6918 22.9833L14.0002 24.5ZM14.0002 21.35C15.8668 19.6778 17.4029 18.2486 18.6085 17.0625C19.8141 15.8569 20.7668 14.8167 21.4668 13.9417C22.1668 13.0472 22.6529 12.2597 22.9252 11.5792C23.1974 10.8792 23.3335 10.1889 23.3335 9.50833C23.3335 8.34166 22.9446 7.36944 22.1668 6.59166C21.3891 5.81388 20.4168 5.42499 19.2502 5.42499C18.3363 5.42499 17.4904 5.68749 16.7127 6.21249C15.9349 6.71805 15.4002 7.36944 15.1085 8.16666H12.8918C12.6002 7.36944 12.0654 6.71805 11.2877 6.21249C10.5099 5.68749 9.66405 5.42499 8.75016 5.42499C7.5835 5.42499 6.61127 5.81388 5.8335 6.59166C5.05572 7.36944 4.66683 8.34166 4.66683 9.50833C4.66683 10.1889 4.80294 10.8792 5.07516 11.5792C5.34739 12.2597 5.8335 13.0472 6.5335 13.9417C7.2335 14.8167 8.18627 15.8569 9.39183 17.0625C10.5974 18.2486 12.1335 19.6778 14.0002 21.35Z" fill="#10172A"/>
                    </svg>

                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 22C13.5767 22 15.6068 21.3842 17.3335 20.2304C19.0602 19.0767 20.406 17.4368 21.2007 15.5182C21.9955 13.5996 22.2034 11.4884 21.7982 9.45156C21.3931 7.41476 20.3931 5.54383 18.9246 4.07538C17.4562 2.60693 15.5852 1.6069 13.5484 1.20176C11.5116 0.796615 9.40045 1.00455 7.48182 1.79927C5.5632 2.59399 3.92332 3.9398 2.76957 5.66652C1.61581 7.39323 1 9.4233 1 11.5C1 13.236 1.42 14.8728 2.16667 16.3148L1 22L6.68517 20.8333C8.12717 21.58 9.76516 22 11.5 22Z" stroke="#10172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                </div>
            
            </article>
            
           
            
            `
        }

    }
}
customElements.define('card-post', CardPost);
export default CardPost