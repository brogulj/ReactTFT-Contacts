import { auth } from "../../firebase";
import Loader from "../utility/Loader";
import PopUp from "../utility/PopUp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";

const LoginForm = () => {
    const [user, loading] = useAuthState(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)) {
            setAlert("Please enter a valid email address");
            return;
        }
        if (password === "") {
            setAlert("Please enter a password");
            return;
        }
        if (email === "") {
            setAlert("Please enter an email address");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                if (error.code === "auth/wrong-password") {
                    setAlert("Wrong password");
                } else if (error.code === "auth/user-not-found") {
                    setAlert("Wrong email address");
                }
            });
    };

    return (
        <>
            {loading && <Loader />}
            {!user && !loading && (
                <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Log in"
                        className="login__submit"
                    />
                    <p className="login__bottom-message">
                        Not yet a user?{" "}
                        <Link to={"/register"}>Register here</Link>
                    </p>
                </form>
            )}
            {alert !== "" && <PopUp message={alert} setMessage={setAlert} />}
            {user && <Navigate to={"/"} />}
        </>
    );
};

export default LoginForm;
