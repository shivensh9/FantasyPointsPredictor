import UserModel from "../models/User.js";
export const register = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(404).send({ message: "already exists" });
    }
    let userinfo = await UserModel.create({
      ...req.body,
      //profilePic: req.file?.name,
    });
    if (userinfo) res.status(201).end();
    else res.status(404).send({ message: "unable to register" });
  } catch (e) {
    res.status(404).send(e?.message);
  }
};
export const login = async (req, res) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) res.status(200).send({ id: user._id, role: user.role });
    else res.status(404).send({ message: "unable" });
  } catch (e) {
    res.status(404).send(e?.message);
  }
};
