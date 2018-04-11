import {Task} from './task';
import { User } from './user';

export class TaskObject {

    public project_id:Number;

    constructor(public task_details:Task, public members:User[], proj_id:Number) {
        this.project_id = proj_id;
    }
    
}
