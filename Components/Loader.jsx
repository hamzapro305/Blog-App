import { LOADING_BUFFER } from "Assets";
import Head from "next/head";
import Image from "next/image";

const Loader = () => {
    return (
        <div
            className="Loader"
            style={{ position: "relative", width: "100%", height: "500px" }}
        >
            <Head>
                <title>Loading</title>
            </Head>
            <Image src={LOADING_BUFFER} objectFit="contain"  width={400} height={500} />
        </div>
    );
};

export default Loader;
