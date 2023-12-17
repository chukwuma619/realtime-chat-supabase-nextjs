"use client";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle, IoClose } from "react-icons/io5";
export default function Popover({ content, type }: { content: string, type: "success" | 'error' }) {
    const popoverRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        popoverRef.current?.setAttribute('popover', 'manual')
        popoverRef.current?.showPopover()
    }, []);



    return (
        <>
            <div ref={popoverRef} className={`p-4 rounded-md min-w-[24rem] ${type === "success" ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex">
                    <div className="shrink-0">
                        {type === "success" ?
                            <FaCheckCircle className="w-5 h-5 fill-green-400" /> :
                            <IoCloseCircle className="w-5 h-5 fill-red-400" />
                        }

                    </div>
                    <div className="ml-3">
                        <h3 className={`text-sm ${type === "success" ? 'text-green-600' : 'text-red-800'}`}>
                            {content}
                        </h3>
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-m-1.5">
                            <button
                                type="button"
                                onClick={() => { popoverRef.current?.hidePopover() }}
                                className={`p-1.5 rounded-md inline-flex  focus:outline-2 focus:ring-2 ${type==="success"? 'text-green-500 bg-green-50 hover:bg-green-100 focus:ring-green-600': 'text-red-500 bg-red-50 hover:bg-red-100 focus:ring-red-600'}`}
                            >
                                <span className="sr-only">Dismiss</span>
                                <IoClose />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
