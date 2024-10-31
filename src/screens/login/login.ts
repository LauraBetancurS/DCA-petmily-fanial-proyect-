/* import { dispatch } from '../../store';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { loginUser } from '../../utils/firebase';

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

	changeEmail(e: Event) {
		const target = e.target as HTMLInputElement;
		credentials.email = target.value;
	}

	changePassword(e: Event) {
		const target = e.target as HTMLInputElement;
		credentials.password = target.value;
	}

	async submitForm() {
		const success = await loginUser(credentials.email, credentials.password);
		if (success) {
			dispatch(navigate(Screens.MAIN));
		} else {
			alert('Login failed');
		}
	}

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<link rel="stylesheet" href="./path/to/your/login.css">
				<div class="container">
					<h1>Log in</h1>
					<input type="email" placeholder="Enter your email" required @change="${(e) => this.changeEmail(e)}" />
					<input type="password" placeholder="Enter your password" required @change="${(e) => this.changePassword(e)}" />S
					<button @click="${() => this.submitForm()}">Log in</button>
					<div class="signup-link">
						<span>No account? <a href="#" @click="${() => dispatch(navigate(Screens.REGISTER))}">Sign up</a></span>
					</div>
				</div>
			`;
		}
	}
}

customElements.define('app-login', Login);
export default Login;
 */