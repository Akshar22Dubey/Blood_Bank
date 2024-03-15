const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //  role:{
    //     type:String,
    //     required:[true,"role is required"],
    //     enum:["admin","organisation","user","hospital"] //-->donar tha yaha user ke jagah
    // },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          //->donsr tha user ke jagah
          return true;
        }
        return false;
      },
    },

    orgnanisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },

    hospitalname: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donar", "hospital", "user"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      //unique:true
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
      // unique:true
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
