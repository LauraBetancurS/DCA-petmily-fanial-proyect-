export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	posts: []; // Cambia `any` al tipo específico si tienes un tipo definido para productos
	user: string; // El ID del usuario autenticado
};

export enum Screens {
	'LOGIN' = 'LOGIN',
	'MAIN' = 'MAIN', // Cambiado de DASHBOARD a MAIN
	'REGISTER' = 'REGISTER',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPOSTS' = 'GETPOSTS',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS'
}
