export interface User {
    id:number,
    email:string,
    password:string,
    first_name:string,
    last_name:string,
    assigned_rols?:Array<Rol>
}
export interface Rol {
    id:number,
    description:string
}