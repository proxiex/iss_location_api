import mongoose from 'mongoose';

const { Schema } = mongoose;
const issHostorySchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  location: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    }
  },
  altitude: {
    type: String
  },
  datetime: {
    type: String
  },
  passes: [
    {
      risetime: String,
      duration: String,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const IssHistory = mongoose.model('IssHistory', issHostorySchema);

export default IssHistory;
