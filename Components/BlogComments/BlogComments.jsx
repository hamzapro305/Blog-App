import { GlobalLightButton } from "Components/GlobalComponents/GlobalButtons";
import { ErrorToast } from "Components/HSToast";
import SingleBlogCommentActions from "Firebase/SingleBlogCommentActions";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import BlogComment from "./BlogComment";

const BlogComments = ({ id }) => {

  const Comments = useSelector(s => s.Blogs.Blog.Comments)
  const uid = useSelector(s => s.Auth?.User?.uid)
  const CurrentUser = useSelector((state) => state.Auth.User);

  const ButtonRef = useRef()

  const [Load, setLoad] = useState(false)
  const [Value, setValue] = useState("")

  const CommentsToRender = SingleBlogCommentActions.getAllChilds("", Comments)

  const Submit = async (setLoad, parent, Value, setValue) => {
    if(!CurrentUser){
      ErrorToast("Please Make An Account Before Commenting")
      return;
    }
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
    setValue('')
    setLoad(false)
  }
    
    return (
        <div className="BlogComments">
            <div className="head">
                <div className="title">Comments</div>
            </div>
            <div className="addComment">
              <input type="text" placeholder="Your Comment" value={Value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.code === "Enter" ? ButtonRef.current.click() : ""} />
              <GlobalLightButton REF={ButtonRef} isLoading={Load} Content="Add Comment" onClick={() => {Submit(setLoad, "", Value, setValue)}}/>
            </div>
            <LayoutGroup>  
              <motion.div layout className="AllComments">
                <AnimatePresence>
                {CommentsToRender.map(com => {
                  return <BlogComment key={com.id} Comment={com} />
                })}
                </AnimatePresence>

              </motion.div>
            </LayoutGroup>
        </div>
    );
};

export default BlogComments;
