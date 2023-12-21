import { FaPhone, FaVideo, FaEllipsisVertical } from "react-icons/fa6";

export default function MessagingButtons() {
    return (
        <div className="flex gap-x-2">
            <button title="phone call" className="p-[6px] hover:bg-blue-50 rounded">
                <FaPhone className="w-5 h-5 fill-blue-700" />
            </button>
            <button title="video call" className="p-[6px] hover:bg-blue-50 rounded">
                <FaVideo className="w-5 h-5 fill-blue-700" />
            </button>
            <button title="menu" className="p-[6px] hover:bg-blue-50 rounded">
                <FaEllipsisVertical className="w-5 h-5 fill-blue-700" />
            </button>
        </div>
    )
}