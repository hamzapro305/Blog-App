import EditorComp from "Components/EditorComp";
import PageTransitionLayout from "Components/GlobalComponents/PageTransitionLayout";
import { useState } from "react";
import { ErrorToast } from "../Components/HSToast";
import BlogApi from "../Utils/BlogApi";

const CreateBlog = () => {
    const [Blog, setBlog] = useState({
        title: "",
        content: "",
        Author: "",
        description: "",
        image: "",
        createdAt: ""
    });
    const Validate = (Blog) => {
        if(!Blog.title){
            ErrorToast("Please Provide a Title")
            return true;
        }
        if(!Blog.content){
            ErrorToast("Please Provide Content")
            return true;
        }
        if(!Blog.Author){
            ErrorToast("Please Provide Author")
            return true;
        }
        if(!Blog.description){
            ErrorToast("Please Provide a Description")
            return true;
        }
        if(!Blog.image){
            ErrorToast("Please Provide an Image")
            return true;
        }
        return false;
    }
    const Upload = async (setLoading, Blog, clear) => {
        if(Validate(Blog)){
            return;
        }
        setLoading(true);
        const h = new Date()
        try {
            await BlogApi.UploadBlog({
                ...Blog,
                createdAt: h.getTime()
            });
            console.log("Uploaded");
        } catch (error) {
            console.log("Error");
            console.log(error);
        }
        setBlog({
            title: "",
            content: "",
            Author: "",
            description: "",
            image: "",
        });
        setLoading(false);
        clear()
    };
    return (
        <PageTransitionLayout>
            <div className="CreateBlog">
                <EditorComp Upload={Upload} context={{ Blog, setBlog }} />
            </div>
        </PageTransitionLayout>
    );
};

export default CreateBlog;
