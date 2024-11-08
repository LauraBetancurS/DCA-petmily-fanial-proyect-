import { appState, dispatch, addObserver } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import { addPost, getFileUrls, getUser, uploadFile } from "../../utils/firebase";
import styles from "./createpost.css";
import "../../components/navbar/navbar";
import "../../components/banner/banner";

const infoPosts: {
  username: string;
  name: string;
  image: string[];
  description: string;
} = {
  username: "",
  name: "",
  image: [],
  description: "",
};

class CreatePost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    const user = await getUser();
    infoPosts.name = user.name;
    infoPosts.username = user.username;
    this.render();
  }

  changeDesciption(e: any) {
    infoPosts.description = e.target.value;
  }

  async changeImage() {
    const urls = await getFileUrls(appState.user);
    infoPosts.image = urls;
  }

  async submitForm() {
    await this.changeImage();
    addPost(infoPosts);
    dispatch(navigate(Screens.MAIN));
  }

  render() {
    if (this.shadowRoot) {
      const style = this.ownerDocument.createElement("style");
      style.innerHTML = styles;
      this.shadowRoot.appendChild(style);

      const banner = this.ownerDocument.createElement("app-banner");
      banner.className = "banner";
      banner.setAttribute("bannerImage", "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/banner%20componenet.png?alt=media&token=19fb1727-6c11-4281-8723-c0100079d0be");
      this.shadowRoot.appendChild(banner);

      const navBar = this.ownerDocument.createElement("nav-bar");
      navBar.className = "navbar";
      navBar.setAttribute("icon", "http://imgfz.com/i/DjpNIAU.png");
      navBar.setAttribute("input", "Buscar en PetNet");
      navBar.setAttribute("communityicon", "http://imgfz.com/i/rxAefV8.png");
      navBar.setAttribute("profilepic", "path_to_profile_picture");
      navBar.setAttribute("createicon", "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276");
      navBar.setAttribute("searchicon", "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029");
      this.shadowRoot.appendChild(navBar);

      const container = this.ownerDocument.createElement("div");
      container.className = "createpost-wrapper";

      const title = this.ownerDocument.createElement("h2");
      title.className = "title";
      title.textContent = "Crear publicación";
      container.appendChild(title);

      const divider = this.ownerDocument.createElement("div");
      divider.className = "divider";
      container.appendChild(divider);

      const descriptionPost = this.ownerDocument.createElement("input");
      descriptionPost.className = "description-input";
      descriptionPost.placeholder = "Añade una descripción";
      descriptionPost.addEventListener("change", this.changeDesciption.bind(this));
      container.appendChild(descriptionPost);

      const imageUploadContainer = this.ownerDocument.createElement("div");
      imageUploadContainer.className = "image-upload-container";

      const imagePost = this.ownerDocument.createElement("input");
      imagePost.type = "file";
      imagePost.className = "image-input";
      imagePost.addEventListener("change", () => {
        const file = imagePost.files?.[0];
        if (file) uploadFile(file, appState.user);
      });
      imageUploadContainer.appendChild(imagePost);

      const imageLabel = this.ownerDocument.createElement("p");
      imageLabel.className = "image-label";
      imageLabel.textContent = "Selecciona tu imagen";
      imageUploadContainer.appendChild(imageLabel);

      container.appendChild(imageUploadContainer);

      const savePost = this.ownerDocument.createElement("button");
      savePost.className = "publish-button";
      savePost.innerText = "Publicar";
      savePost.addEventListener("click", this.submitForm.bind(this));
      container.appendChild(savePost);

      this.shadowRoot.appendChild(container);
    }
  }
}

customElements.define("create-post", CreatePost);
export default CreatePost;
