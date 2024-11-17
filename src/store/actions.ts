import { Actions, Screens } from '../types/store';
import { getPost } from '../utils/firebase';


export const navigate = (screen: Screens) => {
	return {
		action: (Actions.NAVIGATE),
		payload: screen,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};

export const getPosts = async () => {
	const posts = await getPost();
	return {
		action: Actions.GETPOSTS,
		payload: posts,
	};
};
