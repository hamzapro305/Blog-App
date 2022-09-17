import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setGlobalModal } from "Redux/Slices/GlobalVarialbesSlice";
import parse from "html-react-parser";

const SelectedBlogModal = ({ SelectedBlog, setSelectedBlog }) => {
    const dispatch = useDispatch()
    return (
        <motion.div
            layoutId={SelectedBlog.id}
            className="SelectedBlog"
            {...SelectedBlogAnimation}
        >
            <div className="wrapper">
                <div className="head">
                    <div className="author">{SelectedBlog.Author}</div>
                    <button
                        onClick={() => {
                            setSelectedBlog(null);
                            dispatch(setGlobalModal(false));
                        }}
                    >
                        close
                    </button>
                </div>
                <div className="selectedBlog-body">
                    <div className="title">{SelectedBlog.title}</div>
                    <div className="image">
                        <Image
                            src={SelectedBlog.image}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="content">{parse(SelectedBlog.content)}</div>
                </div>
            </div>
        </motion.div>
    );
};


const SelectedBlogVar = { 
  hidden: {
      transition: {
          duration: .05,
      }
  },
  show: {
      transition: {
          duration: .05,
      }
  }
}

const SelectedBlogAnimation = {
  variants: SelectedBlogVar,
  initial: "hidden",
  animate: "show",
  exit: "hidden"
}

export default SelectedBlogModal;
