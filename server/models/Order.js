import mongoose from "mongoose";
const Client = "Client";

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Prepared", "Consigned", "Dispatched", "Shipped"],
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: Client },
});

export default mongoose.model("Order", OrderSchema);
