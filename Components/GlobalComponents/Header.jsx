import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/router";
import { useState } from "react";
import { GlobalMainButton } from "./GlobalButtons";

const Navs = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Profile",
        path: "/Dashboard/Profile",
    },
    {
        name: "Edit Profile",
        path: "/Dashboard/EditProfile",
    },
    {
        name: "Blogs",
        path: "/Blogs",
    },
    {
        name: "Login",
        path: "/Login",
    },
    {
        name: "Contact",
        path: "/Contact",
    },
];

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    return (
        <div className="Header">
            <header>
                <div className="Desktop_Nav">
                    <motion.div
                        className="logo"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Link href="/">HS Blogs</Link>
                    </motion.div>
                    <nav>
                        <ul>
                            {Navs.map((R) => (
                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    key={R.name}
                                >
                                    <Link href={R.path}>{R.name}</Link>
                                    {router.pathname === R.path && (
                                        <motion.div
                                            className="underline"
                                            layoutId="link_underline"
                                        ></motion.div>
                                    )}
                                </motion.li>
                            ))}

                            <GlobalMainButton
                                children="New Blog"
                                onClick={() => router.push("/CreateBlog")}
                            />
                        </ul>
                        <div
                            onClick={() => setIsSidebarOpen((p) => !p)}
                            className="hamb"
                        >
                            <GiHamburgerMenu />
                        </div>
                    </nav>
                </div>
            </header>
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ width: 0 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            damping: 40,
                            stiffness: 500,
                        }}
                        className="Mobile_Nav"
                    >
                        <div className="innder-content">
                            <div className="head">
                                <div className="logo">Logo</div>
                                <div
                                    onClick={() => setIsSidebarOpen((p) => !p)}
                                    className="hamb"
                                >
                                    <ImCross />
                                </div>
                            </div>
                            <div className="content">
                                <nav>
                                    <ul>
                                        {Navs.map((R) => (
                                            <li key={R.name}>
                                                <Link href={R.path}>
                                                    <motion.p
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={() =>
                                                            setIsSidebarOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        {R.name}
                                                    </motion.p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
