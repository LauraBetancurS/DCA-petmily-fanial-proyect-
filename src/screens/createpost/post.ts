import { appState, dispatch, addObserver } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import { addPost, getFileUrls, getUser, uploadFile } from "../../utils/firebase";
import styles from "./posts.css";
import { data } from "../../data/data";
import "../../components/navbar/navbar";
import "../../components/banner/banner";



const infoPosts: {
  username: string;
  name: string;
  image: string[]; // Definir explícitamente como un array de strings
  description: string;
} = {
  username: "",
  name: "",
  image: [], // Inicializar correctamente como un array de strings
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
    console.log(user);

    this.render();
  }

  changeDesciption(e: any) {
    infoPosts.description = e.target.value;
  }

  changeUsername(e: any) {
    infoPosts.username = e.target.value;
  }

  async changeImage() {
    const urls = await getFileUrls(appState.user);
    console.log(urls);
    infoPosts.image = urls; // Asignar todas las URLs
  }

  async submitForm() {
    console.log("Post submitted:", infoPosts);
    await this.changeImage();
    addPost(infoPosts);
    dispatch(navigate(Screens.MAIN));
  }

  async render() {
    if (this.shadowRoot) {
      const style = this.ownerDocument.createElement("style");
      style.innerHTML = styles;
      this.shadowRoot.appendChild(style);

      const imagePost = this.ownerDocument.createElement("input");
      imagePost.type = "file";
      imagePost.addEventListener("change", () => {
        const file = imagePost.files?.[0];
        console.log(file);
        
        if (file) uploadFile(file, appState.user);
      });
      this.shadowRoot?.appendChild(imagePost);

      const descriptionPost = this.ownerDocument.createElement("input");
      descriptionPost.placeholder = "Añade tu descripción";
      descriptionPost.addEventListener(
        "change",
        this.changeDesciption.bind(this)
      );
      this.shadowRoot?.appendChild(descriptionPost);

      const savePost = this.ownerDocument.createElement("button");
      savePost.innerText = "Post";
      savePost.addEventListener("click", this.submitForm.bind(this));
      this.shadowRoot?.appendChild(savePost);

      const title = this.ownerDocument.createElement("h2");
      title.textContent = "Crea tu publicacion";
      this.shadowRoot.appendChild(title);
    }
  }
}
customElements.define("create-post", CreatePost);
