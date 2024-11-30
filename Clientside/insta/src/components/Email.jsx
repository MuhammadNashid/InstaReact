// import React, { useState } from "react";
// import axios from "axios";

// const Email= () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState(false);

//     const validateEmail = async () => {
//         try {
//             const response = await axios.post("http://localhost:4000/validate-email", { email });
//             setMessage(response.data.message);
//             setError(false);
//         } catch (err) {
//             setMessage(err.response?.data?.message || "Something went wrong.");
//             setError(true);
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h1>Email Validation</h1>
//             <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{ padding: "10px", marginBottom: "10px" }}
//             />
//             <button onClick={validateEmail} style={{ padding: "10px 20px" }}>
//                 Validate
//             </button>
//             {message && (
//                 <p style={{ color: error ? "red" : "green", marginTop: "10px" }}>
//                     {message}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default Email;