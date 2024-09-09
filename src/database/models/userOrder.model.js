import mongoose from "mongoose";

const userOrderSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export const userOrderModel = mongoose.model("userOrder", userOrderSchema);
