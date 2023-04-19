import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';

export default class FirebaseFirestoreAPI {
  constructor(app, onSnapshotCallback) {
    this.onSnapshotCallback = onSnapshotCallback;
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.userId = null;
    this.userDataRef = null;

    this.unsubscribe = null;

    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.userDataRef = doc(this.db, 'userData', this.userId);

        this.unsubscribe = onSnapshot(this.userDataRef, snapshot => {
          if (snapshot.exists()) {
            this.onSnapshotCallback(snapshot.data());
          } else {
            this.onSnapshotCallback(null);
          }
        });
      }
    });
  }

  async uploadUserDataToFirestore(data) {
    if (!this.userId) {
      return;
    }

    const preparedData = this.removeUndefinedProperties(data);

    await setDoc(this.userDataRef, preparedData);
  }

  async getUserDataFromFirestore() {
    if (!this.userId) {
      return null;
    }

    const docSnap = await getDoc(this.userDataRef);

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
