import "./screens/main/main";
import "./screens/login/login";
import "./screens/register/register";
import { addObserver, appState } from "./store";
import { Screens } from "./types/store";

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this)
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = ''
      switch (appState.screen) {
        case Screens.REGISTER:
          const register = this.ownerDocument.createElement("app-register");
          this.shadowRoot.appendChild(register);
          break;

        case Screens.LOGIN:
          const login = this.ownerDocument.createElement("app-login");
          this.shadowRoot.appendChild(login);
          break;

        case Screens.MAIN:
          const main = this.ownerDocument.createElement("main-page");
          this.shadowRoot.appendChild(main);
          break;

        default:
          break;
      }
    }
  }
}

customElements.define("app-container", AppContainer);