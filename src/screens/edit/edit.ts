import { appState } from "../../store";
import { getUser, updateUserCredentials, updateAuthCredentials, updateUserPosts, uploadFileProfileImg, getFileUrlProfileImg} from "../../utils/firebase";
import "../../components/navbar/navbar";
import "../../components/banner/banner";
import "../../components/profilecard/profilecard";
import styles from "./edit.css";

class EditProfile extends HTMLElement {
  userData: any;
  currentUserPic: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.fetchUserData();
    this.render();
    this.addEventListeners();
  }

  async fetchUserData() {
    try {
      this.userData = await getUser();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  addEventListeners() {
    const saveButton = this.shadowRoot?.querySelector(".save-btn");
    const fileInput = this.shadowRoot?.querySelector<HTMLInputElement>("#profile-pic");
    const previewImage = this.shadowRoot?.querySelector<HTMLImageElement>("#profile-pic-preview");

    if (fileInput) {
      fileInput.addEventListener("change", async () => {
        const file = fileInput.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            if (previewImage) previewImage.src = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", async () => {
        const nameInput = this.shadowRoot?.querySelector<HTMLInputElement>("#name");
        const usernameInput = this.shadowRoot?.querySelector<HTMLInputElement>("#username");
        const emailInput = this.shadowRoot?.querySelector<HTMLInputElement>("#email");
        const passwordInput = this.shadowRoot?.querySelector<HTMLInputElement>("#password");

        let profilePicUrl = this.userData?.profilePic;

        const file = fileInput?.files?.[0];
        if (file) {
          try {
            await uploadFileProfileImg(file, appState.user); // Subir la imagen al almacenamiento
            profilePicUrl = await getFileUrlProfileImg(appState.user); // Obtener la URL de la imagen subida
            console.log("Nueva imagen de perfil cargada:", profilePicUrl);
          } catch (error) {
            console.error("Error al subir o obtener la imagen de perfil:", error);
            return;
          }
        }

        const updatedData = {
          ...(nameInput?.value && { name: nameInput.value }),
          ...(usernameInput?.value && { username: usernameInput.value }),
          ...(emailInput?.value && { email: emailInput.value }),
          ...(profilePicUrl && { profilePic: profilePicUrl }),
        };

        const updateFirestore = await updateUserCredentials(appState.user, updatedData);
        const updateAuth = await updateAuthCredentials(emailInput?.value || "", passwordInput?.value || "");

        if (updatedData.name || updatedData.username) {
          await updateUserPosts(this.userData.username, updatedData);
        }

        if (updateFirestore && updateAuth) {
          if (nameInput) nameInput.value = "";
          if (usernameInput) usernameInput.value = "";
          if (emailInput) emailInput.value = "";
          if (passwordInput) passwordInput.value = "";

          await this.fetchUserData();
          this.render();
        }
      });
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../src/components/editprofile/editprofile.css">
    `;

    const style = this.ownerDocument.createElement("style");
    style.innerHTML = styles;
    this.shadowRoot.appendChild(style);

    const navBar = this.ownerDocument.createElement("nav-bar");
    navBar.setAttribute("icon", "http://imgfz.com/i/DjpNIAU.png");
    navBar.setAttribute("input", "Search PetNet");
    navBar.setAttribute("communityIcon", "http://imgfz.com/i/rxAefV8.png");
    navBar.setAttribute("profilePic", this.currentUserPic);
    navBar.setAttribute("createicon", "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20create.png?alt=media&token=d58dc436-cffa-4b16-940d-a4467c5ff276");
    navBar.setAttribute("searchicon", "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/icono%20lupa.png?alt=media&token=16d3b4ec-5267-407c-8b63-a46f3bdba029");
    this.shadowRoot.appendChild(navBar);

    const banner = this.ownerDocument.createElement("app-banner");
    banner.className = "banner";
    banner.setAttribute("bannerImage", "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/banner%20componenet.png?alt=media&token=19fb1727-6c11-4281-8723-c0100079d0be");
    this.shadowRoot.appendChild(banner);

    const container = this.ownerDocument.createElement("div");
    container.className = "edit-container";

    const profileCard = this.ownerDocument.createElement("profile-card");
    profileCard.className = "profile-card";
    profileCard.setAttribute("profilepic", this.userData?.profilePic || "");
    profileCard.setAttribute("name", this.userData?.name || "");
    profileCard.setAttribute("username", this.userData?.username || "");
    container.appendChild(profileCard);

    const form = this.ownerDocument.createElement("form");
    form.className = "edit-form";

    const title = this.ownerDocument.createElement("h1");
    title.textContent = "Editar perfil";

    const line = this.ownerDocument.createElement("div");
    line.className = "title-line";

    const inputContainer = this.ownerDocument.createElement("div");
    inputContainer.className = "input-container";

    const createInputField = (
      labelText: string,
      id: string,
      type: string,
      placeholder: string
    ) => {
      const label = this.ownerDocument.createElement("label");
      label.setAttribute("for", id);
      label.textContent = labelText;

      const input = this.ownerDocument.createElement("input");
      input.type = type;
      input.id = id;
      input.placeholder = placeholder;

      inputContainer.appendChild(label);
      inputContainer.appendChild(input);
    };

    createInputField("Correo Electrónico:", "email", "email", this.userData?.email || "");
    createInputField("Nombre de Usuario:", "username", "text", this.userData?.username || "");
    createInputField("Contraseña:", "password", "password", "**********");

    const createImageUploadField = (labelText: string, id: string) => {
      const label = this.ownerDocument.createElement("label");
      label.setAttribute("for", id);
      label.textContent = labelText;

      const input = this.ownerDocument.createElement("input");
      input.type = "file";
      input.id = id;
      input.accept = "image/*";

      inputContainer.appendChild(label);
      inputContainer.appendChild(input);
    };

    createImageUploadField("Subir nueva imagen de perfil:", "profile-pic");

    const saveButton = this.ownerDocument.createElement("button");
    saveButton.type = "button";
    saveButton.className = "save-btn";
    saveButton.textContent = "Guardar";

    form.appendChild(title);
    form.appendChild(line);
    form.appendChild(inputContainer);
    form.appendChild(saveButton);

    container.appendChild(form);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define("edit-profile", EditProfile);
export default EditProfile;
