import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer, Screens } from '../types/store';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseInstance } from '../utils/firebase';
import { navigate, setUserCredentials } from './actions';

const onAuth = async () => {
	const { auth } = await getFirebaseInstance();
	onAuthStateChanged(auth, (user: any) => {
		if (user) {
			user.uid !== null ? dispatch(setUserCredentials(user.uid)) : ''; // Guarda el id del usuario
			dispatch(navigate(Screens.MAIN)); // Navega al dashboard
		} else if (appState.screen != Screens.LOGIN) {
			dispatch(navigate(Screens.LOGIN)); // Navega a login si no hay usuario autenticado
		}
	});
};

// Llama a onAuth para activar la escucha de cambios en el estado de autenticación
onAuth();

// Estado global de la aplicación
const initialState: AppState = {
	screen: 'LOGIN',
	posts: [],
	user: '',
};

export let appState = initialState;

let observers: Observer[] = [];

// Crear el dispatch para actualizar el estado
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState)); // Clona el estado actual
	const newState = reducer(action, clone); // Genera el nuevo estado usando el reducer
	console.log(`estado actualizado desde ${action.action} y ${action.payload}`);
	appState = newState;

	// Notifica a los observadores para que se actualicen
	observers.forEach((o: any) => o.render());
};

// Agregar observadores para actualizar los componentes interesados
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
