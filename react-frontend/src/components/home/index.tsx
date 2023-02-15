import "./home.scss";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <>
            {!user && <Navigate to={"/login"} />}
            {user && (
                <div className="home">
                    <h1>Welcome {user.displayName}</h1>
                    <Link to="/contacts" className="button">
                        Contacts
                    </Link>

                    <button onClick={() => signOut(auth)} className="button">
                        Sign out
                    </button>
                </div>
            )}
        </>
    );
};

export default Home;
