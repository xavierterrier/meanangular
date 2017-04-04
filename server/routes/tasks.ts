import { Router } from 'express';
import { MongoJs } from 'mongojs';
import { Tasks } from '../model/schema/task'
//var db = MongoJs('mongodb://localhost:27017/meanangular2');

const tasks:Router = Router();

/* GET users listing. */
tasks.get('/', function(req, res, next) {
   Tasks.find(function(err, tasks) {
        if (err) {
            res.send(err);
        }
        console.log(tasks);
        res.json(tasks);
    });
});

export default tasks;