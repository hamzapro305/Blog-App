import Footer from "Components/GlobalComponents/Footer";
import Header from "Components/GlobalComponents/Header";
import HSToast from "Components/HSToast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "Firebase/firebase";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "Redux/Slices/UserSlice";

const ExternalUtilities = ({ AllPages }) => {
    const { header, footer } = useSelector((state) => state.GlobalVariables);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            SET_USER(dispatch, setUser, currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="Main_Blog_App">
            {header && <Header />}
            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
                presenceAffectsLayout
            >
                {AllPages}
            </AnimatePresence>
            {footer && <Footer />}
            <HSToast />
        </div>
    );
};

const SET_USER = (dispatch, setUser, data) => {
    if (data) {
        dispatch(
            setUser({
                uid: data?.uid,
                email: data?.email,
                displayName: data?.displayName,
                createdAt: data?.createdAt,
                lastLoginAt: data?.lastLoginAt,
                photoURL: data?.photoURL,
                phoneNumber: data?.phoneNumber,
            })
        );
    } else {
        dispatch(setUser(null));
    }
};

export default ExternalUtilities;
