import BlogApi from "../../Utils/BlogApi";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, setBlogComments } from "../../Redux/Slices/BlogsSlice";
import { useEffect } from "react";
import { PLACE_HOLDER } from "../../Assets";
import PageTransitionLayout from "Components/GlobalComponents/PageTransitionLayout";
import Head from "next/head";
import Image from "next/image";
import SingleBlogCommentActions from "Firebase/SingleBlogCommentActions";
import BlogComments from "Components/BlogComments/BlogComments";

const Blog = ({ FetchedBlog }) => {
    const dispatch = useDispatch();
    const Blog = useSelector((state) => state.Blogs.Blog);

    useEffect(() => {
        dispatch(setBlog(FetchedBlog));
        return () => {
            dispatch( setBlog({ title: "", description: "", Author: "", content: "", createdAt: 0, image: "", id: "", }) );
        };
    }, [dispatch, FetchedBlog]);

    useEffect(() => {
        let un;
        if (Blog?.id) {
            SingleBlogCommentActions.fetchComments(Blog?.id, (data, uns) => {
                un = uns;
                dispatch(setBlogComments(data));
            });
        }
        return () => {
            if (un) {
                un();
                dispatch(setBlogComments([]));
            }
        };
    }, [Blog?.id, dispatch]);

    return (
        <PageTransitionLayout>
            <div className="SingleBlog">
                <Head>
                    <title>{FetchedBlog.title}</title>
                    <meta name="description" content={FetchedBlog.description} />
                    <meta name="og:title" content={FetchedBlog.title} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://hsblogs.vercel.app/blog/${FetchedBlog.id}`} />
                    <meta name="og:image" content={ FetchedBlog.image ? FetchedBlog.image : PLACE_HOLDER.src } />
                </Head>

                <div className="page">
                    <div className="content" >
                        <h1>{Blog.title}</h1>
                        <div className="image">
                            <Image src={Blog.image ? Blog.image : PLACE_HOLDER} layout="fill" quality={100} objectFit="cover" alt="image" placeholder={PLACE_HOLDER} />
                        </div>
                        <p>{Blog.description}</p>
                        <div className="blog"> {parse(Blog.content ? Blog.content : "")} </div>
                    </div>
                    <BlogComments id={Blog?.id} />
                </div>

            </div>
        </PageTransitionLayout>
    );
};

export async function getServerSideProps(context) {
    const Blog = await BlogApi.getBlog(context.params.slug);

    const result = {
        title: Blog.title, description: Blog.description, image: Blog.image, content: Blog.content, Author: Blog.Author, id: Blog.id,
    };
    
    return {
        props: { FetchedBlog: result },
    };
}

export default Blog;
