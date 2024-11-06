import { appState } from '../store';
import storage from './storage';

let db: any;
let auth: any;
let storageFB: any;

export const getFirebaseInstance = async () => {
  if (!db) {
    const { getFirestore } = await import('firebase/firestore');
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getStorage } = await import('firebase/storage');

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
    const storageFB = getStorage();
  }
  return { db, auth, storage };
};

export const getUser = async () => {
  const { doc, getDoc } = await import('firebase/firestore');  
  try {
    const user = await getDoc(doc(db, 'users', appState.user))

    if (user.exists()) {
      // Si el documento existe, retorna los datos como un objeto
      return user.data();
    } else {
      // Si el documento no existe, puedes retornar algo o lanzar un error
      throw new Error("Document does not exists");
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener el documento: ", error);
    throw error;
  }
}

export const registerUser = async (credentials: any) => {
  try {
    const { auth, db } = await getFirebaseInstance();
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');

    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    const where = doc(db, 'users', userCredential.user.uid);
    const data = {
      name: credentials.name,
      username: credentials.username,
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
    await signOut(auth); 
    console.log("Usuario deslogueado exitosamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

export const addPost = async (posts: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'posts');
		await addDoc(where, posts);
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getPost = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs, orderBy } = await import('firebase/firestore');

		const where = collection(db, 'posts');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting posts', error);
	}
};

export const uploadFile = async (file: File, id: string) => {
  const { storage } = await getFirebaseInstance();
  const { ref, uploadBytes } = await import('firebase/storage');

  const storageRef = ref(storageFB, 'imagesProfile/' + id);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('File uploaded');
  });
}