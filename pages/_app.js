import { wrapper } from "../Redux/store";
import "../styles/style.scss";
import "react-toastify/dist/ReactToastify.css";
import NextNProgress from "nextjs-progressbar";
import ExternalUtilities from "Utils/ExternalUtilities";

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <NextNProgress
                color="#FFEA11"
                startPosition={0.1}
                stopDelayMs={0}
                height={4}
                showOnShallow={true}
                options={{
                    showSpinner: false,
                }}
            />
            <ExternalUtilities AllPages={<Component {...pageProps} />} />
        </>
    );
};

export default wrapper.withRedux(MyApp);
