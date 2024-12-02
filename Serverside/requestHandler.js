import userSchema from './model/user.js'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import pkg from 'jsonwebtoken'
const {sign} =pkg

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
    user:"muhammadnashid905@gmail.com",
    pass:"kobm upne reiz mryv"
    },
  });


export async function login(req,res) {
    const {email,pass}=req.body
    if(!(email&&pass))
        return res.status(500).send({msg:"empty input"})

    const user= await userSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"not exist"})

    const success=await bcrypt.compare(pass,user.pass)

    if(success!=true)
        return res.status(500).send({msg:"Incorrect Password"})

    const token=await sign({UserID:user._id},process.env.jwt_key,{expiresIn:"24h"})
    res.status(200).send({token})
}

export async function getUser(req, res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const data=await postSchema.find()
    res.status(200).send({usr,data}); 
}

export async function getUserDetails(req,res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const post=await postSchema.find({id:req.user.UserID})
    res.status(200).send({usr,post}); 
}

export async function adduser(req,res) {
    const {profile,name,email,phone,pass,cpass}=req.body
    if(!(name&&email&&pass&&cpass))
        return res.status(500).send({msg:"empty input"})
    else if(pass!=cpass)
        return res.status(500).send({msg:"password missmatch"})

    bcrypt.hash(pass,10).then((hpwd)=>{
        // console.log(hpwd)
        console.log("data added");
        userSchema.create({profile,name,email,pass:hpwd}).then(()=>{
            res.status(201).send({msg:"Successfull"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        })  
    }).catch((error)=>{
        console.log(error)
    }) 
}
    export async function emailValidate(req,res) {
        const {email}=req.body
        const check = await userSchema.findOne({email})  
    const info = await transporter.sendMail({
    from:"muhammadnashid905@gmail.com" , 
    to: email, 
    subject: "Email",
    text: "verify", 
    html: `<b>Email-Validate is${
        `<div style="height: 200px; width: 400px; color: white; background-color: white; 
            margin-top: 100px; margin-left: 500px; box-shadow: 0 0 2px 2px white;">
    <h1 style="text-align: center; font-weight: bold; color: seagreen;">Email Verification</h1>
    <input type="text" placeholder="Enter email" style="border: 0; outline: 0; background-color: lightblue; 
            margin-top: 20px; margin-left: 70px; width: 250px; height: 30px; padding: 10px 10px;">
    <button style="border: 0; height: 30px; width: 120px; color: oldlace; background-color: darkcyan;
            margin-top: 20px; margin-left: 130px;">Verify</button>
    </div>`}</b>`, 
});
    res.status(200).send({msg:"This email validate Succesfully"})
      
}
export async function updatePass(req,res){
    const {pass,cpass,email}=req.body
    if(pass!=cpass)
        return res.status(500).send({msg:"password missmatch"})
    
    bcrypt.hash(pass,10).then((hpwd)=>{
        userSchema.updateOne({ email }, { $set: { pass: hpwd, otp: 0 } }).then(()=>{ 
            res.status(201).send({msg:"Password changed successfully"})
        }).catch((error)=>{
            res.status(404).send({error:error})
        })  
    }).catch((error)=>{
        console.log(error)
    }) 
}