import mongoose from "mongoose";
export const teamSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const TeamModel = new mongoose.model("team", teamSchema);
export default TeamModel;
