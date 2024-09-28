'use client'

//* ======= Libraries
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios, { type AxiosRequestConfig } from 'axios'
//* ======= Components and features
//* ======= Custom logic
//* ======= Assets and styles

/* =========================================
 * Axios instance config
 */

export const API_BASE_API_URL = "/api"

const axiosInstance = axios.create({
    // these are just basic configs, read axios docs, nothing special.
    baseURL: API_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

/* =========================================
 * Error class and types
 */

// Custom types I've defined to know what my errors are in the client when I'm actually calling the requests.

type ClientApiRequestErrorType =
    | 'REQUEST_SETUP'
    | 'ABORTED'
    | 'TIMED_OUT'
    | 'BAD_REQUEST'
    | 'UNAUTHORIZED'
    | 'SERVER_ERROR_5xx'
    | 'NO_RESPONSE_FROM_SERVER'

// Custom parameters I pass to myself when a request is giving errors.

type ClientApiRequestErrorParams = {
    type: ClientApiRequestErrorType
    statusCode: number
    message: string
}

// Another custom "Error" class object. This is the actual object that is thrown when a request fails.
// I add the previous custom types I've defined to this.

export class ClientApiRequestError extends Error {
    type: ClientApiRequestErrorType
    statusCode: number
    override message: string

    constructor({ type, statusCode, message }: ClientApiRequestErrorParams) {
        // I have no idea what this does!
        // Just asked AI or read it somewhere.
        super()

        this.name = 'ClientApiRequestError'
        this.type = type
        this.statusCode = statusCode
        this.message = message

        // This one too. That's just how it is, don't know why I have to use it.
        Object.setPrototypeOf(this, ClientApiRequestError.prototype)
    }
}

/* =========================================
 * API methods
 */

// The actual thing that we call in the client instead of "fetch" or "axios" itself.
// It accepts a type ("T") that is applied to the response.
// The arrows(?) are like function params for typescript, they mean you can pass types to be used later.

export function request<T>(config: AxiosRequestConfig) {
    return axiosInstance
        .request<T>({
            // withCredentials: true,
            ...config,
        })
        .then((response) => response)
        // This part, I'm just checking for different ways a request can fail (some ways are unique to axios like "canceled" error message)
        // and throwing my own custom error that we created top.
        .catch((error) => {
            // Axios returns a custom "CanceledError" when the request is aborted.
            if (error.code === 'ERR_CANCELED' || error.name === 'CanceledError' || error.message === 'canceled') {
                throw new ClientApiRequestError({
                    type: 'ABORTED',
                    statusCode: 0,
                    message: error.message,
                })
            } else {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx.

                    if (error.response.status === 401 || error.response.status === 403) {
                        throw new ClientApiRequestError({
                            type: 'UNAUTHORIZED',
                            statusCode: error.response.status,
                            message:
                                error.response.data.message ||
                                'You do not have sufficient access to the requested resource.',
                        })
                    } else {
                        throw new ClientApiRequestError({
                            type: error.response.status < 500 ? 'BAD_REQUEST' : 'SERVER_ERROR_5xx',
                            statusCode: error.response.status,
                            message:
                                error.response.data.message ||
                                "Server didn't specify a reason for failure (response.data.message is empty or undefined).",
                        })
                    }
                } else if (error.request) {
                    // The request was made but no response was received.
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js.

                    // Request has timed out
                    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
                        throw new ClientApiRequestError({
                            type: 'TIMED_OUT',
                            statusCode: 0,
                            message: 'Request timed out.',
                        })
                    }
                    throw new ClientApiRequestError({
                        type: 'NO_RESPONSE_FROM_SERVER',
                        statusCode: 0,
                        message: 'No response from server.',
                    })
                } else {
                    // Something happened in setting up the request that triggered an Error.

                    throw new ClientApiRequestError({
                        type: 'REQUEST_SETUP',
                        statusCode: 0,
                        message: error.message,
                    })
                }
            }
        })
}