export default function Contact() {
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
            <p className="text-gray-600 text-center mb-6">
                We would love to hear from you! Please fill out the form below.
            </p>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}