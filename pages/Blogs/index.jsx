import { useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { PLACE_HOLDER } from "../../Assets";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, setBlog } from "../../Redux/Slices/BlogsSlice";
import PageTransitionLayout from "Components/GlobalComponents/PageTransitionLayout";

const Blogs = () => {
    const dispatch = useDispatch();
    const Blogs = useSelector((state) => state.Blogs.AllBlogs);
    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);
    const router = useRouter();
    const PushToBlog = (Blog) => {
        dispatch(setBlog(Blog));
        router.push(`/blog/${Blog.id}/selected`);
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
                                        whileTap={{scale: 0.9}}
                                        className="card"
                                        onClick={() => PushToBlog(b)}
                                        style={{
                                            backgroundImage: `url("${
                                                b.image
                                                    ? b.image
                                                    : PLACE_HOLDER.src
                                            }")`,
                                        }}
                                    >
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
            </div>
        </PageTransitionLayout>
    );
};
export default Blogs;
