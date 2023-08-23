import UserApi from "../api/userApi";
import { getDemandes as getDemandesSlice } from "../slices/UserSlice";

export const getDemandes = (page = null) => {
    return async (dispatch) => {
        console.log("page", page);
        const { data } = await UserApi.getDemandes(page)
        dispatch(getDemandesSlice(data))
    }
}