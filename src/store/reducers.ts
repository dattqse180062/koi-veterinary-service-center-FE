import { SET_SERVICE, SET_DOCTOR, SET_SLOT } from './actions';

interface Doctor {
    user_id: number;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface Slot {
    year: number;
    month: number;
    day: number;
    slot_order: number;
}

interface State {
    service: any; // Add a type or interface for your service if you have one
    doctor: Doctor | null; // Add a type or interface for your doctor if you have one
    slot: Slot | null; // Add a slot property
}

const initialState: State = {
    service: null, // Initialize service as null
    doctor: null,  // Initialize doctor as null
    slot: null,    // Initialize slot as null
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
        case SET_SLOT:
            return {
                ...state,
                slot: action.payload.slot, // Save the slot object in state
            };
        default:
            return state;
    }
};
