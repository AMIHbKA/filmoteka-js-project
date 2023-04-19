import { getAuth } from 'firebase/auth';
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

export default class FirebaseFirestoreAPI {
  constructor(app) {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  async uploadUserDataToFirestore(data) {
    const preparedData = this.removeUndefinedProperties(data);
    const { uid } = this.auth.currentUser;
    const userRef = doc(this.db, 'userData', uid);

    await setDoc(userRef, preparedData);
  }

  async getUserDataFromFirestore() {
    const { uid } = this.auth.currentUser;
    const userRef = doc(this.db, 'userData', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  removeUndefinedProperties(obj) {
    if (Array.isArray(obj)) {
      return obj.filter(item => {
        if (item === undefined) {
          return false;
        }

        if (typeof item === 'object') {
          this.removeUndefinedProperties(item);
        }

        return true;
      });
    } else {
      for (const key in obj) {
        if (obj[key] === undefined) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          this.removeUndefinedProperties(obj[key]);
        }
      }
    }

    return obj;
  }
}
