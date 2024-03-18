const userModel = require("../models/userModels");
const inventoryModal = require("../models/inventoryModal");
// create inventory

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body; //->yaha pehle email tha donaEmail ki jagah
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if(inventoryType==="in" && user.role!='donor')
    // {
    //     throw new Error("NOT POSSIBLE")
    // }

    if (inventoryType === "out" && user.role != "hospital") {
      throw new Error("NOT POSSIBLE");
    }

    const inventory = new inventoryModal(req.body);
    await inventory.save();
    //  throw new Error("fctt");
   // console.log("Inventory saved successfully:", inventory);
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
      
    });
  } catch (error) {
    console.log(error);
    console.log("login data ", req.body.user);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModal
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all record successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventory API",
      error,
    });
  }
};
module.exports = { createInventoryController, getInventoryController };
