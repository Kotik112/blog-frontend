import React from 'react'
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
import {ROUTES} from "../constants/Routes.js";
import RegisterUserForm from "./RegisterUserForm.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import RequireAdmin from "./auth/RequireAdmin.jsx";
import AdminUsers from "./admin/AdminUsers.jsx";
import AdminPosts from "./admin/AdminPosts.jsx";
import AdminComments from "./admin/AdminComments.jsx";

export default function BlogPostRouter() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />

                {/* ✅ Protected routes */}
                <Route path={ROUTES.NEW_POST} element={
                    <RequireAuth>
                        <BlogPostForm />
                    </RequireAuth>
                } />
                <Route path={ROUTES.YOUR_POSTS} element={
                    <RequireAuth>
                        <YourPosts />
                    </RequireAuth>
                } />


                {/* 🔐 Admin section: guard + layout + nested pages */}
                <Route
                    path={ROUTES.ADMIN_PAGE}
                    element={<RequireAdmin><AdminLayout /></RequireAdmin>}
                >
                    <Route index element={<AdminUsers />} />
                    <Route path={ROUTES.ADMIN_USERS} element={<AdminUsers />} />
                    <Route path={ROUTES.ADMIN_POSTS} element={<AdminPosts />} />
                    <Route path={ROUTES.ADMIN_COMMENTS} element={<AdminComments />} />
                </Route>

                {/* ✅ Public routes */}
                <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
                <Route path={ROUTES.CONTACT} element={<Contact name="Arman Iqbal" role="Software Engineer II" />} />
                <Route path={ROUTES.LEAVE_COMMENT} element={<CommentForm />} />
                <Route path={ROUTES.LOGIN} element={<LoginForm />} />
                <Route path={ROUTES.LOGOUT} element={<LogoutHandler />} />
                <Route path={ROUTES.REGISTER} element={<RegisterUserForm />} />
            </Routes>
        </>
    );
}