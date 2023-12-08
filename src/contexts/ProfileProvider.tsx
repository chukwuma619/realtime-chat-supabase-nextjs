"use client";

import { useContext, useReducer, useEffect } from "react";
import { profileType, actionType } from "@/types/profileContext.types";
import { ProfileContext, ProfileDispatchContext } from "./ProfileContext";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, dispatch] = useReducer(profileReducer, null)

    const initialState = localStorage.getItem("profile");
    const parsedProfile = initialState ? JSON.parse(initialState) : null;

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(profile));
    }, [profile]);
    return (
        <ProfileContext.Provider value={parsedProfile || profile}>
            <ProfileDispatchContext.Provider value={dispatch}>
                {children}
            </ProfileDispatchContext.Provider>
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    return useContext(ProfileContext)
}

export function useProfileDispatch() {
    return useContext(ProfileDispatchContext);
}

function profileReducer(state: profileType | null, action: actionType) {
    switch (action.type) {
        case 'update': {
            return action.profile
        }
        case 'remove': {
            return null
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

