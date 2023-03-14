import { authConstants } from '../actions/constants'

//create an initoal state
const initialState = {
	token: null,
}

//create the auth reducer.
export const authReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			state = {
				...state,
				...action.payload,
			}
			break

		default: {
			state = {
				state,
			}
		}
	}

	return state
}
