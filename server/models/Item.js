import e from 'express';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  description: String,
  type: {
    type: String,
    enum: ['Personal', 'Work'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
const Item = mongoose.model('Item', itemSchema);
export default Item;