import { User } from './user';

export class TeamObject {

    constructor(public project_id:Number, public members:User[]) {
    }

}
