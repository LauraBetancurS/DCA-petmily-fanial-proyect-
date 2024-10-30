let db: any;
let auth: any;

const getFirebaseInstance = async () => {
  if (!db) {
    const { getFirestore } = await import("firebase/firestore");
    const { initializeApp } = await import("firebase/app");
    const { getAuth } = await import("firebase/auth");

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
  return {db, auth};

};

export const registerUser = async (email: string, password: string) => {
	try {
		const { auth } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');

		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log(userCredential.user);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
