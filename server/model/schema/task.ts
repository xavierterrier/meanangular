import { Document, Schema, Model, model} from "mongoose";
import { ITask } from "../../../common/model/itask";

export interface ITaskModel extends ITask, Document {
 
}

export var TaskSchema: Schema = new Schema({
 createdAt: Date,
 description: String,
 isDone: Boolean,
});
TaskSchema.pre("save", next => {
 let now = new Date();
 if (!this.createdAt) {
 this.createdAt = now;
 }
 next();
});
// UserSchema.methods.fullName = function(): string {
//   return (this.firstName.trim() + " " + this.lastName.trim());
// };

export const Tasks: Model<ITaskModel> = model<ITaskModel>("tasks", TaskSchema);

