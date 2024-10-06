'use server'


import {CustomHeaders} from "@/actions/helpers";
import {BASE_URL} from "@/actions/auth/auth";

export const registerUser = async (email: string, password: string) => {
    try {
        const requestOptions = await CustomHeaders({
            method: 'POST',
            body: JSON.stringify({email, password}),
            contentType: 'application/json',
            isSecurePath: false,
        });

        const res = await fetch(`${BASE_URL}/auth/sign-up`, {
            ...requestOptions,
            cache: 'no-store',
        });

        const data = await res.json();

        if (res.status === 401) {
            return {status: 401, message: data.message};
        }
        if (!res.ok) {
            return {success: false, message: data.message, status: res.status};
        }

        return {data, success: true};
    } catch (e: any) {
        return {success: false, message: e.message};
    }
}