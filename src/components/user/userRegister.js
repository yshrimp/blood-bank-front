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
//       alert(response.data.message);
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
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports"; // AWS 설정 파일
import Axios from "axios"; // 서버로 추가 정보 전송
import "../../assets/css/UserRegister.css";

// Cognito User Pool 설정
const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId: awsConfig.ClientId,
});

const UserRegister = () => {
  const [userUserName, setUserUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPlace, setUserPlace] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userBloodGroup, setUserBloodGroup] = useState("");

  const submitUserRegister = () => {
    // Cognito에서 사용하는 속성 설정
    const attributeList = [
      {
        Name: "email",
        Value: userMail,
      },
      {
        Name: "phone_number",
        Value: userPhone,
      },
    ];

    // Cognito 사용자 등록
    userPool.signUp(userUserName, userPassword, attributeList, null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }

      console.log("Cognito User registered:", result);

      // 나머지 사용자 정보는 서버로 전송하여 데이터베이스에 저장
      const regurl = "http://localhost:3001/reg/usr";
      Axios.post(regurl, {
        userFName,
        userAge,
        userGender,
        userBloodGroup,
        userPhone,
        userMail,
        userPlace,
      })
        .then((response) => {
          alert("회원가입이 성공적으로 완료되었습니다!");
        })
        .catch((error) => {
          console.error("Error saving user info to DB:", error);
          alert("추가 정보 저장 중 오류가 발생했습니다.");
        });
    });
  };

  return (
    <div className="user-register">
      <h2>USER REGISTER</h2>
      <form>
        <input
          name="userFName"
          type="text"
          placeholder="Full Name"
          onChange={(e) => setUserFName(e.target.value)}
          required
        />
        <input
          name="userAge"
          type="text"
          placeholder="Age"
          onChange={(e) => setUserAge(e.target.value)}
          required
        />
        <input
          name="userGender"
          type="text"
          placeholder="Gender (M/F)"
          onChange={(e) => setUserGender(e.target.value)}
          required
        />
        <input
          name="userBloodGroup"
          type="text"
          placeholder="Blood Group"
          onChange={(e) => setUserBloodGroup(e.target.value)}
          required
        />
        <input
          name="emailId"
          type="email"
          placeholder="Email"
          onChange={(e) => setUserMail(e.target.value)}
          required
        />
        <input
          name="userPhone"
          type="tel"
          placeholder="Phone Number"
          onChange={(e) => setUserPhone(e.target.value)}
          required
        />
        <input
          name="userPlace"
          type="text"
          placeholder="Place"
          onChange={(e) => setUserPlace(e.target.value)}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUserUserName(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <button type="button" onClick={submitUserRegister}>REGISTER</button>
      </form>
    </div>
  );
};

export default UserRegister;