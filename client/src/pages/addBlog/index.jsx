import { useContext } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
export default function AddNewBlog() {

    const { formData, setFormData } = useContext(GlobalContext);

    console.log(formData);

    async function handleSaveBlogToDB() {}

    return (
        <div className="p-6 bg-gray-100 shadow-md max-w-lg mx-auto mt-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Add A Blog</h1>

            <div className="flex flex-col space-y-4">
                <input
                    name="title"
                    type="text"
                    placeholder="Please enter a title"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <textarea
                    name="description"
                    id="description"
                    placeholder="Please enter a description"
                    rows="5"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                    onClick={handleSaveBlogToDB}
                    className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition"
                >
                    Add New Blog
                </button>
            </div>
        </div>
    );
}
