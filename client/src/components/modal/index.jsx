import React from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
                <p className="text-gray-600 mt-2">Are you sure you want to delete this blog?</p>
                
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
