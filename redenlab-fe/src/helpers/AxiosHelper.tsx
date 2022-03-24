import axios from "axios";

export const SERVER_URL = 'http://localhost:8080'

function prependServerUrl(suffix: string) {
    return `${SERVER_URL}/${suffix}`
}

export function postOnServerWithForm(suffix: string, uploadProgressCallback: (progress: number) => void, data?: any)  {
    return axios.post(prependServerUrl(suffix), data, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        },
        onUploadProgress: function(progressEvent) {
            uploadProgressCallback(Math.round(( progressEvent.loaded / progressEvent.total ) * 100 ))
        }
    })
}

export function getOnServer(suffix: string) {
    return axios.get(prependServerUrl(suffix))
}