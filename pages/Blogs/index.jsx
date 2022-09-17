import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { PLACE_HOLDER } from "../../Assets";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "Redux/Slices/BlogsSlice";
import PageTransitionLayout from "Components/GlobalComponents/PageTransitionLayout";
import Image from "next/image";
import { setGlobalModal } from "Redux/Slices/GlobalVarialbesSlice";
import SelectedBlogModal from "Components/Modals/SelectedBlogModal";

const Blogs = () => {
    const [SelectedBlog, setSelectedBlog] = useState(null)
    const dispatch = useDispatch();
    const Blogs = useSelector((state) => state.Blogs.AllBlogs);
    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);
    const router = useRouter();
    const PushToBlog = (Blog) => {
        setSelectedBlog(Blog)
        dispatch(setGlobalModal(true))
    };
    return (
        <PageTransitionLayout>
            <div className="Blogs">
                <Head>
                    <title>All Blogs</title>
                </Head>
                <h2 className="title">All Blogs</h2>
                <div className="cards">
                    <div className="cards-wrapper">
                        {Blogs &&
                            Blogs.map((b) => {
                                return (
                                    <motion.div
                                        key={b.id}
                                        layoutId={b.id}
                                        layout
                                        className="card"
                                        onClick={() => PushToBlog(b)}
                                    >
                                        <Image alt="" placeholder={PLACE_HOLDER} src={b?.image ? b.image : PLACE_HOLDER} layout="fill" objectFit="cover" quality={100} />
                                        <div className="space-100"></div>
                                        <div className="content">
                                            <div className="title-card">
                                                Title: {b.title}
                                            </div>
                                            <div className="desc">
                                                Description:{" "}
                                                {b.description.length < 150
                                                    ? b.description
                                                    : b.description.slice(
                                                          0,
                                                          100
                                                      )}
                                            </div>
                                            <div className="author">
                                                Author: {b.Author}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                    </div>
                </div>
                <AnimatePresence>
                    {
                        SelectedBlog && <SelectedBlogModal SelectedBlog={SelectedBlog} setSelectedBlog={setSelectedBlog}/>
                    }
                </AnimatePresence>
            </div>
        </PageTransitionLayout>
    );
};

export default Blogs;
