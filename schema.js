import mongoose, {Schema, model} from "mongoose";

const taskSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'in-progress'],
      default: 'pending',
    },
  }, {
    timestamps: true, 
  });
  
  const Task = mongoose.models.Task ||  mongoose.model('Task', taskSchema);

  export {Task};
  