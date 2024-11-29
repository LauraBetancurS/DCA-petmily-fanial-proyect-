import { addObserver } from "../../store";
import {
  getPost,
  getUserByUsername,
  getDocumentIdByUsername,
  getFileUrlProfileImg,
} from "../../utils/firebase";
import "../../components/navbar/navbar";
import "../../components/banner/banner";
import "../../components/publicitycard/publicitycard";
import "../../components/usermenu/usercard";
import styles from "./profile.css";
import { dashboardPost } from "../../types/post";
import CardPost, { Attribute } from "../../components/cardspost/cardpost";

class Profile extends HTMLElement {
  username: string = "";
  userId: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    this.username = this.getAttribute("username") || "";
    if (this.username) {
      this.userId = (await getDocumentIdByUsername(this.username)) || "";
      this.render();
    }
  }

  async render() {
    if (!this.shadowRoot) return;

    const isMobileView = window.innerWidth <= 768;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../src/screens/profile/profile.css">
    `;

    const navBar = this.ownerDocument.createElement("nav-bar");
    navBar.setAttribute("icon", "http://imgfz.com/i/DjpNIAU.png");
    navBar.setAttribute("input", "Search PetNet");
    navBar.setAttribute("communityIcon", "http://imgfz.com/i/rxAefV8.png");
    navBar.setAttribute(
      "createicon",
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276"
    );
    navBar.setAttribute(
      "searchicon",
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029"
    );

    const banner = this.ownerDocument.createElement("app-banner");
    banner.className = "banner";
    banner.setAttribute(
      "bannerImage",
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/banner%20componenet.png?alt=media&token=19fb1727-6c11-4281-8723-c0100079d0be"
    );

    const mainContainer = this.ownerDocument.createElement("section");
    mainContainer.className = `main-container ${
      isMobileView ? "responsive-background" : ""
    }`;

    const leftSidebar = this.ownerDocument.createElement("aside");
    leftSidebar.className = "left-sidebar";

    const userCard = this.ownerDocument.createElement("user-banner");

    if (this.userId) {
      try {
        const userData = await getUserByUsername(this.username);
        const profilePicUrl = await getFileUrlProfileImg(this.userId).catch(
          () =>
            "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
        );

        userCard.setAttribute("profilepic", profilePicUrl);
        userCard.setAttribute("name", userData.name);
        userCard.setAttribute("uid", this.userId);
        userCard.setAttribute("username", userData.username);
        userCard.setAttribute("profiledesc", userData.profileDesc || "");

        leftSidebar.appendChild(userCard);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }

    const topUserMenu = this.ownerDocument.createElement("section");
    topUserMenu.className = "top-user-menu";
    topUserMenu.appendChild(userCard.cloneNode(true));

    const contentContainer = this.ownerDocument.createElement("main");
    contentContainer.className = "content-container";

    const userPosts = await getPost(this.username);
    userPosts?.forEach((post: dashboardPost) => {
      const cardPost = this.ownerDocument.createElement(
        "card-post"
      ) as CardPost;
      cardPost.setAttribute(Attribute.name, post.name);
      cardPost.setAttribute(Attribute.username, post.username);
      cardPost.setAttribute(Attribute.profileimg, post.profileImg);
      cardPost.setAttribute(Attribute.postdesc, post.description);
      cardPost.setAttribute(Attribute.imgpost, post.image);
      contentContainer.appendChild(cardPost);
    });

    const rightSidebar = this.ownerDocument.createElement("aside");
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
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/Assets%20Dash%2Ffoto1%201.png?alt=media&token=2db66df2-6b62-4c65-bcdf-c82b4acad636"
    );

    rightSidebar.appendChild(publicityCard);

    this.shadowRoot.appendChild(navBar);
    this.shadowRoot.appendChild(banner);
    this.shadowRoot.appendChild(topUserMenu);
    this.shadowRoot.appendChild(mainContainer);
    mainContainer.appendChild(leftSidebar);
    mainContainer.appendChild(contentContainer);
    mainContainer.appendChild(rightSidebar);
  }
}

customElements.define("app-profile", Profile);
export default Profile;
