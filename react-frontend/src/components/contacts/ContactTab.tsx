import ContactIcon from "../../assets/contact.svg";
import starIcon from "../../assets/star-icon.svg";
import { auth, database } from "../../firebase";
import { Contact, Gender } from "../../types/types";
import { ref, remove, update } from "firebase/database";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const ContactTab: React.FC<{ contact: Contact }> = ({ contact }) => {
    const [user] = useAuthState(auth);
    const handleClickContact = (id: string) => {
        let el = document.querySelector(".contacts__contact-dropdown.active");
        el?.classList.remove("active");
        if (el?.id === "dropdown-id-" + id) return;

        document.querySelector("#dropdown-id-" + id)?.classList.add("active");
    };

    const handleDeleteContact = (id: string) => {
        const approve = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!approve) return;
        remove(ref(database, "users/" + user?.uid + "/contacts/" + id));
    };

    const handleFavouriteContact = (id: string) => {
        update(ref(database, "users/" + user?.uid + "/contacts/" + id), {
            favourite: true,
        });
    };

    const handleRemoveFromFavourites = (id: string) => {
        update(ref(database, "users/" + user?.uid + "/contacts/" + id), {
            favourite: false,
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const event = e as MouseEvent;
            const { currentTarget: target } = e;

            if (target === null) return;

            const realTarget = target as HTMLElement;

            const rect = realTarget.getBoundingClientRect(),
                x = event.clientX - rect.left,
                y = event.clientY - rect.top;

            const border = realTarget.querySelector(
                "[id='" + realTarget.id + "']>.border"
            ) as HTMLElement;

            border.style.setProperty("--x", x + "px");
            border.style.setProperty("--y", y + "px");
        };

        let el = document.getElementById(contact.id);

        if (el === null) return;

        el.addEventListener("mousemove", (e) =>
            handleMouseMove(e as MouseEvent)
        );
    }, []);

    return (
        <div className="contacts__tab-wrapper">
            <div
                key={contact.id}
                className="contacts__contact-tab"
                id={contact.id}
            >
                <div
                    className="contacts__main-info"
                    onClick={() => handleClickContact(contact.id)}
                >
                    {contact.gender === Gender.FEMALE && (
                        <img
                            src={ContactIcon}
                            alt="female icon"
                            className="female-icon"
                        />
                    )}
                    {contact.gender === Gender.MALE && (
                        <img
                            src={ContactIcon}
                            alt="male icon"
                            className="male-icon"
                        />
                    )}
                    {contact.gender === Gender.OTHER && (
                        <img
                            src={ContactIcon}
                            alt="other icon"
                            className="other-icon"
                        />
                    )}
                    {contact.gender === undefined && (
                        <img
                            src={ContactIcon}
                            alt="other icon"
                            className="other-icon"
                        />
                    )}
                    <div>
                        <p>
                            {contact.name} {contact.surname}
                            {contact.favourite && (
                                <img src={starIcon} alt="star icon" />
                            )}
                        </p>
                    </div>
                </div>
                <div
                    className="contacts__contact-dropdown"
                    id={"dropdown-id-" + contact.id}
                >
                    <Link to={"/contacts/" + contact.id}>View info</Link>
                    <Link to={"/contacts/" + contact.id + "/edit"}>
                        Edit contact
                    </Link>
                    {contact.favourite ? (
                        <button
                            onClick={() =>
                                handleRemoveFromFavourites(contact.id)
                            }
                        >
                            Remove from favourites
                        </button>
                    ) : (
                        <button
                            onClick={() => handleFavouriteContact(contact.id)}
                        >
                            Add to favourites
                        </button>
                    )}
                    <button onClick={() => handleDeleteContact(contact.id)}>
                        Delete contact
                    </button>
                </div>
                <div className="border"></div>
            </div>
        </div>
    );
};

export default ContactTab;
