import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import HSToast from "../Components/HSToast";
import { wrapper } from "../Redux/store";
import "../styles/style.scss";
import "react-toastify/dist/ReactToastify.css";
import Footer from "Components/GlobalComponents/Footer";
import Header from "Components/GlobalComponents/Header";
import { useEffect } from "react";
import BlogApi from "Utils/BlogApi";
import { setBlogs } from "Redux/Slices/BlogsSlice";

const MyApp = ({ Component, pageProps }) => <ExternalUtilities AllPages={<Component {...pageProps} />} />

const ExternalUtilities = ({ AllPages }) => {
  const { header, footer } = useSelector(state => state.GlobalVariables)
  const dispatch = useDispatch()
  useEffect(() => {
    const setLatestBlogs = async () => {
      dispatch(setBlogs(await BlogApi.getLatestBlogs(2)))
    }
    setLatestBlogs()
  }, [dispatch])
  
  return (
    <div className="Main_Blog_App">
      {header && <Header />}
      <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            {AllPages}
      </AnimatePresence>
      {footer && <Footer />}
      <HSToast />
    </div>
  );
};

export default wrapper.withRedux(MyApp);
