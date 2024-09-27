import React, { useState } from "react";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";  // aws-exports.js에서 설정 가져오기

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,   // awsConfig에서 UserPoolId 가져옴
  ClientId: awsConfig.ClientId,       // awsConfig에서 ClientId 가져옴
});

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [userUserName, setuserUsername] = useState("");  // 사용자 이름 입력받기

  const verifyEmail = (e) => {
    e.preventDefault();
    
    const userData = {
      Username: userUserName,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    // 확인 코드 제출
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error("Verification failed:", err);
        alert("Verification failed. Please check your code.");
        return;
      }
      console.log("Email verified successfully:", result);
      alert("Email verified! Redirecting to login page...");
      window.location.href = "/login/usr";  // 인증 성공 후 로그인 페이지로 이동
    });
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <form onSubmit={verifyEmail}>
        <input
          type="text"
          placeholder="Enter username"
          value={userUserName}
          onChange={(e) => setuserUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default EmailVerification;