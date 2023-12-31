'use client';

import Link from "next/link"
import { AuthSubmitButton } from "@/components/buttons"
import { useFormState } from "react-dom";
import { signUpNewUser } from "@/actions/auth";
import Popover from "@/components/popover";
import { ZodFormattedError, object } from "zod";
import { useEffect, useState } from "react";

export default function RegisterPage() {
    const [formState, formAction] = useFormState(signUpNewUser, undefined)
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                            Flowbite
                    </a> */}
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your Free Account
                            </h1>
                            <div>
                            </div>

                            <form className="space-y-4 md:space-y-6" action={formAction}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${typeof formState === "object" && formState?.email && 'border-red-300'}`} placeholder="name@company.com" />
                                    {typeof formState === "object" ? formState?.email && <p className="text-xs text-red-400 mt-2">{formState.email[0]}</p> : <p className="text-xs text-red-400 mt-2">{formState}</p>}

                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="username" id="username" autoComplete="username" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${typeof formState === "object" && formState?.username && 'border-red-300'}`} placeholder="username" />
                                    {typeof formState === "object" && formState?.username && <p className="text-xs text-red-400 mt-2">{formState.username[0]}</p>}

                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" autoComplete="new-password" name="password" id="password" placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${typeof formState === "object" && formState?.password && 'border-red-300'}`} />
                                    {typeof formState === "object" && formState?.password && <p className="text-xs text-red-400 mt-2">{formState.password[0]}</p>}
                                </div>
                                <AuthSubmitButton text="Create Account" />
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/auth/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}