import { appState, dispatch, addObserver } from "../../store";
import "../../components/navbar/navbar";
import "../../components/banner/banner";

import styles from "./profile.css";

interface User {
  uid: number;
  username: string;
  profileImg: string;
  name: string;
  profileDesc: string;
}

class Profile extends HTMLElement {
  currentUserPic: string = "";
  currentUserName: string = "";
  currentUserDesc: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      const style = this.ownerDocument.createElement("style");
      style.innerHTML = styles;
      this.shadowRoot.appendChild(style);

      const banner = this.ownerDocument.createElement("app-banner");
      banner.className = "banner";
      banner.setAttribute(
        "bannerImage",
        "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/banner%20componenet.png?alt=media&token=19fb1727-6c11-4281-8723-c0100079d0be"
      );
      this.shadowRoot.appendChild(banner);

      const navbarContainer = this.ownerDocument.createElement("div");
      navbarContainer.className = "navbar-container";

      const navBar = this.ownerDocument.createElement("nav-bar");
      navBar.setAttribute("icon", "http://imgfz.com/i/DjpNIAU.png");
      navBar.setAttribute("input", "Search PetNet");
      navBar.setAttribute("communityIcon", "http://imgfz.com/i/rxAefV8.png");
      navBar.setAttribute("profilePic", this.currentUserPic);
      navBar.setAttribute(
        "createicon",
        "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276"
      );
      navBar.setAttribute(
        "searchicon",
        "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029"
      );

      navbarContainer.appendChild(navBar);
      this.shadowRoot.appendChild(navbarContainer);
    }
  }
}
customElements.define("app-profile", Profile);
export default Profile;
