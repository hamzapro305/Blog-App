import { motion } from "framer-motion";

const PageTransitionLayout = ({ children }) => {
    const variants = {
        hidden: { opacity: 0, transition: { duration: 0.8 } },
        enter: { opacity: 1, transition: { duration: 0.8 } },
        exit: { opacity: 0, transition: { duration: 0.8 } },
    };
    return (
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            // transition={{ type: "linear" }}
            className="inner_app_transition_max_width_wrapper"
        >
            {children}
        </motion.main>
    );
};

export default PageTransitionLayout;
