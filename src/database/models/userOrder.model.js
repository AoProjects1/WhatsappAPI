import { response } from "express";
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
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    responsed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export const userOrderModel = mongoose.model("userOrder", userOrderSchema);
