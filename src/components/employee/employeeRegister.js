

import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";

import "../../assets/css/EmployeeRegister.css";

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



