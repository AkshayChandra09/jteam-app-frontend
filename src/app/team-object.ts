import { User } from './user';

export class TeamObject {

    proj_id:Number;
    numberOfMembers:Number;
    project_name:string;
    
    constructor(public project_id:Number, public members:User[]) {
    }
}
