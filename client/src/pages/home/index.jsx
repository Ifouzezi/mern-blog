import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";

export default function Home() {
    const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext);

    async function fetchListOfBlogs() {
        setPending(true);
        try {
            const response = await axios.get("http://localhost:5000/api/blogs");
            const result = response.data;

            if (result && result.blogList && result.blogList.length) {
                setBlogList(result.blogList);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPending(false);
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
                    {blogList.map((blogItem) => (
                        <div
                            key={blogItem._id}
                            className="bg-white p-4 rounded-md shadow-md mb-4 md:w-[48%] lg:w-[32%]"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">{blogItem.title}</h2>
                            <p className="text-gray-700">{blogItem.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
