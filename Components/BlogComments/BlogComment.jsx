import { PLACE_HOLDER } from "Assets";
import { GlobalLightButton } from "Components/GlobalComponents/GlobalButtons";
import { ErrorToast } from "Components/HSToast";
import AuthActions from "Firebase/AuthActions";
import SingleBlogCommentActions from "Firebase/SingleBlogCommentActions";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BlogComment = ({ Comment }) => {

    const Comments = useSelector(s => s.Blogs.Blog.Comments)
    const uid = useSelector(s => s.Auth?.User?.uid)
    const id = useSelector((state) => state.Blogs.Blog.id);
    const CurrentUser = useSelector((state) => state.Auth.User);

    const [isReplying, setIsReplying] = useState(false)
    const [Load, setLoad] = useState(false)
    const [DeleteLoad, setDeleteLoad] = useState(false)
    const [Value, setValue] = useState("")
    const [User, setUser] = useState(null)

    useEffect(() => {
        const getUser = async (callBack) => {
            const User = await AuthActions.getUserFromFireStore(Comment.uid)
            callBack(User)
        }
        getUser(setUser)
    }, [])
    

    const CommentToRender = SingleBlogCommentActions.getAllChilds(
        Comment.id,
        Comments
    );

    const canReply = () => {
        if(CurrentUser){
            setIsReplying(p => !p)
        }else{
            ErrorToast("Please Make An Account Before Commenting")
        }
    }
    
    const Delete = async () => {
        setDeleteLoad(true)
        console.log(
            await SingleBlogCommentActions.DeleteComments(id, Comment, Comments)
        )
        setDeleteLoad(false)
    }

    const Submit = async (setLoad, parent, Value, setValue) => {
        setLoad(true)
        const data = {
          parent: parent,
          body: Value,
          createdAt: (new Date()).getTime(),
          uid: uid ? uid : null,
        }
        try {
          await SingleBlogCommentActions.submitComment(id, data)
        } catch (error) {
          console.log(error)
        }
        setIsReplying(false)
        setValue('')
        setLoad(false)
    }
    
    return (
        <motion.div layout className="BlogComment">
            <div className="body">
                <div className="left">
                    <Image src={User ? User?.photoURL : PLACE_HOLDER} width={40} height={40} quality={50}/>
                </div>
                <div className="right">
                    <div className="name">{User?.displayName}</div>
                    <div className="msg">{Comment.body}</div>
                    <AnimatePresence exitBeforeEnter>
                    {isReplying ? 
                        <motion.div key="add" {...CommentAnimation} className="addComment">
                            <input type="text" placeholder="Your Comment" value={Value} onChange={(e) => setValue(e.target.value)}/>
                            <GlobalLightButton isLoading={Load} Content="Add Comment" onClick={() => {Submit(setLoad, Comment.id, Value, setValue)}} />
                            <GlobalLightButton onClick={canReply} Content="Cancel"/>
                        </motion.div> : 
                        <motion.div key="actions" {...CommentAnimation} className="actions">
                            <GlobalLightButton onClick={canReply} Content="Reply"/>
                            {uid === Comment.uid && <GlobalLightButton Content="Delete" onClick={Delete} isLoading={DeleteLoad}/>}
                        </motion.div>
                    }
                    </AnimatePresence>
                </div>
            </div>
            {CommentToRender?.length > 0 && (
                <div className="innerComments">
                    {CommentToRender.map(com => <BlogComment key={com.id} Comment={com} /> )}
                </div>
            )}
        </motion.div>
    );
};

const CommentAnimationVar = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
  };
  const CommentAnimation = {
    variants: CommentAnimationVar,
    initial: "hidden",
    animate: "show",
    exit: "hidden",
}

export default BlogComment;
