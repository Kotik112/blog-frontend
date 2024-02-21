import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import BlogPostForm from "./components/BlogPostForm.jsx";
import Home from "./components/Home.jsx";
import YourPosts from "./components/YourPosts.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Contact from "./components/Contact.jsx";


export default function App() {

    return (
        <Router>
            <>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/new-post" element={<BlogPostForm />}></Route>
                    <Route path="/your-posts" element={<YourPosts />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </>
        </Router>
    )
}
