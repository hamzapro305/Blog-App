import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "./firebase";

class Auth {

    async signInWithGoogle() {
        return new Promise(async (res, rej) => {
            try {
                const googleProvider = new GoogleAuthProvider();
                const USER = await signInWithPopup(auth, googleProvider);
                const user = USER.user;
                const q = query(
                    collection(db, "users"),
                    where("id", "==", user.uid)
                );
                const docs = await getDocs(q);

                let upload = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };

                if (docs.docs.length === 0) {
                    res(false);
                } else {
                    res(true);
                }
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
                        rej(err.message);
                        break;
                }
            }
        });
    }
}

export default new Auth();
