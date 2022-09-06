import { motion } from "framer-motion";
import { GlobalMainButton } from "./GlobalComponents/GlobalButtons";
import { FcGoogle } from "react-icons/fc"
import AuthActions from "Firebase/AuthActions";
import { useRouter } from "next/router";

const LoginComp = ({ TabAnimation, setState }) => {
    const router = useRouter()
    const Google = async () => {
        try {
            await AuthActions.signInWithGoogle();
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <motion.div {...TabAnimation} className="Login">
            <div className="all-inputs">
                <div className="email input">
                    <p>Email</p>
                    <input type="email" name="" placeholder="Your Email"/>
                </div>
                <div className="pass input">
                    <p>Password</p>
                    <input type="password" name="" placeholder="Your Password"/>
                </div>
                <div className="remember">
                    <input type="checkbox" name=""/>
                    <p>Remember Me</p>
                </div>
                <GlobalMainButton Content="Login"/>
            </div>
            <div className="or">
                <hr />
                <p>OR</p>
            </div>
            <div className="providers">
                <button onClick={Google}><FcGoogle /></button>
            </div>
            <div className="swap">
                Need an account? <button onClick={() => setState(p => !p)}>Sign Up</button>
            </div>
        </motion.div>
    );
};

export default LoginComp;
