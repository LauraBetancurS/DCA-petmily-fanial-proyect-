import { datacommunity } from '../../data/datacommunity';

class CommunityCard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../public/src/components/communitycard/communitycard.css" />
        <div class="community-card">
          <h2 class="community-title">Communities</h2>
          <div class="community-list">
            ${datacommunity.map(community => `
              <div class="community-item">
                <img src="${community.communityimg}" alt="${community.communityname}" class="community-img">
                <span class="community-name">${community.communityname}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  addEventListeners() {
    const titleElement = this.shadowRoot?.querySelector('.community-title');
    if (titleElement) {
      titleElement.addEventListener('click', () => {
        window.location.href = 'community.html';
      });
    }
  }
}

customElements.define('community-card', CommunityCard);
export default CommunityCard;
