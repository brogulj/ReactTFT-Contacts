import "./contacts.scss";
import { auth, database } from "../../firebase";
import { Contact, Gender } from "../../types/types";
import PopUp from "../utility/PopUp";
import { get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    Link,
    Navigate,
    useNavigate,
    useParams
    } from "react-router-dom";

const EditContact = () => {
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
    const { id } = useParams();

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!user) return;

        const contactRef = ref(
            database,
            "users/" + user?.uid + "/contacts/" + id
        );

        get(contactRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setContact(snapshot.val() as Contact);
                    Object.entries(snapshot.val() as Contact).forEach(
                        (entry) => {
                            if (entry[0] === "id") return;
                            if (entry[0] === "favourite") return;
                            if (entry[0] === "gender") {
                                Array.from(
                                    (
                                        document.querySelector(
                                            `[name=${entry[0]}]`
                                        ) as HTMLSelectElement
                                    ).options
                                ).map((option) => {
                                    if (option.value === entry[1]) {
                                        option.selected = true;
                                    }
                                });
                            }

                            document
                                .querySelector(`[name=${entry[0]}]`)
                                ?.setAttribute(
                                    "value",
                                    snapshot.val()[entry[0]]
                                );
                        }
                    );
                } else {
                    setAlert("No data available");
                }
            })
            .catch((error) => {
                setAlert(error);
            });
    }, [user]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (contact.name === "" || contact.surname === "") {
            setAlert("Please fill in all the required fields");
            return;
        }

        update(ref(database, "users/" + user?.uid + "/contacts/" + id), {
            ...contact,
            id: id,
        }).then(() => {
            navigate("/contacts/");
        });
    };

    return (
        <div className="contacts__form-wrapper">
            <h1>Edit contact</h1>
            <form
                className="contacts__contact-form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <label htmlFor="name">Name*: </label>
                <input type="text" name="name" onChange={handleChange} />
                <label htmlFor="surname">Surname*: </label>
                <input type="text" name="surname" onChange={handleChange} />
                <label htmlFor="phone">Phone: </label>
                <input type="tel" name="phone" onChange={handleChange} />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={handleChange} />
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
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                </select>
                <input type="submit" value={"Save"} />
                <Link to={"/contacts"}>Go back to contacts</Link>
            </form>
            <PopUp message={alert} setMessage={setAlert}></PopUp>
            {!user && userLoading !== true && (
                <Navigate to={"/login"}></Navigate>
            )}
        </div>
    );
};

export default EditContact;
