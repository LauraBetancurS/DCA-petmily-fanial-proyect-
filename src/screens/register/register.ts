import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';

import styles from './register.css'

const credentials = {
	name: '',
	email: '',
	username: '',
	password: '',
};

class Register extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	changeName(e: any) {
		credentials.name = e.target.value;
	}

	changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changeUserName(e: any) {
		credentials.username = e.target.value;
	}


	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	async submitForm() {
		const resp = await registerUser(credentials);
		if (resp) {
			dispatch(navigate(Screens.MAIN));
			console.log('usuario registrado');
		} else {
			alert('Could not create user');
		}
	}

	async render() {
		if (this.shadowRoot) {
			const style = this.ownerDocument.createElement('style');
			style.innerHTML = style?.innerHTML + styles;
			this.shadowRoot?.appendChild(style);
	
			const registerWrapper = this.ownerDocument.createElement('div');
			registerWrapper.className = 'register-wrapper';
	
			const formContainer = this.ownerDocument.createElement('div');
			formContainer.className = 'form-container';
	
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Register';
			formContainer.appendChild(title);
	
			const uName = this.ownerDocument.createElement('input');
			uName.placeholder = 'Full name';
			uName.required = true;
			uName.addEventListener('change', (e) => this.changeName(e));
			formContainer.appendChild(uName);

			const userName = this.ownerDocument.createElement('input');
			userName.placeholder = 'Username';
			userName.required = true;
			userName.addEventListener('change', (e) => this.changeUserName(e));
			formContainer.appendChild(userName);
	
			const uEmail = this.ownerDocument.createElement('input');
			uEmail.placeholder = 'Email';
			uEmail.type = 'email';
			uEmail.required = true;
			uEmail.addEventListener('change', (e) => this.changeEmail(e));
			formContainer.appendChild(uEmail);
	
			const uPasswordInput = this.ownerDocument.createElement('input');
			uPasswordInput.placeholder = 'Password';
			uPasswordInput.type = 'password';
			uPasswordInput.required = true;
			uPasswordInput.addEventListener('change', (e) => this.changePassword(e));
			formContainer.appendChild(uPasswordInput);
	
			const registerButton = this.ownerDocument.createElement('button');
			registerButton.innerText = 'Register';
			registerButton.addEventListener('click', this.submitForm);
			formContainer.appendChild(registerButton);
	
			const haveAccount = this.ownerDocument.createElement('p');
			const haveAccountButton = this.ownerDocument.createElement('a');
			haveAccountButton.addEventListener('click', () => {
				dispatch(navigate(Screens.LOGIN));
			});
			haveAccount.textContent = 'You have an account?';
			haveAccountButton.textContent = ' log-in';
			haveAccount.appendChild(haveAccountButton);
			formContainer.appendChild(haveAccount);
	
			const imageContainer = this.ownerDocument.createElement('div');
			imageContainer.className = 'image-container';
	
			const image = this.ownerDocument.createElement('img');
			image.src = '';
			image.alt = 'img';
			imageContainer.appendChild(image);
	
			registerWrapper.appendChild(formContainer);
			registerWrapper.appendChild(imageContainer);
	
			this.shadowRoot.appendChild(registerWrapper);
		}
	}
}

customElements.define('app-register', Register);
export default Register;
