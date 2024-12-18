const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: String, required: true },
    haveAccepted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    score: { type: Number, default: 0 },
    totalTasks: { type: Number, required: true },
    completedTasks: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

ProjectSchema.pre("save", function (next) {
  if (this.totalTasks > 0) {
    this.score = Math.round((this.completedTasks / this.totalTasks) * 100);
  } else {
    this.score = 0; 
  }
  next();
});

module.exports = mongoose.model("Project", ProjectSchema);
