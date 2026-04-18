const mongoose = require('mongoose')

const connectRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: `{VALUE} is incorrect status type`
    }
  }
}, {
  timestamps: true
})

connectRequestSchema.index({ _id: 1, toUserId: 1 ,status:1})


connectRequestSchema.pre("save", function () {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
 
});


const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectRequestSchema)

module.exports = ConnectionRequestModel