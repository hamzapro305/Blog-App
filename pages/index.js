import PageTransitionLayout from "Components/GlobalComponents/PageTransitionLayout";
import Spline from '@splinetool/react-spline';
import Head from "next/head";

const Home = () => {
    return (
        <PageTransitionLayout>
            <Head>
                <title>Blog App</title>
            </Head>
            <section className="main">
                <div className="leftPart"></div>
                <div className="rightPart">
                    <Spline scene="https://prod.spline.design/a9hDUpePWAmfPOjO/scene.splinecode" autoRender={true}  onLoad={() => {
                        console.log("loaded")
                    }} />
                </div>
            </section>
        </PageTransitionLayout>
    );
};

export default Home;