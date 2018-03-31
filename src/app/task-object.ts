import {Task} from './task';
import { User } from './user';

export class TaskObject {

    constructor(public task_details:Task, public members:User[]) {
    }
    
}
