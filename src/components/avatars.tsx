import Image from "next/image"
import { GoDotFill } from "react-icons/go"
import { FaCircleDot } from "react-icons/fa6";
type AvatarType = {
    type?: "Circle" | "Rounded",
    size?: "SM" | "Regular" | "MD" | "LG" | "XL",
    img_url: string,
    notification_dot?: boolean,
}

export function Avatar({ type = "Circle", size = "Regular", notification_dot = false, img_url }: AvatarType) {

    return (
        <div className="relative">
            <Image src={img_url} alt="profile image"
                priority
                width={`${size === "SM" ? 24 : size === "MD" ? 48 : size === "LG" ? 80 : size === "XL" ? 144 : 32}`}
                height={`${size === "SM" ? 24 : size === "MD" ? 48 : size === "LG" ? 80 : size === "XL" ? 144 : 32}`}
                className={`${type === "Circle" ? "rounded-full" : " rounded-[4px]"} relative`} />
            <div className={`bg-green-400 absolute rounded-full border-2 border-white ${size === "SM" ? "w-2.5 h-2.5" : size === "MD" ? "w-4 h-4" : size === "LG" ? "w-5 h-5" : size === "XL" ? "w-7 h-7" : "w-3 h-3"}
             border-white ${!notification_dot && "hidden"} ${type === "Circle" ? "-right-[3px] -top-[1px]" : " -right-1.5 -top-1.5 "} `} />

        </div>)
}