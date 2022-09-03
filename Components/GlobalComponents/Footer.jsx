import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Link from "next/link";



const Footer = () => {
  return (
    <motion.footer layout  {...FooterAnimation}  className="Footer">
      <div className="wrapper">
        <div className="head">
          <div className="logo">
            <Link href="/">
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                HS Blogs
              </motion.p>
            </Link>
          </div>
          <div className="icons">
            <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <BsFacebook color="#4267B2" />
            </motion.p>
            <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <AiFillTwitterCircle color="#00acee" />
            </motion.p>
            <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <RiInstagramFill color="#DD2A7B" />
            </motion.p>
            <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <AiFillLinkedin color="#0e76a8" />
            </motion.p>
          </div>
        </div>
        <div className="routes">
          {
            FooterRoutes.map((FR, i) => {
              return <div key={i} className="col">
              <div className="title" key={FR.title}>{FR.title}</div>
              <div className="links">
                  {FR.links.map(link => <motion.p key={link} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{link}</motion.p>)}
              </div>
            </div>
            })
          }
        </div>
      </div>
    </motion.footer>
  );
};

const FooterRoutes = [
  {
    title: "resources",
    links: [
      "Application",
      "Documentation",
      "Systems",
      "FAQs"
    ]
  },
  {
    title: "pricing",
    links: [
      "Overview",
      "premium plans",
      "affiliate program",
      "promotions"
    ]
  },
  {
    title: "company",
    links: [
      "About us",
      "Blog",
      "Partnerships",
      "Careers",
      "press"
    ]
  },
  {
    title: "social",
    links: [
      "Facebook",
      "twitter",
      "instagram",
      "linkedin"
    ]
  }
]

const FooterAnimationVariants = {
    hidden: { opacity: 0, transition: { duration: 0.8 } },
    enter: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.8 } }
}

const FooterAnimation = {
  variants: FooterAnimationVariants,
  initial: "hidden",
  animate: "enter",
  exit: "exit",
}

export default Footer;
