export interface SignUpRequest {
    username: string,
    password: string,
    name: Name,
    address: Address
}

export interface Name {
    firstName: string,
    lastName: string
}

export interface Address {
    firstAddressLine: string,
    secondAddressLine?: string,
    city: string,
    postalCode: string,
    province: string
}

export interface UserDbRow {
    username: string,
    password: string,
    name: Name,
    address: Address
}

export interface LoginRequest {
    username: string,
    password: string
}