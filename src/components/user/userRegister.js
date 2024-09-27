// import React, { useState } from "react";
// import Axios from "axios";

// //css
// import "../../assets/css/UserRegister.css";

// const UserRegister = () => {
//   const [userUserName, setuserUsername] = useState("");
//   const [userPassword, setuserPassword] = useState("");
//   const [userFName, setuserFName] = useState("");
//   const [userMail, setuserMail] = useState("");
//   const [userPhone, setuserPhone] = useState("");
//   const [userPlace, setuserPlace] = useState("");
//   const [userAge, setuserAge] = useState("");
//   const [userGender, setuserGender] = useState("");
//   const [userBloodGroup, setuserBloodGroup] = useState("");

//   const submituserRegister = () => {
//     const regurl = "/api/reg/usr";
//     Axios.post(regurl, {
//       userFName: userFName,
//       userAge: userAge,
//       userGender: userGender,
//       userBloodGroup: userBloodGroup,
//       userPhone: userPhone,
//       userMail: userMail,
//       userPlace: userPlace,
//       userUserName: userUserName,
//       userPassword: userPassword,
//     }).then((response) => {
//       if (response.data.message) {
//         alert(response.data.message);
//       } else {
//         alert("WELCOME!");
//         window.location = "/login/usr";
//       }
//     });
//   };

//   return (
//     <div className="user-register">
//       <h2>DONAR REGISTER</h2>
//       <form className="userReg-form">
//         <input
//           name="userFName"
//           type="text "
//           placeholder="Full Name"
//           onChange={(e) => {
//             setuserFName(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="userAge"
//           type="text "
//           placeholder="Age"
//           onChange={(e) => {
//             setuserAge(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="userGender"
//           type="text "
//           placeholder="Gender(M/F)"
//           onChange={(e) => {
//             setuserGender(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="userBloodGroup"
//           type="text "
//           placeholder="Blood Group"
//           onChange={(e) => {
//             setuserBloodGroup(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="emailId"
//           type="text"
//           placeholder="Email Place"
//           onChange={(e) => {
//             setuserMail(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="userPhone"
//           type="number"
//           placeholder="Phone Number"
//           onChange={(e) => {
//             setuserPhone(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="userPlace"
//           type="text "
//           placeholder="Place"
//           onChange={(e) => {
//             setuserPlace(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="username"
//           type="text "
//           placeholder="User Name"
//           onChange={(e) => {
//             setuserUsername(e.target.value);
//           }}
//         />
//         <input
//           name="password"
//           type="text "
//           placeholder="Password"
//           onChange={(e) => {
//             setuserPassword(e.target.value);
//           }}
//         />
//         <button onClick={submituserRegister}>REGISTER</button>
//       </form>
//     </div>
//   );
// };

// export default UserRegister;

import React, { useState } from "react";
import Axios from "axios";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import "../../assets/css/UserRegister.css";

const poolData = {
    UserPoolId: "ap-northeast-2_7bboiuKj8",  // 여기에 실제 Cognito User Pool ID를 입력하세요.
    ClientId: "44iffcffofdp3vssoff8o0vndg",    // 여기에 실제 Cognito App Client ID를 입력하세요.
};

const userPool = new CognitoUserPool(poolData);

const UserRegister = () => {
    const [userUserName, setuserUsername] = useState("");
    const [userPassword, setuserPassword] = useState("");
    const [userFName, setuserFName] = useState("");
    const [userMail, setuserMail] = useState("");
    const [userPhone, setuserPhone] = useState("");
    const [userPlace, setuserPlace] = useState("");
    const [userAge, setuserAge] = useState("");
    const [userGender, setuserGender] = useState("");
    const [userBloodGroup, setuserBloodGroup] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // Cognito user sign up for username, password, email
        userPool.signUp(userUserName, userPassword, [{ Name: 'email', Value: userMail }], null, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            const cognitoUser = result.user;
            console.log('Cognito user registered:', cognitoUser.getUsername());

            // Sending additional info to backend
            Axios.post("/api/user/additional-info", {
                userUserName,
                userFName,
                userAge,
                userGender,
                userBloodGroup,
                userPhone,
                userMail,
                userPlace,
            }).then((response) => {
                console.log("Additional user info saved:", response);
            }).catch((error) => {
                console.error("Error saving additional info:", error);
            });
        });
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                {/* Add form inputs for user registration */}
                <input type="text" value={userUserName} onChange={(e) => setuserUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={userPassword} onChange={(e) => setuserPassword(e.target.value)} placeholder="Password" required />
                <input type="email" value={userMail} onChange={(e) => setuserMail(e.target.value)} placeholder="Email" required />
                <input type="text" value={userFName} onChange={(e) => setuserFName(e.target.value)} placeholder="Full Name" required />
                <input type="text" value={userPhone} onChange={(e) => setuserPhone(e.target.value)} placeholder="Phone" required />
                <input type="text" value={userPlace} onChange={(e) => setuserPlace(e.target.value)} placeholder="Place" required />
                <input type="number" value={userAge} onChange={(e) => setuserAge(e.target.value)} placeholder="Age" required />
                <input type="text" value={userGender} onChange={(e) => setuserGender(e.target.value)} placeholder="Gender" required />
                <input type="text" value={userBloodGroup} onChange={(e) => setuserBloodGroup(e.target.value)} placeholder="Blood Group" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegister;
