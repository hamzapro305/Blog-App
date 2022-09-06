import LoginComp from "Components/LoginComp";
import SignUpComp from "Components/SignUpComp";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useState } from "react";

const Login = () => {
    const [State, setState] = useState(true);
    return (
            <motion.div {...TabAnimation} layout className="LoginPage">
                <Head>
                    <title>Login / Sign Up</title>
                </Head>
                <LayoutGroup id="Login-Page">
                        <div className="login-page-wrapper">
                            <div className="head">
                                <div className="title">
                                    {State ? "Login" : "Sign Up"}
                                </div>
                            </div>
                            <div className="Login-signup-wrapper">
                                <AnimatePresence exitBeforeEnter presenceAffectsLayout>
                                    {State === true ? 
                                        <LoginComp key="login" setState={setState} TabAnimation={TabAnimation} /> :
                                        <SignUpComp key="signup" setState={setState} TabAnimation={TabAnimation} />
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                </LayoutGroup>
            </motion.div>
    );
};

const TabAnimationVar = {
    hidden: {
        opacity: 0,
        height: "100%",
        transition: {
            duration: 0.3,
        },
    },
    show: {
        opacity: 1,
        height: "100%",
        transition: {
            duration: 0.3,
        },
    },
  };
  const TabAnimation = {
    variants: TabAnimationVar,
    initial: "hidden",
    animate: "show",
    exit: "hidden",
}
export default Login;
