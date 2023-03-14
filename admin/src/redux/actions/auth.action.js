import axios from '../../api/axios.api'
import { authConstants } from './constants'

//function to login the user.
export const login = user => {
	return async dispatch => {
		//dispatch actions.
		//request
		dispatch({
			type: authConstants.LOGIN_REQUEST,
		})
		//make the api call.
		const res = await axios.post(`/admin/signin`, {
			...user,
		})
		dispatch({
			type: authConstants.LOGIN_REQUEST,
			payload: {
				...user,
			},
		})
	}
}
