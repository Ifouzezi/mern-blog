import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
            <h1 className="text-4xl font-bold">Mern Blog</h1>
            <nav>
                <ul className="flex space-x-6">
                    <Link to={"/"} className="text-gray-700 hover:text-gray-900">
                        <li>Home</li>
                    </Link>
                    <Link to={"/addBlog"} className="text-gray-700 hover:text-gray-900">
                        <li>Add Blog</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}
