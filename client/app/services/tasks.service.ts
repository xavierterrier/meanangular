import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TaskService {
    constructor(private http:Http) {
        console.log("Task service initialize");
    }

    getTasks()  {
        return this.http.get('/api/tasks').map(res => res.json());
    }
}