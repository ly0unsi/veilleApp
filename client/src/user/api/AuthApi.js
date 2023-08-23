
import axios from "."

export const AuthApi = {
    signin: (formdata) => axios.post('/login', formdata),
    signup: (formdata) => axios.post('/register', formdata),
    logout: () => axios.post('/logout'),
    csrf: () => axios.get('/sanctum/csrf-cookie'),
    getUser: () => axios.get('/api/user'),
    forget: (email) => axios.post('/forgot-password', { email }),
    reset: (formData) => axios.post('/reset-password', formData),
    sendEmailNotification: (id) => axios.post('/email/verification-notification/' + id),
    verifyEmail: (id) => axios.post(`/verify-email/${id}`)
}
export default AuthApi