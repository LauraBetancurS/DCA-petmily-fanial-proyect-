import * as components from "./components/indexPadre";
import "./screens/main/main";
import { addObserver, appState } from "./store";

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    addObserver(this);
  }

  render() {
    if (this.shadowRoot) {
      switch (appState.screen) {
        case "REGISTER":
          const register = this.ownerDocument.createElement("app-register");
          this.shadowRoot.appendChild(register);

          break;

        default:
          break;
      }

      // this.shadowRoot.innerHTML = `

      // // <login-user></login-user>
      // // <app-register></app-register>
      // //           <main-page></main-page>
                
      //       `;
    }
  }
}

customElements.define("app-container", AppContainer);
