export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	posts: [];
	user: string; // El ID del usuario autenticado
};

export enum Screens {
	'LOGIN' = 'LOGIN',
	'MAIN' = 'MAIN', 
	'REGISTER' = 'REGISTER',
	'CREATEPOST' = 'CREATEPOST',
	'PROFILE' = 'PROFILE'
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPOSTS' = 'GETPOSTS',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS'
}
