import mongoose from 'mongoose';

const { Schema } = mongoose;
const issViewHostorySchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    unique: true
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
  ]
});

const IssViewHostory = mongoose.model('IssViewHostory', issViewHostorySchema);

export default IssViewHostory;
