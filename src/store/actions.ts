export const SET_SERVICE = 'SET_SERVICE';
export const SET_DOCTOR = 'SET_DOCTOR';

export const setService = (service: any) => ({
    type: SET_SERVICE,
    payload: { service }, // Include the service object in the payload
});

export const setDoctor = ( doctor: any) => ({
    type: SET_DOCTOR,
    payload: {doctor }, // Include the doctor object in the payload
});
