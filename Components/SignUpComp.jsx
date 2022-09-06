import { motion } from "framer-motion";
import { GlobalMainButton } from "./GlobalComponents/GlobalButtons";

const SignUpComp = ({ TabAnimation, setState }) => {
    return (
        <motion.div {...TabAnimation} className="SignUp">
            <div className="all-inputs">
                <div className="email input">
                    <p>Email</p>
                    <input type="email" name="" placeholder="Your Email"/>
                </div>
                <div className="pass input">
                    <p>Password</p>
                    <input type="password" name="" placeholder="Your Password"/>
                </div>
                <GlobalMainButton Content="Sign Up"/>
            </div>
            <div className="or">
                <hr />
                <p>OR</p>
            </div>
            <div className="swap">
                Already a user? <button onClick={() => setState(p => !p)}>Login</button>
            </div>
        </motion.div>
    );
};

export default SignUpComp;
