import { Types } from '../actions/userActionTypes';


export const GoogleMapReducer = (state = {}, action) => {
    switch (action.type) {
      case Types.USER_ADDRESS_MAP_CONFIRM:
        return { address: action.payload };
      default:
        return state;
    }
  };