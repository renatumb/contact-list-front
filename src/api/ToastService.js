import {toast} from "react-toastify"

const toastConfig = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    newestOnTop: true,
}

export function toastInfo(message) {
    toast.info(message, toastConfig)
}

export function toastSuccess(message) {
    toast.success(message, toastConfig)
}

export function toastWarning(message) {
    toast.warning(message, toastConfig)
}

export function toastError(message) {
    console.warn("inside toast error")
    toast.success(message, toastConfig)
}
