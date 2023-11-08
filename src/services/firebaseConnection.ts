
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAoB9--2M_QCExX7PrvLlMflb1kxuGdBXI",
  authDomain: "reactlinks-7d50b.firebaseapp.com",
  projectId: "reactlinks-7d50b",
  storageBucket: "reactlinks-7d50b.appspot.com",
  messagingSenderId: "148936980308",
  appId: "1:148936980308:web:aeafcf5a1543056a3c3ac1",
  measurementId: "G-RGGD6467EF"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

export {auth,db}