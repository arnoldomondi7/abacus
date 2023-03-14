import axios from 'axios'
import { api } from '../urlConfig'

//create the instance of axios.
const axiosInstance = axios.create({
	baseURL: api,
	// headers: {
	//     'Authorization': ``
	// }
})

export default axiosInstance
