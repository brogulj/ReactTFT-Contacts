import ContactsPage from "./components/contacts";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import FavouriteContacts from "./components/contacts/FavouriteContacts";
import ViewContact from "./components/contacts/ViewContact";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Navbar from "./components/utility/Navbar";
import "./scss/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route
                        path="/contacts/add"
                        element={<AddContact />}
                    ></Route>
                    <Route
                        path="/contacts/:id/edit"
                        element={<EditContact />}
                    ></Route>
                    <Route
                        path="/contacts/:id"
                        element={<ViewContact />}
                    ></Route>
                    <Route
                        path="/contacts/favourites"
                        element={<FavouriteContacts />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
