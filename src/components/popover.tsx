'use client';
import { useEffect, useState, useRef } from 'react'

export function Popover({ trigger, content }: { trigger: () => {}, content: string }) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const popoverRef = useRef<HTMLDivElement | null>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            setIsVisible(false)
        }
    }

    const handleTogglePopover = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <>
            <div ref={popoverRef}>{content}</div>
        </>
    )
}