import { appState, dispatch, addObserver } from "../../store";
import { getPost, getUser } from "../../utils/firebase";
import "../../components/navbar/navbar";
import "../../components/banner/banner";
import "../../components/publicitycard/publicitycard";
import "../../components/user/user";

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

  async render() {
    if (this.shadowRoot) {
      const style = this.ownerDocument.createElement("style");
      style.innerHTML = styles;
      this.shadowRoot.appendChild(style);

      const mainContainer = this.ownerDocument.createElement("section");
      mainContainer.className = "main-container";

      const contentContainer = this.ownerDocument.createElement("div");
      contentContainer.className = "content-container";

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

      // const userData = appState.user.find((user: User) => user.uid === appState.currentUser.uid);

      const leftSidebar = this.ownerDocument.createElement("div");
      leftSidebar.className = "left-sidebar";

      const userData = await getUser();
      const userCard = this.ownerDocument.createElement("user-profile");
      userCard.setAttribute("profilepic", this.currentUserPic);
      userCard.setAttribute("name", userData.name);
      userCard.setAttribute("username", userData.username);
      userCard.setAttribute("profiledesc", this.currentUserDesc);

      leftSidebar.appendChild(userCard);
      this.shadowRoot.appendChild(leftSidebar);

      const rightSidebar = this.ownerDocument.createElement("div");
      rightSidebar.className = "right-sidebar";

      const publicityCard = this.ownerDocument.createElement("publicity-card");
      publicityCard.setAttribute(
        "cardtitle",
        "Únase a una de nuestras comunidades"
      );
      publicityCard.setAttribute(
        "description",
        "Juntos brindamos el amor y el cuidado que merecen. Comparte experiencias, aprende de otros propietarios y sé parte de un grupo que valora el bienestar animal tanto como tú. ¡Haz que cada huella cuente!"
      );
      publicityCard.setAttribute(
        "img",
        "https://firebasestorage.googleapis.com/v0/b/petmily-7b24c.appspot.com/o/Assets%20Dash%2Ffoto1%201.png?alt=media&token=2db66df2-6b62-4c65-bcdf-c82b4acad636"
      );

      navbarContainer.appendChild(navBar);
      this.shadowRoot.appendChild(navbarContainer);
      this.shadowRoot.appendChild(mainContainer);
      rightSidebar.appendChild(publicityCard);
      mainContainer.appendChild(leftSidebar);
      mainContainer.appendChild(contentContainer);
      mainContainer.appendChild(rightSidebar);
    }
  }
}
customElements.define("app-profile", Profile);
export default Profile;
