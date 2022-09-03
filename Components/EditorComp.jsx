import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
    FaBold,
    FaHeading,
    FaItalic,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaStrikethrough,
    FaUnderline,
    FaUndo,
} from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { useRef, useState } from "react";
import Image from "@tiptap/extension-image";
import Head from "next/head";
import {
    GlobalLightButton,
} from "./GlobalComponents/GlobalButtons";
import { useCallback } from "react";
import AddImageUrlModal from "./Modals/AddImageUrlModal";

const EditorComp = ({ context, Upload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const UploadImageRef = useRef();
    const editor = useEditor({
        extensions: [StarterKit, Underline, Image],
        content: "Your Content",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            context.setBlog((p) => ({ ...p, content: html }));
        },
    });
    return (
        <div className="CreateBlog-wrapper">
            <Head>
                <title>Create Your Blog</title>
            </Head>
            <div className="input">
                <input
                    type="text"
                    placeholder="Author"
                    value={context.Blog.Author}
                    onChange={(e) =>
                        context.setBlog((p) => ({
                            ...p,
                            Author: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Title"
                    value={context.Blog.title}
                    onChange={(e) =>
                        context.setBlog((p) => ({
                            ...p,
                            title: e.target.value,
                        }))
                    }
                />
            </div>
            <div className="input">
                <textarea
                    type="text"
                    placeholder="Description"
                    value={context.Blog.description}
                    onChange={(e) =>
                        context.setBlog((p) => ({
                            ...p,
                            description: e.target.value,
                        }))
                    }
                />
            </div>
            <div
                className="image"
                onClick={() => UploadImageRef.current.click()}
            >
                <input
                    type="file"
                    onChange={(e) =>
                        context.setBlog((p) => ({
                            ...p,
                            image: e.target.files[0],
                        }))
                    }
                    ref={UploadImageRef}
                />
                {context.Blog.image && (
                    <img src={URL.createObjectURL(context.Blog.image)} />
                )}
                {context.Blog.image ? "Upload Another Image" : "Upload Image"}
            </div>
            <div className="editor-wrapper">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
            </div>
            <GlobalLightButton
                isLoading={isLoading}
                Content="Upload"
                onClick={() =>
                    Upload(
                        setIsLoading,
                        context.Blog,
                        editor.commands.clearContent
                    )
                }
            />
        </div>
    );
};

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }
    const [AddModal, setAddModal] = useState(false);
    const addUrl = useCallback(
        (url) => {
            if (url) {editor.chain().focus().setImage({ src: url }).run(); }
        },
        [editor]
    );

    return (
        <div className="menuBar">
            {AddModal && <AddImageUrlModal setModal={setAddModal} callBack={addUrl} /> }
            <div className="menu-wrapper">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is_active" : ""}
                >
                    <FaBold />
                </button>
                <button
                    onClick={() => setAddModal((p) => !p)}
                >
                    <FiImage />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is_active" : ""}
                >
                    <FaItalic />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    className={editor.isActive("underline") ? "is_active" : ""}
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is_active" : ""}
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is_active"
                            : ""
                    }
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is_active"
                            : ""
                    }
                >
                    <FaHeading className="heading3" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is_active" : ""}
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is_active" : ""
                    }
                >
                    <FaListOl />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={editor.isActive("blockquote") ? "is_active" : ""}
                >
                    <FaQuoteLeft />
                </button>
                <button onClick={() => editor.chain().focus().undo().run()}>
                    <FaUndo />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

export default EditorComp;
