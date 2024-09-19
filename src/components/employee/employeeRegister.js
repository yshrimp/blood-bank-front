// import React, { useState } from "react";
// import Axios from "axios";

// import "../../assets/css/EmployeeRegister.css";

// const EmployeeRegister = () => {
//   const [empUserName, setempUsername] = useState("");
//   const [empPassword, setempPassword] = useState("");
//   const [empName, setempName] = useState("");
//   const [empMail, setempMail] = useState("");
//   const [empPhone, setempPhone] = useState("");
//   const [empAddress, setempAddress] = useState("");

//   const submitEmployeeRegister = () => {
//     //post-url
//     const regurl = "http://localhost:3001/reg/emp";
//     //post-req
//     Axios.post(regurl, {
//       empName: empName,
//       empMail: empMail,
//       empPhone: empPhone,
//       empAddress: empAddress,
//       empUserName: empUserName,
//       empPassword: empPassword,
//     }).then((response) => {
//       alert(response.data.message);
//     });
//   };

//   return (
//     <div className="emp-register">
//       <h2>EMP Register</h2>
//       <form className="empReg-form">
//         <input
//           name="empName"
//           type="text "
//           placeholder="Full Name"
//           onChange={(e) => {
//             setempName(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="emailId"
//           type="text"
//           placeholder="Email Address"
//           onChange={(e) => {
//             setempMail(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="empPhone"
//           type="number"
//           placeholder="Phone Number"
//           onChange={(e) => {
//             setempPhone(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="empAddress"
//           type="text "
//           placeholder="Address"
//           onChange={(e) => {
//             setempAddress(e.target.value);
//           }}
//           required
//         />
//         <input
//           name="username"
//           type="text"
//           placeholder="User Name"
//           onChange={(e) => {
//             setempUsername(e.target.value);
//           }}
//         />
//         <input
//           name="password"
//           type="text "
//           placeholder="Password"
//           onChange={(e) => {
//             setempPassword(e.target.value);
//           }}
//         />
//         <button onClick={submitEmployeeRegister}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeRegister;




import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";

import "../../assets/css/EmployeeRegister.css";

// User Pool 정보
// const poolData = {
//   UserPoolId: "ap-northeast-2_OXUWvngTQ", // Cognito User Pool ID
//   ClientId: "4hkvc5ufmcecvllpnbunqn6jgi", // Cognito App Client ID
// };

// const userPool = new CognitoUserPool(poolData);

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId, // Cognito User Pool ID
  ClientId: awsConfig.ClientId,     // Cognito App Client ID
});

const EmployeeRegister = () => {
  const [empUserName, setEmpUserName] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [empMail, setEmpMail] = useState("");

  const submitEmployeeRegister = () => {
    // Cognito에 사용자 등록
    userPool.signUp(empUserName, empPassword, [
      { Name: "email", Value: empMail },  // 이메일만 추가
    ], null, (err, data) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      // alert("User registered successfully!");
      // 백엔드로 추가 정보를 보낼 필요가 없으니 Axios 요청도 생략
      window.location.href = "/reg/emp/ConfirmRegistration";
    });
  };

  return (
    <div className="emp-register">
      <h2>EMP Register</h2>
      <form className="empReg-form">
        <input
          name="emailId"
          type="text"
          placeholder="Email Address"
          onChange={(e) => setEmpMail(e.target.value)}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="User Name"
          onChange={(e) => setEmpUserName(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setEmpPassword(e.target.value)}
        />
        <button type="button" onClick={submitEmployeeRegister}>Register</button>
      </form>
    </div>
  );
};

export default EmployeeRegister;



