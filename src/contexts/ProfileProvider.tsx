"use client";

import { useContext, useReducer, useEffect, useState } from "react";
import { profileType, actionType } from "@/types/profileContext.types";
import { ProfileContext, ProfileDispatchContext } from "./ProfileContext";


const initialState = localStorage.getItem("profile");
const parsedProfile: profileType | null = initialState ? JSON.parse(initialState) : null;

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, dispatch] = useReducer(profileReducer, parsedProfile)

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(parsedProfile || profile));
    }, [profile]);

    return (
        <ProfileContext.Provider value={profile}>
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
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

