import { getFileUrlProfileImg } from "../../utils/firebase";
import { appState } from "../../store";

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

  async connectedCallback() {
    // Si no se define la imagen de perfil, obtén la URL desde Firebase
    if (!this.profilepic) {
      this.profilepic = await this.fetchProfilePic();
    }
    this.render();
  }

  async fetchProfilePic(): Promise<string> {
    try {
      const profilePicUrl = await getFileUrlProfileImg(appState.user);
      return (
        profilePicUrl ||
        "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
      );
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"; // Imagen por defecto
    }
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/profilecard/profilecard.css" />
                <div class="card-container">
                    <div class="profile-card">
                        <img src="${
                          this.profilepic ||
                          "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
                        }" alt="Profile Picture" class="profile-pic">
                        <h2 class="name">${this.name || "Usuario"}</h2>
                        <p class="username">@${this.username || "Sin nombre"}</p>
                    </div>
            `;
    }
  }
}

customElements.define("profile-card", profilecard);
export default profilecard;
