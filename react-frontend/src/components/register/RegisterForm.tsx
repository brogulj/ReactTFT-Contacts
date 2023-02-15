import { auth } from "../../firebase";
import PopUp from "../utility/PopUp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";

const RegisterForm = () => {
    const [user] = useAuthState(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [alert, setAlert] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)) {
            setAlert("Please enter a valid email address");
            return;
        }
        if (
            !RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ).test(password)
        ) {
            setAlert(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
            );
            return;
        }
        if (name === "") {
            setAlert("Please enter your name");
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
        if (repeatPassword === "") {
            setAlert("Please repeat your password");
            return;
        }
        if (password !== repeatPassword) {
            setAlert("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile({
                    displayName: name,
                });
            })
            .catch((error) => {
                setAlert(error.message);
            });
    };

    return (
        <>
            <form className="register__form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <label htmlFor="password">Repeat password:</label>
                <input
                    type="password"
                    id="repeat-password"
                    name="repeat-password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <input
                    type="submit"
                    value="Register"
                    className="register__submit"
                />
                <p className="register__bottom-message">
                    Already a user? <Link to={"/login"}>Log in here</Link>
                </p>
            </form>
            {user && <Navigate to={"/"} />}
            {alert !== "" && <PopUp message={alert} setMessage={setAlert} />}
        </>
    );
};

export default RegisterForm;
