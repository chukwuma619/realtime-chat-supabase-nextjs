export default function FormArea() {
    return (
        <form action="" className="border border-gray-200 absolute bottom-0 left-0 w-available">
            <textarea title="message" name="message" placeholder="Write your message here..." id="message" autoFocus
                className="py-3 h-24 resize-none px-4 w-full border-b border-gray-200 focus-visible:outline-1 focus-visible:outline-blue-600" />
            <div className="flex py-3 px-4 justify-end">
                <button type="submit" className="py-2 px-3 inline-flex items-center bg-blue-700 rounded-lg text-sm text-white hover:bg-blue-800 focus-visible:outline-[3px] focus-visible:outline-blue-200 focus-visible:bg-blue-800">Send Message</button>
            </div>
        </form>
    )
}