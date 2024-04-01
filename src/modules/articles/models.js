const { UUIDSchemaType } = require("mongoose");
const mongoose = require("mongoose");

// Add UUID to Mongoose Schema types
// mongoose.Schema.Types.UUID = UUIDSchemaType;
// var myDate = new Date();
// new Date().setHours(myDate.getHours() + 7
const dataSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    slug: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    authors: {
      required: true,
      type: mongoose.Schema.Types.UUID,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default:  Date.now
    },
  },
  // { timestamps: true }
);
dataSchema.set("toJSON", { getters: true });
dataSchema.set("toObject", { getters: true });

module.exports = mongoose.model("Articles", dataSchema);
