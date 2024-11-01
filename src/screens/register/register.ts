import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { registerUser } from '../../utils/firebase';

import styles from './register.css'

const credentials = {
	name: '',
	email: '',
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

			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Register';
			this.shadowRoot.appendChild(title);

			const nameInput = this.ownerDocument.createElement('input');
			nameInput.placeholder = 'Full name';
			nameInput.required = true;
			nameInput.addEventListener('change', (e) => this.changeName(e));
			this.shadowRoot.appendChild(nameInput);

			const emailInput = this.ownerDocument.createElement('input');
			emailInput.placeholder = 'Email';
			emailInput.type = 'email';
			emailInput.required = true;
			emailInput.addEventListener('change', (e) => this.changeEmail(e));
			this.shadowRoot.appendChild(emailInput);

			const passwordInput = this.ownerDocument.createElement('input');
			passwordInput.placeholder = 'Password';
			passwordInput.type = 'password';
			passwordInput.required = true;
			passwordInput.addEventListener('change', (e) => this.changePassword(e));
			this.shadowRoot.appendChild(passwordInput);

			const registerButton = this.ownerDocument.createElement('button');
			registerButton.innerText = 'Register';
			registerButton.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(registerButton);

			const cssCard = this.ownerDocument.createElement('style');
			cssCard.innerHTML = styles;
			this.shadowRoot.appendChild(cssCard);
		}
	}
}

customElements.define('app-register', Register);
export default Register;
