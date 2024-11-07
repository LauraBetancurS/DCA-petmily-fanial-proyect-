import { appState, dispatch, addObserver } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";
import { addPost, getUser, uploadFile } from "../../utils/firebase";


import styles from "./createpost.css";

const infoPosts = {
  username: "",
  name: "",
  image: "",
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

  async submitForm() {
    console.log("Post submitted:", infoPosts);
    addPost(infoPosts);
    dispatch(navigate(Screens.MAIN));
  }

  async render() {
    if (this.shadowRoot) {
      const style = this.ownerDocument.createElement("style");
      style.innerHTML = style?.innerHTML + styles;
      this.shadowRoot?.appendChild(style);

      const imagePost = this.ownerDocument.createElement("input");
      imagePost.type = "file";
      imagePost.addEventListener("change", () => {
        const file = imagePost.files?.[0];
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
      this.shadowRoot?.appendChild(title);
    }
  }
}
customElements.define("create-post", CreatePost);
