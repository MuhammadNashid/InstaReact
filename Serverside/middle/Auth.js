// import pkg from 'jsonwebtoken'
// const {verify}=pkg

// export default async function Auth(req,res,next) {
//     try{
//         const key=req.headers.authorization
//         if(!key)
//             return res.status(403).send("Unauthorized access")
//         const token=key.split(" ")[1]
//         console.log(token)
//         const auth=await verify(token,process.env.jwt_key)
//         console.log(auth)
//         req.user=auth
//         next()        
//     } catch(error){
//         res.status(500).send(error)
//     }
    
// }


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = [
    { email: 'user@example.com', password: '$2a$10$wS3x1QZftTAFOw.RXa7w2eJq6hhJ4YByjIbqf9Ckk4r2NQHL24rT6' } // password: 'password123'
];

export const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Find user in the database (in this case, we use a hardcoded array)
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password with stored hash
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    });
};
