export interface User {
    id:number,
    email:string,
    password:string,
    first_name:string,
    last_name:string,
    assigned_rols?:Array<Rol>,
    assigned_tasks?:Array<Task>
}
export interface Rol {
    id:number,
    description:string
}
export interface Task {
    id: number,
    description: string,
    difficulty: string,
    time_estimated: number,
    time_dedicated?:number,
    assignment?:number,
    done?:boolean ,
    progress?:number
}

export interface UserRanking {
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    tasks_completed:number
}
export interface Ranking {
   ranking:Array<UserRanking>
}