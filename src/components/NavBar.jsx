// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from "react-router-dom";
import blogLogo from "../assets/blog-logo.svg"
import {useAuth} from "./auth/useAuth.jsx";
import {ROUTES} from "../constants/Routes.js";

export default function NavBar() {
    const { user } = useAuth();

    return (
        <nav className="bg-[#C0D6DF] border-gray-200 dark:bg-gray-900 sticky top-0 z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={ blogLogo } className="h-8" alt="Blog Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogify</span>
                </Link>
                { /* Hamburger menu if screen width not big enough  */ }
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    onClick={() => {
                        const menu = document.getElementById('navbar-default');
                        menu.classList.toggle('hidden');
                    }}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                <div className="w-full md:block md:w-auto hidden" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100
                        bg-[#C0D6DF] md:bg-[#C0D6DF] dark:bg-gray-800 md:dark:bg-gray-900
                    md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                            <Link to={ROUTES.HOME} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.NEW_POST}
                                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                  md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                                  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >New Post</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.YOUR_POSTS}
                                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent
                                  md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                                  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >Your Posts</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.ABOUT_US}
                                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
                                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white
                                md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white
                                md:dark:hover:bg-transparent"
                            >About Us</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.CONTACT} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
                        </li>
                        { // conditional rendering of a login / logout link
                            user ?
                            (<li>
                                <Link
                                    to={ROUTES.LOGOUT}
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >Logout</Link>
                            </li>) : (
                                <li>
                                    <Link
                                        to={ROUTES.LOGIN}
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >Login</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}