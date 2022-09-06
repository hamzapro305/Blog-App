import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "./firebase";

class SingleBlogCommentActions {
    submitComment(id, comment) {
        return new Promise(async (res, rej) => {
            try {
                const docRef = doc(db, "Blogs", id);
                const colRef = collection(docRef, "Comments");
                await addDoc(colRef, comment);
                res(true);
            } catch (error) {
                console.log(error);
                rej(false);
            }
        });
    }

    getAllChilds(id, Comments) {
        if (Comments) {
            const Filtered = Comments?.filter((x) => x.parent === id);
            return Filtered;
        } else {
            return [];
        }
    }

    DeleteComment(id, comment) {
        try {
            const CommentRef = doc(db, "Blogs", id, "Comments", comment.id)
            return deleteDoc(CommentRef)
        } catch (error) {
            console.log(error)
        }
    }

    DeleteComments(id, Comment, Comments){
       return new Promise(async (res, rej) => {
        try {
            const getInnerElements = (Comment, Comments) => {
                const innerComments = this.getAllChilds(Comment.id, Comments)
                let AllElements = [...innerComments]
                for(let i = 0; i < innerComments.length; i++){
                    AllElements = [...AllElements, ...getInnerElements(innerComments[i], Comments)]
                }
                return AllElements
            }
            const AllCommentsToDelete = [Comment, ...getInnerElements(Comment, Comments)]
            for(let i = 0; i < AllCommentsToDelete.length; i++){
                await this.DeleteComment(id, AllCommentsToDelete[i])
            }
            res(true)
           } catch (error) {
            console.log(error)
            rej(false)
           }
       })
    }

    async fetchComments(id, callBack) {
        try {
            const colRef = collection(doc(db, "Blogs", id), "Comments");
            const filterQuery = query(colRef, orderBy("createdAt", "asc"));

            const uns = onSnapshot(filterQuery, (docs) => {
                let data = [];
                docs.forEach((d) =>
                    data.push({
                        ...d.data(),
                        id: d.id,
                    })
                );
                callBack(data, uns);
            });
        } catch (error) {
            console.log(error);
            callBack([], null)
        }
    }
}

export default new SingleBlogCommentActions();
