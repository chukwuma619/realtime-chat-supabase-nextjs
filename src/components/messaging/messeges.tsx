import Messenger from "./messeger"
import Navbar from "./navbar"
export default function Messages(){
    return (
        <div className="flex flex-1 flex-col">
            <Navbar/>
            <Messenger />
        </div>

    )
}