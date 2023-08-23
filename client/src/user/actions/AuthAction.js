import AuthApi from "../api/AuthApi"
import { setUser as setUserSlice } from "../slices/AuthSlice"

export const login = (formdata) => {
    return async (dispatch) => {

    }
}
export const getUser = (navigate) => {
    return async (dispatch) => {
        try {
            const { data } = await AuthApi.getUser()
            if (data.role.name == 'user') {
                localStorage.setItem("userLogged", 1)
            }
            else {
                localStorage.setItem("adminLogged", 1);
                localStorage.setItem("userLogged", 1)
            }
            dispatch(setUserSlice(data))
        } catch (error) {
            localStorage.setItem("adminLogged", 0);
            if (error.response.status == 409) {
                navigate("/email/notification")
            }
            localStorage.setItem("userLogged", 0)

        }

    }
}