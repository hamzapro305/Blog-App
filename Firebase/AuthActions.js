import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";

class Auth {

    async setUserInFireStore(id, data){
        return new Promise(async (res, rej) => {
            try {
                setDoc(doc(db, "Users", id), {
                    id: id,
                    ...data,
                },  { merge: true });
                res(true)
            } catch (error) {
                console.log(error)
                rej(false)
            }
        })
    }

    async getUserFromFireStore(id){
        return new Promise(async (res, rej) => {
            const docRef = doc(db, "Users", id);
            const User = await getDoc(docRef);
            if(User.exists()){
                res(User.data())
            }else{
                rej(null)
            }
        })
    }

    async signInWithGoogle() {
        return new Promise(async (res, rej) => {
            try {
                const googleProvider = new GoogleAuthProvider();
                const USER = await signInWithPopup(auth, googleProvider);
                const user = USER.user;
                const q = query(
                    collection(db, "Users"),
                    where("id", "==", user.uid)
                );
                const docs = await getDocs(q);

                let upload = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };
                if (docs.docs.length === 0) {
                    await this.setUserInFireStore(user.uid, upload)
                } 
                res(true)
            } catch (err) {
                switch (err.code) {
                    case "auth/popup-closed-by-user":
                        rej("Process Canceled");
                        break;
                    case "auth/unauthorized-domain":
                        rej("Domain is Un-Authorized/Verified");
                        break;
                    case "auth/internal-error":
                        rej("Internal Error");
                        break;
                    default:
                        rej(err);
                        break;
                }
            }
        });
    }
}

export default new Auth();
