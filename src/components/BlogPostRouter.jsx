import NavBar from "./NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import BlogPostForm from "./BlogPostForm.jsx";
import YourPosts from "./YourPosts.jsx";
import AboutUs from "./AboutUs.jsx";
import Contact from "./Contact.jsx";
import CommentForm from "./CommentForm.jsx";
import LoginForm from "./LoginForm.jsx";
import LogoutHandler from "./LogoutHandler.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

export default function BlogPostRouter() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* ✅ Protected routes */}
                <Route path="/new-post" element={
                    <RequireAuth>
                        <BlogPostForm />
                    </RequireAuth>
                } />
                <Route path="/your-posts" element={
                    <RequireAuth>
                        <YourPosts />
                    </RequireAuth>
                } />

                {/* ✅ Public routes */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact name="Arman Iqbal" role="Software Engineer II" />} />
                <Route path="/leave-comment" element={<CommentForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<LogoutHandler />} />
            </Routes>
        </>
    );
}