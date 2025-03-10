import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmModal from "../../components/modal"; // Import the modal
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { blogList, setBlogList, pending, setPending, isEdit, setIsEdit, } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);

    async function fetchListOfBlogs() {
        setPending(true);
        try {
            const response = await axios.get("http://localhost:5000/api/blogs");
            setBlogList(response.data.blogList || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPending(false);
        }
    }
    const navigate = useNavigate();

    function handleEdit(getCurrentBlogItem) {
        console.log(getCurrentBlogItem);
        navigate("/addBlog", { state: { getCurrentBlogItem } });
    }

    function openDeleteModal(blogId) {
        setCurrentBlogId(blogId);
        setIsModalOpen(true);
    }

    async function handleDeleteBlog() {
        try {
            await axios.delete(`http://localhost:5000/api/blogs/delete/${currentBlogId}`);
            setIsModalOpen(false);
            await fetchListOfBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }

    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    return (
        <div className="p-6 bg-gray-100 shadow-md max-w-5xl mx-auto mt-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Blog List</h1>

            {pending ? (
                <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
            ) : (
                <div className="flex flex-col md:flex-row md:flex-wrap md:gap-4">
                    {blogList.length > 0 ? (
                        blogList.map((blogItem) => (
                            <div
                                key={blogItem._id}
                                className="bg-white p-4 rounded-md shadow-md mb-4 md:w-[48%] lg:w-[32%]"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">{blogItem.title}</h2>
                                <p className="text-gray-700">{blogItem.description}</p>
                                <div className="flex gap-2 mt-2">
                                    <FaEdit
                                        size={20}
                                        className="cursor-pointer text-gray-900 hover:text-gray-600"
                                        onClick={() => handleEdit(blogItem)}
                                    />
                                    <FaTrash
                                        size={20}
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        onClick={() => openDeleteModal(blogItem._id)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <h3 className="text-gray-700">No Blogs Added</h3>
                    )}
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteBlog}
            />
        </div>
    );
}
