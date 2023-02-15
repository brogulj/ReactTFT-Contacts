import "./contacts.scss";
import { auth, database } from "../../firebase";
import { Contact, Gender } from "../../types/types";
import PopUp from "../utility/PopUp";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddContact = () => {
    const [user, userLoading] = useAuthState(auth);
    const [alert, setAlert] = useState<string>("");
    const navigate = useNavigate();
    const [contact, setContact] = useState<Contact>({
        id: "",
        name: "",
        surname: "",
        favourite: false,
        email: "",
        phone: "",
        pager: "",
        landline: "",
        address: "",
        birthdate: "",
        gender: Gender.OTHER,
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (contact.name === "" || contact.surname === "") {
            setAlert("Please fill in all the required fields");
            return;
        }

        const id = uuidv4();

        set(ref(database, "users/" + user?.uid + "/contacts/" + id), {
            ...contact,
            id: id,
        }).then(() => {
            navigate("/contacts");
        });
    };

    return (
        <div className="contacts__form-wrapper">
            <h1>Add contact</h1>
            <form
                className="contacts__contact-form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <label htmlFor="name">Name*: </label>
                <input type="text" name="name" onChange={handleChange} />
                <label htmlFor="surname">Surname*: </label>
                <input type="text" name="surname" onChange={handleChange} />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={handleChange} />
                <label htmlFor="phone">Phone: </label>
                <input type="tel" name="phone" onChange={handleChange} />
                <label htmlFor="pager">Pager:</label>
                <input type="text" name="pager" onChange={handleChange} />
                <label htmlFor="lanline">Landline: </label>
                <input type="tel" name="landline" onChange={handleChange} />
                <label htmlFor="address">Address: </label>
                <input type="text" name="address" onChange={handleChange} />
                <label htmlFor="birthdate">Birthdate: </label>
                <input type="date" name="birthdate" onChange={handleChange} />
                <label htmlFor="gender">Gender:</label>
                <select name="gender" id="gender" onChange={handleChange}>
                    <option value="other">other</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <input type="submit" value={"Add"} />
                <Link to="/contacts">Go back</Link>
            </form>
            <PopUp message={alert} setMessage={setAlert}></PopUp>
            {!user && userLoading !== true && (
                <Navigate to={"/login"}></Navigate>
            )}
        </div>
    );
};

export default AddContact;
