export const SET_SERVICE = 'SET_SERVICE';
export const SET_DOCTOR = 'SET_DOCTOR';
export const SET_SLOT = 'SET_SLOT'; // New action type

export const setService = (service: any) => ({
    type: SET_SERVICE,
    payload: { service }, // Include the service object in the payload
});

export const setDoctor = (doctor: any) => ({
    type: SET_DOCTOR,
    payload: { doctor }, // Include the doctor object in the payload
});

// New action creator for setting the slot
export const setSlot = (slot: { year: number; month: number; day: number; slot_order: number }) => ({
    type: SET_SLOT,
    payload: { slot }, // Include the slot object in the payload
});
