const userModels = require('../models/userModels');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerController = async(req,res) =>{
 try{
            const existingUser = await userModels.findOne({email:req.body.email})
            //validation
            if(existingUser)
            {
                return res.status(200).send({
                    success:false,
                    message:'User Already exists'
                })
            }
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            req.body.password=hashedPassword

            //rest data

            const user = new userModels(req.body)
            await user.save()
            return res.status(201).send({
                success: true,
                message:'User Registered Successfully',
                user,
            });
 }
    catch (error){
       console.log(error)
       res.status(500).send({
        success:false,
        message:'Error in Register API',
        error,
       });
    } 

};





//login callback
const loginController = async (req, res) => {
    try {
        const user = await userModels.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Role validation
        if (!isValidRoleForLogin(user.role)) {
            return res.status(403).json({ success: false, message: 'Role does not match for login' });
        }

        // Compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error in login API',
            error: error.message
        });
    }
};

//The above login controller is gpt codeS   

//GET CURRENT USER
const currentUserController =async (req,res) => {
    try{
                    const user =  await userModels.findOne({_id: req.body.userId});
                    return res.status(200).send({
                         success:true,
            message:'user fetched succesfully',
             user
                    })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'unable to get current user',
            error
        })
    }
};

// extra added ffrom the chat gpt:-
function isValidRoleForLogin(role) {
    // Define the roles that are allowed to login
    const allowedRolesForLogin = ['admin', 'organisation', 'donar', 'hospital'];
    return allowedRolesForLogin.includes(role);
}

//till here

module.exports = {registerController,loginController, currentUserController};