import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { loginUser } from '../../utils/firebase';

// import desktopImg from '../../images/image1.jpg'
import styles from './login.css'
console.log(styles);

const credentials = {
	email: '',
	password: '',
};

class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	changeEmail(e: any) {
		credentials.email = e.target.value;
	}

	changePassword(e: any) {
		credentials.password = e.target.value;
	}

	async submitForm() {
		const resp = await loginUser(credentials.email, credentials.password);
		if (resp) {
			dispatch(navigate(Screens.MAIN));
			console.log('usuario logeado');
		} else {
			alert('Contraseña o Correo incorrectos');
		}
	}

	async render() {
		if (this.shadowRoot) {
			const style = this.ownerDocument.createElement('style');
			style.innerHTML = style?.innerHTML + styles;
			this.shadowRoot?.appendChild(style);
			
			const loginWrapper = this.ownerDocument.createElement('div');
			loginWrapper.className = 'login-wrapper';
	
			const formContainer = this.ownerDocument.createElement('div');
			formContainer.className = 'form-container';
	
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Iniciar sesión';
			formContainer.appendChild(title);
	
			const uEmail = this.ownerDocument.createElement('input');
			uEmail.placeholder = 'Correo electrónico';
			uEmail.addEventListener('change', this.changeEmail);
			formContainer.appendChild(uEmail);
	
			const uPassword = this.ownerDocument.createElement('input');
			uPassword.placeholder = 'Contraseña';
			uPassword.type = 'password';
			uPassword.required = true;
			uPassword.addEventListener('change', this.changePassword);
			formContainer.appendChild(uPassword);
	
			const uSignIn = this.ownerDocument.createElement('button');
			uSignIn.innerText = 'Iniciar sesión';
			uSignIn.addEventListener('click', this.submitForm);
			formContainer.appendChild(uSignIn);
	
			const noAccount = this.ownerDocument.createElement('p');
			const noAccountButton = this.ownerDocument.createElement('a');
			noAccountButton.addEventListener('click', (e) => {
				dispatch(navigate(Screens.REGISTER));
			});
			noAccount.textContent = '¿No tienes cuenta?';
			noAccountButton.textContent = ' regístrate ahora';
			noAccount.appendChild(noAccountButton);
			formContainer.appendChild(noAccount);
	
			const imageContainer = this.ownerDocument.createElement('div');
			imageContainer.className = 'image-container';
	
			const image = this.ownerDocument.createElement('img');
			image.src = ''; 
			image.alt = 'img';
			imageContainer.appendChild(image);
	
			loginWrapper.appendChild(formContainer);
			loginWrapper.appendChild(imageContainer);
	
			this.shadowRoot.appendChild(loginWrapper);
		}
	}
	
}

customElements.define('app-login', Login);
export default Login;