export interface User {
    id: string; // Use string since the API returns ID as a string
    username: string; // Added username based on the response
    email: string;
    roles: string; // Changed roles to string since the response shows a single role
    lastname: string;
    firstname: string;
    address: string;
    phone: string;
}
