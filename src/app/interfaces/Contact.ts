export interface Contact{
    name: string,
    email: string,
    birthday: Date,
    phones: string[],
    id?:string,
    employee?: boolean
}