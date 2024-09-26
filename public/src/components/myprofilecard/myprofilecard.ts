import { data } from '../../data/data';

class MyProfileCard extends HTMLElement {
  private profileImg?: string;
  private name?: string;
  private username?: string;
  private profileDesc?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const user = data.find((user) => user.uid === 1);
    if (user) {
      this.profileImg = user.profileImg;
      this.name = user.name;
      this.username = user.username;
      this.profileDesc = user.profileDesc;
    }
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="../public/src/components/myprofilecard/myprofilecard.css" />
        <div class="card">
          <div class="profile-pic-container">
            <img src="${this.profileImg}" alt="Profile Picture" class="profile-pic">
          </div>
          <h2 class="name">${this.name}</h2>
          <p class="username">@${this.username}</p>
          <p class="description">${this.profileDesc}</p>
          <button class="btn">My Profile</button>
        </div>
      `;
    }
    this.addEventListeners();
  }

  addEventListeners() {
    const button = this.shadowRoot?.querySelector('.btn');
    if (button) {
      button.addEventListener('click', () => {
        window.location.href = '/myprofile';
      });
    }
  }
}

customElements.define('my-profile-card', MyProfileCard);
export default MyProfileCard;
