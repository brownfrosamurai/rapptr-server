import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo {
    title: string;
    description: string;
    user: string;
    isDeleted: boolean;
}

export interface ITodoModel extends ITodo, Document {}

const TodoSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        isDeleted: { type: Boolean, defaults: false }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITodoModel>('Todo', TodoSchema);
