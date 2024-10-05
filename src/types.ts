export interface UserAddress {
    state: string;
    city: string;
    ward: string;
    homeNumber: string;
}

export interface UserData {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    address: UserAddress;
}