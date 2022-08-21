import { nanoid } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../Firebase/firebase";

class BlogApi {
    async UploadBlogImage(file) {
        return new Promise((res, rej) => {
            try {
                const storageRef = ref(
                    storage,
                    `files/BlogImages/${nanoid()}${file.name}`
                );
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // const progress = Math.round(
                        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // );
                    },
                    (error) => {
                        alert(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                res(downloadURL);
                            }
                        );
                    }
                );
            } catch (err) {
                rej(err);
            }
        });
    }
    async UploadBlog(Blog) {
        if (Blog.image) {
            let DURL = await this.UploadBlogImage(Blog.image);
            return await addDoc(collection(db, "Blogs"), {
                ...Blog,
                image: DURL,
            });
        } else {
            return await addDoc(collection(db, "Blogs"), Blog);
        }
    }
    async getAllBlogs() {
        return new Promise(async (res, rej) => {
            try {
                const AllBlogs = await getDocs(collection(db, "Blogs"));
                let resp = AllBlogs.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                res(resp);
            } catch (error) {
                rej(null);
            }
        });
    }
    async getBlog(id) {
        return new Promise(async (res, rej) => {
            const docRef = doc(db, "Blogs", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const Blog = docSnap.data();
                res({ ...Blog, id: id });
            } else {
                rej({});
            }
        });
    }

    async getLatestBlogs(lim) {
        const q = query(
            collection(db, "Blogs"),
            orderBy("createdAt"),
            limit(lim)
        );
        return (await getDocs(q)).docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    }
}

export default new BlogApi();
