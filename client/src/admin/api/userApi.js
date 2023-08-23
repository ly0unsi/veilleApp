import axios from "../../user/api"

export const UserApi = {
    getDemandes: (page = null) => {
        if (!page) return axios.get('/api/user/demandes');
        else return axios.get(`/api/user/demandes?page=${page}`)
    },
    confirmUser: (id) => axios.put(`/api/user/demandes/confirm/${id}`),


}
export default UserApi