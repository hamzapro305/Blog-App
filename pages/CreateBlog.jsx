import EditorComp from "Components/EditorComp";
import PageTransitionLayout from "Components/GlobalComponents/PageTransitionLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AuthProtectionFunction from "Utils/AuthProtectionFunction";
import { ErrorToast } from "../Components/HSToast";
import BlogApi from "../Utils/BlogApi";

const CreateBlog = () => {
    const [Blog, setBlog] = useState({
        title: "",
        content: "",
        Author: "",
        description: "",
        image: "",
        createdAt: "",
    });
    const Upload = async (setLoading, Blog, clear) => {
        if (Validate(Blog)) {
            return;
        }
        setLoading(true);
        const h = new Date();
        try {
            await BlogApi.UploadBlog({
                ...Blog,
                createdAt: h.getTime(),
            });
            console.log("Uploaded");
        } catch (error) {
            console.log("Error");
            console.log(error);
        }
        setBlog(initialBlog);
        setLoading(false);
        clear();
    };
    
    return AuthProtectionFunction(useEffect, useSelector, useRouter, 
        <PageTransitionLayout>
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="CreateBlog">
                <EditorComp Upload={Upload} context={{ Blog, setBlog }} />
            </div>
        </PageTransitionLayout>
        )
};

const Validate = (Blog) => {
    if (!Blog.title) {
        ErrorToast("Please Provide a Title");
        return true;
    }
    if (!Blog.content) {
        ErrorToast("Please Provide Content");
        return true;
    }
    if (!Blog.Author) {
        ErrorToast("Please Provide Author");
        return true;
    }
    if (!Blog.description) {
        ErrorToast("Please Provide a Description");
        return true;
    }
    if (!Blog.image) {
        ErrorToast("Please Provide an Image");
        return true;
    }
    return false;
};

const initialBlog = {
    title: "",
    content: "",
    Author: "",
    description: "",
    image: "",
};

export default CreateBlog
