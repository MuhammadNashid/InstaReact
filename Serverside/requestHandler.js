import userSchema from './model/user.js'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import pkg from 'jsonwebtoken'
const {sign} =pkg

const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port:2525 ,
    // secure: false,
    auth: {
    user:"muhammadnashid905@gmail.com@gmail.com",
    pass:"zudt nnnf bhlc qpoh"
    },
  });
  export async function adduser(req, res) {
    const { username, email, pwd, cpwd } = req.body
    const user = await userSchema.findOne({ email })
    if (!user) {
      if (!(username && email && pwd && cpwd))
        return res.status(500).send({ msg: "fields are empty" })
      if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" })
      bcrypt
        .hash(pwd, 10)
        .then((hpwd) => {
          userSchema.create({ username, email, pwd: hpwd })
          res.status(201).send({ msg: "Successfull" })
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      res.status(500).send({ msg: "email already used " })
    }
  }
  
  export async function login(req, res) {
    const { email, pwd } = req.body
    if (!(email && pwd))
      return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user) return res.status(500).send({ msg: "email do not exist" })
    const success = await bcrypt.compare(pwd, user.pwd)
    if (success !== true)
      return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.jwt_key, {expiresIn: "24h",})
    res.status(201).send({ token })
  }

  export async function emailv(req,res) {
    const {email}=req.body
    // console.log(email);
    if (!(email))  {
        return res.status(500).send({msg:"fields are empty"})
    }
    const user= await userSchema.findOne({email})        
    if (!(user)){
        const info = await transporter.sendMail({
            from: 'muhammadnashid905@gmail.com', // sender address
            to: email, // list of receivers
            subject: "email", // Subject line
            text: "VERIFY! your email", // plain text body
            html: `
            <div style="height: 200px; width: 200px; margin-left: 500px; margin-top: 250px;" >
        <div style="width: 400px; height: 150px; border:none; background-color: rgb(248, 247, 247); border-radius: 3px; box-shadow:0 0 2px 2px rgb(199, 197, 197); ">
            <h3 style="color: rgb(146, 57, 16); font-weight: bold; font-size: 25px; margin-top: 10px; margin-left: 110px;">Email Validation</h3>
            <input type="text" name="email" id="email" placeholder="enter email" style="width: 250px; height: 30px; margin-top: 40px; margin-left: 20px;">
             <a href="http://localhost:5173/reg">
            <button style="height:40px; width: 90px; color: white; background-color: seagreen; border: none; border-radius: 4px; font-weight: bold;">Verify</button>
            </a>
        </div>
    </div>
  `, 
})
console.log("Message sent: %s", info.messageId)
res.status(200).send({msg:"Verificaton email sented"})
}else{
return res.status(500).send({msg:"email exist"})
}
}

export async function Home(req, res) {
const usr=await userSchema.findOne({_id:req.user.UserID})
console.log(usr);

res.status(200).send({name:usr.username}); 
}

export async function getdt(req, res) {
    const usr = await userSchema.findOne({ _id: req.user.UserID })
    const data = await userDataSchema.findOne({ userId: req.user.UserID })
    if (!data) res.status(200).send({ usr })
    else {
      res.status(200).send({ usr, data })
    }
  }
  
  export async function adddt(req, res) {
      try {
        const { nickname, dob, note } = req.body
      await userDataSchema.create({userId:req.user.UserID,nickname,dob,note})
        res.status(200).send({ message: "Data added successfully!" })
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Failed to add data. Please try again." })
      }
  }
    
  export async function editdt(req, res) {
      try {
        const { nickname, dob, note } = req.body
        const updatedData = await userDataSchema.updateOne({ userId: req.user.UserID },{ $set: { nickname, dob, note } },)
        res.status(200).send({ message: "Data updated successfully!", data: updatedData })
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Failed to update data. Please try again." })
      }
  }  