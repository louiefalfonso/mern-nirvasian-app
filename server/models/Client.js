import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  role: { type: String },
  status: {
    type: String,
    enum: ["Temporary", "Active", "In Active"],
  },
});

export default mongoose.model("Client", ClientSchema)