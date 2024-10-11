import { SET_SERVICE, SET_DOCTOR } from './actions';


interface Doctor {
    user_id: number;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface State {

    service: any; // Add a type or interface for your service if you have one
    doctor: Doctor  | null; // Add a type or interface for your doctor if you have one
}

const initialState: State = {

    service: null, // Initialize service as null
    doctor: null,  // Initialize doctor as null
};

export const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_SERVICE:
            return {
                ...state,

                service: action.payload.service, // Save the service object in state
            };
        case SET_DOCTOR:
            return {
                ...state,
                doctor: action.payload.doctor, // Save the doctor object in state
            };
        default:
            return state;
    }
};
