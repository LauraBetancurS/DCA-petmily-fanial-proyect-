import { Actions, Screens } from '../types/store';
import { getProducts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};



export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};
