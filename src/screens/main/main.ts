import "../../components/navbar/navbar";
import "../../components/usermenu/usercard";
import CardPost, { Attribute } from "../../components/cardspost/cardpost";
import "../../components/cardspost/cardpost";
import "../../components/publicitycard/publicitycard";
import { data } from "../../data/data";
import { getPost, getUser } from "../../utils/firebase";
import { appState, dispatch } from "../../store";
import { getPosts } from "../../store/actions";
import { dashboardPost } from "../../types/post";

interface User {
  uid: number;
  username: string;
  profileImg: string;
  name: string;
  profileDesc: string;
}

class Main extends HTMLElement {
  currentUserPic: string = "";
  currentUserName: string = "";
  currentUserDesc: string = "";
  user: any[] = [];
  posts: CardPost[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const selectedUser: User | undefined = data.find(
      (user: User) => user.username === "doglover99"
    );
    if (selectedUser) {
      this.currentUserPic = selectedUser.profileImg;
      this.currentUserName = selectedUser.name;
      this.currentUserDesc = selectedUser.profileDesc;
    }
  }

  async connectedCallback() {

    if (appState.posts.length > 0) {
      this.render();
      
    } else {
      const posts = await getPosts();
      dispatch(posts);    
    }
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/screens/main/main.css">
            `;

      // Navbar
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

      // Contenedor principal
      const mainContainer = this.ownerDocument.createElement("section");
      mainContainer.className = "main-container";

      // Contenedor lateral izquierdo (UserCard)
      const leftSidebar = this.ownerDocument.createElement("div");
      leftSidebar.className = "left-sidebar";

      const userData = await getUser();
      
      // User Card - Se coloca en el sidebar izquierdo en desktop
      const userCard = this.ownerDocument.createElement("user-banner");
      userCard.setAttribute("profilepic", this.currentUserPic);
      userCard.setAttribute("uid", appState.user)
      userCard.setAttribute("name", userData.name);
      userCard.setAttribute("username", userData.username);
      userCard.setAttribute("profiledesc", this.currentUserDesc);

      // Verificación para agregar `topUserMenu` solo en la vista móvil
      const topUserMenu = this.ownerDocument.createElement("div");
      topUserMenu.className = "top-user-menu";
      topUserMenu.innerHTML = `
        <img src="https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/petmily%20logo.png?alt=media&token=65392fad-3e98-435c-a2ac-d0a4d13ef514" alt="Petmily Logo" class="logo-img">
        <p class="logo-text">Petmily</p>
      `;

      // Contenedor del contenido principal (Posts y Publicidad)
      const contentContainer = this.ownerDocument.createElement("div");
      contentContainer.className = "content-container";
      const rightSidebar = this.ownerDocument.createElement("div");
      rightSidebar.className = "right-sidebar";

      //Este es el foreach que falta poner en la screen profile
      //para que se rendericen los post en el contenedor "content-container"
      appState.posts.forEach((post: dashboardPost) => {
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

      // Publicity Card - Se añade al contenedor del contenido principal
      const publicityCard = this.ownerDocument.createElement("publicity-card");
      publicityCard.setAttribute(
        "cardtitle",
        "The Social Network for Pet Lovers"
      );
      publicityCard.setAttribute(
        "description",
        "Together we provide the love and care they deserve. Share experiences, learn from other owners, and be part of a group that values animal welfare as much as you do. Make every footprint count!"
      );
      publicityCard.setAttribute(
        "img",
        "https://firebasestorage.googleapis.com/v0/b/petmily-7b24c.appspot.com/o/Assets%20Dash%2FimgPublicityCard.png?alt=media&token=bba7b6d2-4dd4-4ab7-9d88-2e69638a2a49"
      );

      rightSidebar.appendChild(publicityCard);
      leftSidebar.appendChild(userCard);

      // Añadir navbar, sidebar izquierdo y contenedor principal al shadowRoot
      this.shadowRoot.appendChild(navBar);
      this.shadowRoot.appendChild(topUserMenu); // Añadir User Menu en la parte superior en vista móvil
      this.shadowRoot.appendChild(mainContainer);
      mainContainer.appendChild(leftSidebar);
      mainContainer.appendChild(contentContainer);
      mainContainer.appendChild(rightSidebar);
    }
  }
}

customElements.define("main-page", Main);
export default Main;
