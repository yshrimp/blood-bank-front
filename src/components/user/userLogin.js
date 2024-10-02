
import React, { useState } from "react";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";  // aws-exports.js에서 설정 가져오기
import "../../assets/css/UserLogin.css";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,   // awsConfig에서 UserPoolId 가져옴
  ClientId: awsConfig.ClientId,       // awsConfig에서 ClientId 가져옴
});

const UserLogin = () => {
  const [userUserName, setuserUserName] = useState("");
  const [userPassword, setuserPassword] = useState("");

  const userLoginCheck = (e) => {
    e.preventDefault();

    const authenticationDetails = new AuthenticationDetails({
      Username: userUserName,
      Password: userPassword,
    });

    const userData = {
      Username: userUserName,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    // Cognito 로그인 요청
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Login success! Access Token:", result.getAccessToken().getJwtToken());
        alert("WELCOME!");
        window.location.href = "/login/usr/dash";  // 로그인 성공 후 대시보드로 이동
      },

      onFailure: (err) => {
        console.error("Login failed:", err);
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div className="user-login">
      <h2>USER LOGIN</h2>
      <form onSubmit={userLoginCheck}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={userUserName}
          onChange={(e) => setuserUserName(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setuserPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserLogin;

