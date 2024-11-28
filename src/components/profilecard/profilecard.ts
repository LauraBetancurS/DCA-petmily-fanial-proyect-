import { datacommunity } from "../../data/datacommunity";
import { getDocumentIdByUsername, logOut } from "../../utils/firebase";
import { appState, dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export enum Attribute {
  "profilepic" = "profilepic",
  "name" = "name",
  "uid" = "uid",
  "username" = "username",

  
}

class profilecard extends HTMLElement {
  uid?: string;
  profilepic?: string;
  name?: string;
  username?: string;
  
 

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return Object.keys(Attribute) as Array<Attribute>;
  }

  attributeChangedCallback(
    propName: Attribute,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    this[propName] = newValue;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/usermenu/usercard.css" />
                <div class="card-container">
                    <div class="profile-card">
                        <img src="${
                          this.profilepic ||
                          "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
                        }" alt="Profile Picture" class="profile-pic">
                        <h2 class="name">${this.name}</h2>
                        <p class="username">@${this.username}</p>
                       
                    
                    </div>
                    
            `;
    }
  }
}

customElements.define("profile-card", profilecard);
export default profilecard;
