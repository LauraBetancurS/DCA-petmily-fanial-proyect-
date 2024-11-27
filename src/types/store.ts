export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	posts: [];
	user: string; // El ID del usuario autenticado
	params : {[key:string] : any};
};

export enum PersistanceKeys {
	"STORE" = "STORE",
  }  

export enum Screens {
	'LOGIN' = 'LOGIN',
	'MAIN' = 'MAIN', 
	'REGISTER' = 'REGISTER',
	'CREATEPOST' = 'CREATEPOST',
	'PROFILE' = 'PROFILE',
	'EDIT' = 'EDIT',
}


export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPOSTS' = 'GETPOSTS',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS'
}
