'use server'

import {CustomHeaders} from "@/actions/helpers";
import {BASE_URL} from "@/actions/auth/auth";
import {revalidatePath} from "next/cache";

interface CreateTasksByUser {
    title: string;
}

export const createTasksByUser = async ({
                                          title,
                                      }: CreateTasksByUser) => {
    try {
        const requestOptions = await CustomHeaders({
            method: 'POST',
            body: JSON.stringify({title}),
            contentType: 'application/json',
            isSecurePath: true,
        });


        const res = await fetch(`${BASE_URL}/tasks`, {
            ...requestOptions,
            cache: 'no-store',
        });


        if (res.status === 401) {
            return {status: 401, message: 'Unauthorized'};
        }

        if (!res.ok) {
            const data = await res.json();
            return {success: false, message: data.message || 'Something went wrong', status: res.status};
        }

        const data = await res.json();
        revalidatePath('/')
        return {data, success: true};

    } catch (e: any) {
        console.error('Error fetching tasks:', e);
        return {success: false, message: e.message || 'An error occurred'};
    }
}
