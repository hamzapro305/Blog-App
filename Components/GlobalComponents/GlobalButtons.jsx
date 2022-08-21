import Image from "next/image";
import { BUTTON_BUFFER } from "../../Assets";
import { motion } from "framer-motion";

const GlobalMainButton = ({
    disabled,
    onClick,
    children,
    cssClass,
    isLoading,
}) => (
    <motion.button 
        whileTap={{scale: .9}}
        whileHover={{scale: 1.04}}
        disabled={disabled === true ? true : false}
        className={`GlobalMainButton ${cssClass ? cssClass : ""}`}
        onClick={() => {
            if (isLoading) return;
            onClick ? onClick() : ""
        }}
    >
        {isLoading ? <Image src={BUTTON_BUFFER} width="80" height="20" objectFit="cover" /> : children}
    </motion.button>
);

const GlobalDarkButton = ({ disabled, onClick, children, cssClass }) => (
    <motion.button
        whileTap={{scale: .9}}
        whileHover={{scale: 1.04}}
        disabled={disabled === true ? true : false}
        className={`GlobalDarkButton ${cssClass ? cssClass : ""}`}
        onClick={onClick}
    >
        {children}
    </motion.button>
);

const GlobalLightButton = ({ disabled, onClick, children, cssClass }) => (
    <motion.button
        whileTap={{scale: .9}}
        whileHover={{scale: 1.04}}
        disabled={disabled === true ? true : false}
        className={`GlobalLightButton ${cssClass ? cssClass : ""}`}
        onClick={onClick}
    >
        <p>{children}</p>
    </motion.button>
);

const GlobalCheckBox = ({ dependsOn, onClick, isLoading }) => (
    <div
        className="GlobalCheckBox"
        onClick={() => {
            if (isLoading) return;
            onClick();
        }}
        style={{
            justifyContent: dependsOn ? "flex-end" : "flex-start",
            cursor: isLoading ? "progress" : "pointer",
        }}
    >
        <div className={`ball ${dependsOn ? "on" : ""}`}></div>
    </div>
);

export {
    GlobalMainButton,
    GlobalDarkButton,
    GlobalLightButton,
    GlobalCheckBox,
};
