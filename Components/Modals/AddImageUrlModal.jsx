import BackDrop from "Components/BackDrop";
import { GlobalMainButton } from "Components/GlobalComponents/GlobalButtons";
import { WarnToast } from "Components/HSToast";
import { useState } from "react";

const AddImageUrlModal = ({ setModal, callBack }) => {
    const [url, setUrl] = useState("");
    const onClick = () => {
        if (setModal) {
            setModal(false);
        }
    };
    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

    const Submit = () => {
        if (isImage(url)) {
            callBack(url);
            onClick();
        } else {
            WarnToast("Not a Valid Image");
        }
    };

    return (
        <BackDrop>
            <div className="AddImageUrlModal">
                <div className="wrap">
                    <div className="head">
                        <div className="title">Add Image Url</div>
                        <GlobalMainButton children="X" onClick={onClick} />
                    </div>
                    <div className="input">
                        <input
                            type="url"
                            placeholder="Your Image Url Here"
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <GlobalMainButton children="Submit" onClick={Submit} />
                </div>
            </div>
        </BackDrop>
    );
};

export default AddImageUrlModal;
