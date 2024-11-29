// import { datacommunity } from '../../data/datacommunity';
// import { logOut, getFileUrlProfileImg } from '../../utils/firebase';
// import { appState, dispatch } from '../../store';
// import { navigate } from '../../store/actions';
// import { Screens } from '../../types/store';

// export enum Attribute {
//     'profilepic' = 'profilepic',
//     'name' = 'name',
//     'username' = 'username',
//     'profiledesc' = 'profiledesc',
//     'communitydata' = 'communitydata',
// }

// class UserProfile extends HTMLElement {
//     profilepic?: string;
//     name?: string;
//     username?: string;
//     profiledesc?: string;
//     communitydata?: string;

//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//     }

//     static get observedAttributes() {
//         return Object.keys(Attribute) as Array<Attribute>;
//     }

//     attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
//         this[propName] = newValue;
//         this.render();
//     }

//     async connectedCallback() {
//         // Si no se define el atributo de imagen, busca la URL desde Firebase
//         if (!this.profilepic) {
//             this.profilepic = await this.fetchProfilePic();
//         }
//         this.render();
//         this.addEventListeners();
//     }

//     async fetchProfilePic(): Promise<string> {
//         try {
//             const profilePicUrl = await getFileUrlProfileImg(appState.user);
//             return profilePicUrl || "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg";
//         } catch (error) {
//             console.error("Error fetching profile picture:", error);
//             return "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"; // Imagen por defecto
//         }
//     }

//     addEventListeners() {
//         const logoutButton = this.shadowRoot?.querySelector('.logout-btn');
//         if (logoutButton) {
//             logoutButton.addEventListener('click', () => {
//                 console.log('logout clickeado');
//                 logOut();
//             });
//         }

//         const editProfile = this.shadowRoot?.querySelector('.btnEdit');
//         if (editProfile) {
//             editProfile.addEventListener('click', () => {
//                 console.log('pantalla navega a edit clickeado');
//                 dispatch(navigate(Screens.EDIT));
//             });
//         }
//     }

//     render() {
//         if (this.shadowRoot) {
//             const communityItems = datacommunity.map(community => `
//                 <div class="community-item">
//                     <img src="${community.communityimg}" alt="${community.communityname}" class="community-img">
//                     <span class="community-name">${community.communityname}</span>
//                 </div>
//             `).join('');

//             this.shadowRoot.innerHTML = `
//                 <link rel="stylesheet" href="../src/components/user/user.css" />
//                 <div class="card-container">
//                     <div class="profile-card">
//                         <img src="${this.profilepic}" alt="Profile Picture" class="profile-pic">
//                         <h2 class="name">${this.name || "Usuario"}</h2>
//                         <p class="username">@${this.username || "Sin nombre"}</p>
                       
//                         <button class="btnEdit">Editar Perfil ✏️</button>
//                     </div>
//                     <div class="community-card">
//                         <h2 class="community-title">Communities</h2>
//                         <div class="community-list">
//                             ${communityItems}
//                         </div>
//                     </div>
//                     <div class="logout-section">
//                         <div class="logout-btn">Cerrar Sesión</div>
//                         <div class="petmily-logo">
//                             <img src="https://firebasestorage.googleapis.com/v0/b/dca-petmily.appspot.com/o/petmily%20logo.png?alt=media&token=65392fad-3e98-435c-a2ac-d0a4d13ef514" alt="Petmily Logo" class="logo-img">
//                             <p class="logo-text">Petmily</p>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//     }
// }

// customElements.define('user-profile', UserProfile);
// export default UserProfile;
