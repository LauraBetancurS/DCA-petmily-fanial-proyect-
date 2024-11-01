import { AppState } from '../types/store';

let db: any;
let auth: any;

export const getFirebaseInstance = async () => {
  if (!db) {
    const { getFirestore } = await import('firebase/firestore');
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');

    const firebaseConfig = {
      apiKey: "AIzaSyDUrgcTtkTTG92yNPDsgCBpxDaYmo10I7E",
      authDomain: "petmilyapp-fd5b0.firebaseapp.com",
      projectId: "petmilyapp-fd5b0",
      storageBucket: "petmilyapp-fd5b0.appspot.com",
      messagingSenderId: "795760909779",
      appId: "1:795760909779:web:4dbd3846be8264a86c6326",
      measurementId: "G-FT0WND85H5",
    };

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }
  return { db, auth };
};

export const registerUser = async (credentials: any) => {
  try {
    const { auth, db } = await getFirebaseInstance();
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');

    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    const where = doc(db, 'users', userCredential.user.uid);
    const data = {
      name: credentials.name,
      email: credentials.email,
    };

    await setDoc(where, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { auth } = await getFirebaseInstance();
    const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');

    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful:', userCredential.user);
    return true;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

export const logOut = async () => {
  const { auth } = await getFirebaseInstance();
  const { signOut } = await import('firebase/auth');

  try {
    await signOut(auth); // Cierra la sesión del usuario
    console.log("Usuario deslogueado exitosamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}