import {Task} from './task';
import { User } from './user';

export class TaskObject {
    /*task_details:Task;
    members:User[];*/

    constructor(public task_details:Task, public members:User[]) {
    }

}
