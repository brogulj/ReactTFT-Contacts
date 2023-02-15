import "./Navbar.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const handleHamburgerClick = () => {
        const navLinks = document.querySelector(".nav__links");
        if (navLinks) {
            navLinks.classList.toggle("nav__links--active");
        }
    };

    useEffect(() => {
        for (const link of document.querySelectorAll(".nav__links a")) {
            link.addEventListener("mousemove", (e) => {
                const event = e as MouseEvent;
                const { currentTarget: target } = e;

                if (target === null) return;

                const realTarget = target as HTMLElement;

                const rect = realTarget.getBoundingClientRect(),
                    x = event.clientX - rect.left,
                    y = event.clientY - rect.top;

                const border = realTarget.querySelector(
                    "#" + realTarget.id + ">.border"
                ) as HTMLElement;

                border.style.setProperty("--x", x + "px");
                border.style.setProperty("--y", y + "px");
            });
        }
    }, []);

    return (
        <nav>
            <div className="nav__wrapper">
                <Link to={"/"}>React TFT</Link>
                <div
                    className="hamburger"
                    onClick={() => handleHamburgerClick()}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="nav__links" onClick={() => handleHamburgerClick()}>
                <Link to={"/"} id="home">
                    Home <div className="border"></div>
                </Link>
                <Link to={"/contacts"} id="contacts">
                    Contacts <div className="border"></div>
                </Link>
                <Link to={"/contacts/favourites"} id="favourites">
                    Favourites <div className="border"></div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
