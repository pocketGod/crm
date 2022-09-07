export interface User{
    id?: string,
    email: string,
    password: string,
    phones?: [string],
    birthday?: Date
}