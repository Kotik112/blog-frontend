// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types';

export default function PageBar({ currentPage, totalPages, goToPage}) {

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    const handlePrevClick = () => {
        if(!isFirstPage) {
            goToPage(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (!isLastPage) {
            goToPage(currentPage + 1);
        }
    };

    return (
        <div className="fixed bottom-0 w-full bg-white dark:bg-gray-800 shadow-lg py-4 px-6">
            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> to
                    <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage + 10, totalPages)}</span> of
                    <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span> Pages
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button
                        className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800
                        rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                        dark:hover:bg-gray-700 dark:hover:text-white ${isFirstPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePrevClick}
                        disabled={isFirstPage}
                    >
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Prev
                    </button>
                    <button
                        onClick={handleNextClick}
                        className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800
                        border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700
                        dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${isLastPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLastPage}
                    >
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

PageBar.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    goToPage: PropTypes.func.isRequired,
};

