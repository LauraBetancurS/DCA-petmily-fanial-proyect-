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

			const uName = this.ownerDocument.createElement('input');
			uName.placeholder = 'Full name';
			uName.required = true;
			uName.addEventListener('change', (e) => this.changeName(e));
			this.shadowRoot.appendChild(uName);

			const uEmail = this.ownerDocument.createElement('input');
			uEmail.placeholder = 'Email';
			uEmail.type = 'email';
			uEmail.required = true;
			uEmail.addEventListener('change', (e) => this.changeEmail(e));
			this.shadowRoot.appendChild(uEmail);

			const uPasswordInput = this.ownerDocument.createElement('input');
			uPasswordInput.placeholder = 'Password';
			uPasswordInput.type = 'password';
			uPasswordInput.required = true;
			uPasswordInput.addEventListener('change', (e) => this.changePassword(e));
			this.shadowRoot.appendChild(uPasswordInput);

			const registerButton = this.ownerDocument.createElement('button');
			registerButton.innerText = 'Register';
			registerButton.addEventListener('click', this.submitForm);
			this.shadowRoot.appendChild(registerButton);

			const cssRegister = this.ownerDocument.createElement('style');
			cssRegister.innerHTML = styles;
			this.shadowRoot.appendChild(cssRegister);
		}
	}
}

customElements.define('app-register', Register);
export default Register;
