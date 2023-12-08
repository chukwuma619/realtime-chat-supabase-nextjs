"use client";

import { createContext, useContext, useReducer } from "react";
import { Dispatch, actionType, profileType } from "@/types/profileContext.types";

export const ProfileContext = createContext<profileType | null>(null);
export const ProfileDispatchContext = createContext<Dispatch<actionType>>(() => { });