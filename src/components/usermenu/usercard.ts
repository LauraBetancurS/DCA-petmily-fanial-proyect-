import { datacommunity } from "../../data/datacommunity";
import {
  getDocumentIdByUsername,
  getFileUrlProfileImg,
  logOut,
} from "../../utils/firebase";
import { appState, dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export enum Attribute {
  "profilepic" = "profilepic",
  "name" = "name",
  "uid" = "uid",
  "username" = "username",
  "profiledesc" = "profiledesc",
  "communitydata" = "communitydata",
}

class UserCard extends HTMLElement {
  uid?: string;
  profilepic?: string;
  name?: string;
  username?: string;
  profiledesc?: string;
  communitydata?: string;

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
    } catch {
      return "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"; // Default image
    }
  }

  addEventListeners() {
    const logoutButton = this.shadowRoot?.querySelector(".logout-btn");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        logOut();
        dispatch(navigate(Screens.LOGIN));
      });
    }

    const myProfileBtn = this.shadowRoot?.querySelector(".btn");
    myProfileBtn?.addEventListener("click", async () => {
      if (!this.username) return;

      const profileId = await getDocumentIdByUsername(this.username);

      dispatch(
        navigate(
          appState.screen === Screens.PROFILE && profileId === appState.user
            ? Screens.EDIT
            : Screens.PROFILE,
          { username: this.username }
        )
      );
    });
  }

  async render() {
    if (this.shadowRoot) {
      const isMobileView = window.innerWidth <= 768;

      const communityItems = datacommunity
        .map(
          (community) => `
                <div class="community-item" role="listitem">
                    <img src="${community.communityimg}" alt="${community.communityname}" class="community-img">
                    <span class="community-name">${community.communityname}</span>
                </div>
            `
        )
        .join("");

      const buttonLabel = this.username
        ? (await getDocumentIdByUsername(this.username)) === appState.user
          ? appState.screen === Screens.PROFILE
            ? "Editar Perfil ✏️"
            : appState.screen === Screens.MAIN
            ? "Mi perfil"
            : "Compartir perfil"
          : "Compartir perfil"
        : "Compartir perfil";

      this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/usermenu/usercard.css" />
                <div class="card-container">
                    <header class="petmily-logo">
                        <img src="https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/petmily%20logo.png?alt=media&token=65392fad-3e98-435c-a2ac-d0a4d13ef514" alt="Petmily Logo" class="logo-img">
                        <h1 class="logo-text">Petmily</h1>
                    </header>
                    <section class="profile-card">
                        <img src="${
                          this.profilepic
                        }" alt="Imagen de perfil de ${
        this.name || "Usuario"
      }" class="profile-pic">
                        <h2 class="name">${this.name || "Usuario"}</h2>
                        <p class="username">@${
                          this.username || "Sin nombre"
                        }</p>
                        <button class="btn" aria-label="Acción de perfil">${buttonLabel}</button>
                    </section>
                    ${
                      !isMobileView
                        ? `
                    <section class="community-card" role="region" aria-label="Comunidades">
                        <h2 class="community-title">Communities</h2>
                        <div class="community-list" role="list">
                            ${communityItems}
                        </div>
                    </section>
                    <section class="logout-section">
                        <button class="logout-btn" aria-label="Cerrar sesión">Cerrar Sesión</button>
                    </section>`
                        : ""
                    }
                </div>
            `;

      this.addEventListeners();
    }
  }
}

customElements.define("user-banner", UserCard);
export default UserCard;
