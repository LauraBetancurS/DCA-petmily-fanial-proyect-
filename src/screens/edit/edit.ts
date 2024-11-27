import { appState } from '../../store';
import { getUser, updateUserCredentials, updateAuthCredentials, updateUserPosts} from '../../utils/firebase';

class EditProfile extends HTMLElement {
    userData: any;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.fetchUserData(); // Obtén los datos actuales del usuario autenticado
        this.render();
        this.addEventListeners();
    }

    async fetchUserData() {
        try {
            this.userData = await getUser(); // Llama directamente a getUser sin argumentos
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    addEventListeners() {
        const saveButton = this.shadowRoot?.querySelector('.save-btn');
        if (saveButton) {
            saveButton.addEventListener('click', async () => {
                const nameInput = this.shadowRoot?.querySelector<HTMLInputElement>('#name');
                const usernameInput = this.shadowRoot?.querySelector<HTMLInputElement>('#username');
                const emailInput = this.shadowRoot?.querySelector<HTMLInputElement>('#email');
                const passwordInput = this.shadowRoot?.querySelector<HTMLInputElement>('#password');

                if (!this.userData?.username) {
                    console.error('No authenticated user found.');
                    return;
                }

                    // Validar longitud de la contraseña
                    const password = passwordInput?.value;
                    if (password && password.length < 6) {
                        alert('Password must be at least 6 characters long.');
                        return;
                    }

                // Datos a actualizar
                const updatedData = {
                    ...(nameInput?.value && { name: nameInput.value }),
                    ...(usernameInput?.value && { username: usernameInput.value }),
                    ...(emailInput?.value && { email: emailInput.value }),
                };

                // Actualizar en Firestore y Auth
                const updateFirestore = await updateUserCredentials(appState.user, updatedData);
                const updateAuth = await updateAuthCredentials(emailInput?.value || '', passwordInput?.value || '');

                // Actualizar los posts del usuario si cambian el nombre o username
                if (updatedData.name || updatedData.username) {
                    await updateUserPosts(this.userData.username, updatedData);
                }

                if (updateFirestore && updateAuth) {
                    console.log('Credentials updated successfully.');

                    // Actualizar placeholders y borrar valores de los inputs
                    if (nameInput) {
                        nameInput.placeholder = updatedData.name || this.userData.name;
                        nameInput.value = '';
                    }
                    if (usernameInput) {
                        usernameInput.placeholder = updatedData.username || this.userData.username;
                        usernameInput.value = '';
                    }
                    if (emailInput) emailInput.value = '';
                    if (passwordInput) passwordInput.value = '';

                    // Refrescar datos del usuario
                    await this.fetchUserData();
                    this.render();
                } else {
                    console.error('There was an issue updating the credentials.');
                }
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/editprofile/editprofile.css" />
                <div class="edit-container">
                    <h1>Edit Profile</h1>
                    <form class="edit-form">
                        <label for="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="${this.userData?.name || 'Your current name'}" 
                        />
                        
                        <label for="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="${this.userData?.username || 'Your current username'}" 
                        />

                        <label for="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="${this.userData?.email || 'Your current email'}" 
                        />

                        <label for="password">New Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your new password" 
                        />

                        <button type="button" class="save-btn">Save Changes</button>
                    </form>
                </div>
            `;
        }
    }
}

customElements.define('edit-profile', EditProfile);
export default EditProfile;
