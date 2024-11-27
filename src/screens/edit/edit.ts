import { appState } from "../../store";
import {
  getUser,
  updateUserCredentials,
  updateAuthCredentials,
  updateUserPosts,
} from "../../utils/firebase";
import "../../components/navbar/navbar";
import "../../components/banner/banner";

class EditProfile extends HTMLElement {
  userData: any;
  currentUserPic: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.fetchUserData(); // Obtén los datos actuales del usuario autenticado
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
    if (saveButton) {
      saveButton.addEventListener("click", async () => {
        const nameInput = this.shadowRoot?.querySelector<HTMLInputElement>(
          "#name"
        );
        const usernameInput = this.shadowRoot?.querySelector<HTMLInputElement>(
          "#username"
        );
        const emailInput = this.shadowRoot?.querySelector<HTMLInputElement>(
          "#email"
        );
        const passwordInput = this.shadowRoot?.querySelector<HTMLInputElement>(
          "#password"
        );

        if (!this.userData?.username) {
          console.error("No authenticated user found.");
          return;
        }

        // Validar longitud de la contraseña
        const password = passwordInput?.value;
        if (password && password.length < 6) {
          alert("Password must be at least 6 characters long.");
          return;
        }

        const updatedData = {
          ...(nameInput?.value && { name: nameInput.value }),
          ...(usernameInput?.value && { username: usernameInput.value }),
          ...(emailInput?.value && { email: emailInput.value }),
        };

        const updateFirestore = await updateUserCredentials(
          appState.user,
          updatedData
        );
        const updateAuth = await updateAuthCredentials(
          emailInput?.value || "",
          passwordInput?.value || ""
        );

        if (updatedData.name || updatedData.username) {
          await updateUserPosts(this.userData.username, updatedData);
        }

        if (updateFirestore && updateAuth) {
          console.log("Credentials updated successfully.");
          if (nameInput) nameInput.value = "";
          if (usernameInput) usernameInput.value = "";
          if (emailInput) emailInput.value = "";
          if (passwordInput) passwordInput.value = "";

          await this.fetchUserData();
          this.render();
        } else {
          console.error("There was an issue updating the credentials.");
        }
      });
    }
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../src/components/editprofile/editprofile.css">
    `;
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

    this.shadowRoot.appendChild(navBar);

    const banner = this.ownerDocument.createElement("app-banner");
    banner.className = "banner";
    banner.setAttribute(
      "bannerImage",
      "https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/banner%20componenet.png?alt=media&token=19fb1727-6c11-4281-8723-c0100079d0be"
    );
    this.shadowRoot.appendChild(banner);

    const container = this.ownerDocument.createElement("div");
    container.className = "edit-container";

    const title = this.ownerDocument.createElement("h1");
    title.textContent = "Edit Profile";

    const form = this.ownerDocument.createElement("form");
    form.className = "edit-form";

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

      form.appendChild(label);
      form.appendChild(input);
    };

    createInputField(
      "Name:",
      "name",
      "text",
      this.userData?.name || "Your current name"
    );
    createInputField(
      "Username:",
      "username",
      "text",
      this.userData?.username || "Your current username"
    );
    createInputField(
      "Email:",
      "email",
      "email",
      this.userData?.email || "Your current email"
    );
    createInputField("New Password:", "password", "password", "Enter new password");

    const saveButton = this.ownerDocument.createElement("button");
    saveButton.type = "button";
    saveButton.className = "save-btn";
    saveButton.textContent = "Save Changes";

    form.appendChild(saveButton);
    container.appendChild(title);
    container.appendChild(form);

    this.shadowRoot.appendChild(container);
  }
}

customElements.define("edit-profile", EditProfile);
export default EditProfile;
