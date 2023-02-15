import "./popUp.scss";
import { Dispatch, SetStateAction } from "react";

const PopUp: React.FC<{
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}> = ({ message, setMessage }) => {
    if (message === "") return null;

    return (
        <div className="pop-up">
            <div className="pop-up__container">
                <p>{message}</p>
                <button onClick={() => setMessage("")}>I understand</button>
            </div>
        </div>
    );
};

export default PopUp;
