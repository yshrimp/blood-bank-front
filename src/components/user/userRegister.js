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
import { awsConfig } from "./aws-exports";  // aws-exports에서 사용자 풀 ID와 앱 클라이언트 ID 가져오기
import "../../assets/css/UserRegister.css";

const userPool = new CognitoUserPool({
    UserPoolId: awsConfig.UserPoolId,   // awsConfig에서 UserPoolId 가져옴
    ClientId: awsConfig.ClientId,       // awsConfig에서 ClientId 가져옴
});

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
                console.error('Sign-up error', err);
                alert('Sign-up failed.');
                return;
            }
            const cognitoUser = result.user;
            console.log('Cognito user registered:', cognitoUser.getUsername());

            // Sending additional info to backend
            Axios.post("/api/reg/usr", {
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
                alert("Sign-up successful! Please verify your email.");
                window.location.href = "/verify-email";  // 이메일 인증 페이지로 이동
            }).catch((error) => {
                console.error("Error saving additional info:", error);
                alert("Error saving additional info.");
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

