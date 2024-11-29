import { addObserver, appState } from "../../store";
import { getPost, getUserByUsername, getDocumentIdByUsername, getFileUrlProfileImg } from "../../utils/firebase";
import "../../components/navbar/navbar";
import "../../components/banner/banner";
import "../../components/publicitycard/publicitycard";
import "../../components/usermenu/usercard";

import styles from "./profile.css";
import { dashboardPost } from "../../types/post";
import CardPost, { Attribute } from "../../components/cardspost/cardpost";

class Profile extends HTMLElement {
  username: string = "";
  userId: string = ""; // ID del usuario para la validación dinámica

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    // Obtiene el username del atributo al cargar el componente
    this.username = this.getAttribute("username") || "";

    if (this.username) {
      this.userId = await getDocumentIdByUsername(this.username) || ""; // Obtén el ID del usuario basado en el username
      this.render();
    } else {
      console.error("Username not defined for app-profile");
    }
  }

  async render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = "";

    const style = this.ownerDocument.createElement("style");
    style.innerHTML = styles;
    this.shadowRoot.appendChild(style);

    const mainContainer = this.ownerDocument.createElement("section");
    mainContainer.className = "main-container";

    // Contenedor de los posts (contenido principal)
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
    navBar.setAttribute(
      "createicon",
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276"
    );
    navBar.setAttribute(
      "searchicon",
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029"
    );

    const leftSidebar = this.ownerDocument.createElement("div");
    leftSidebar.className = "left-sidebar";

    if (this.userId) { // Validar que el ID del usuario fue obtenido
      try {
        const userData = await getUserByUsername(this.username);
        let profilePicUrl;

        try {
          // Intentar obtener la imagen de perfil con el ID
          profilePicUrl = await getFileUrlProfileImg(this.userId);
        } catch {
          // Si no se encuentra una imagen, usar la imagen por defecto
          profilePicUrl = "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg";
        }

        const userPosts = await getPost(this.username);

        // Crear el componente `user-banner` con los datos del usuario
        const userCard = this.ownerDocument.createElement("user-banner");
        userCard.setAttribute("profilepic", profilePicUrl);
        userCard.setAttribute("name", userData.name);
        userCard.setAttribute("uid", this.userId); // Asignar el ID dinámico
        userCard.setAttribute("username", userData.username);
        userCard.setAttribute("profiledesc", userData.profileDesc || "");

        leftSidebar.appendChild(userCard);

        // Renderizar los posts del usuario
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
      } catch (error) {
        console.error(error);
      }
    }

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
    this.shadowRoot.appendChild(leftSidebar);
    rightSidebar.appendChild(publicityCard);
    mainContainer.appendChild(leftSidebar);
    mainContainer.appendChild(contentContainer);
    mainContainer.appendChild(rightSidebar);
  }
}

customElements.define("app-profile", Profile);
export default Profile;
