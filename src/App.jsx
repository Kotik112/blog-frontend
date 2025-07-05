import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import BlogPostForm from "./components/BlogPostForm.jsx";
import Home from "./components/Home.jsx";
import YourPosts from "./components/YourPosts.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import CommentForm from "./components/CommentForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import {AuthProvider, useAuth} from "./components/AuthContext.jsx";
import LogoutHandler from "./components/LogoutHandler.jsx";


export default function App() {
    const { user } = useAuth();
    const encodedAuth = user ? btoa(`${user.username}:${user.password}`) : null;

    return (
        <AuthProvider>
            <Router>
                <>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home auth={encodedAuth} />}></Route>
                        <Route path="/new-post" element={<BlogPostForm auth={encodedAuth} />}></Route>
                        <Route path="/your-posts" element={<YourPosts />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact name="Arman Iqbal" role="Software Engineer II"}/>} />
                        <Route path="/leave-comment" element={<CommentForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/logout" element={<LogoutHandler />} />
                    </Routes>
                </>
            </Router>
        </ AuthProvider>
    )
}
