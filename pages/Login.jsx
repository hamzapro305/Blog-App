import { GlobalMainButton } from "Components/GlobalComponents/GlobalButtons";
import AuthActions from "Firebase/AuthActions";
import Head from "next/head";
import { useState } from "react";

const Login = () => {
    const [Loading, setL] = useState({
        Google: false,
    });

    const setLoading = (query, val) => {
        setL({
            ...Loading,
            [query]: val,
        });
    };

    const Google = async () => {
        setLoading("Google", true);

        await AuthActions.signInWithGoogle();

        setLoading("Google", false);
    };
    return (
        <div className="Login">
            <Head>
                <title>Login / Sign Up</title>
            </Head>
            <GlobalMainButton
                Content="Sign in With Google"
                onClick={Google}
                isLoading={Loading.Google}
            />
        </div>
    );
};

export default Login;
