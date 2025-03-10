import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddNewBlog() {
    const { formData, setFormData, setIsEdit, isEdit } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.getCurrentBlogItem) {
            const { getCurrentBlogItem } = location.state;
            setIsEdit(true);
            setFormData({
                title: getCurrentBlogItem.title || "",
                description: getCurrentBlogItem.description || "",
            });
        } else {
            // If no data is passed, reset state to avoid carrying over edit state
            setIsEdit(false);
            setFormData({ title: "", description: "" });
        }
    }, [location.state]); // Depend only on location.state

    async function handleSaveBlogToDB() {
        try {
            const response = isEdit
                ? await axios.put(
                    `https://mern-blogga.vercel.app/api/blogs/update/${location.state?.getCurrentBlogItem?._id}`,
                    {
                        title: formData.title,
                        description: formData.description,
                    }
                )
                : await axios.post("https://mern-blogga.vercel.app/api/blogs/add", {
                    title: formData.title,
                    description: formData.description,
                });

            const result = response.data;
            if (result) {
                setIsEdit(false);
                setFormData({
                    title: "",
                    description: "",
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    }

    return (
        <div className="p-6 bg-gray-100 shadow-md max-w-lg mx-auto mt-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                {isEdit ? "Edit Blog" : "Add a Blog"}
            </h1>

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
                    {isEdit ? "Edit Blog" : "Add Blog"}
                </button>
            </div>
        </div>
    );
}
