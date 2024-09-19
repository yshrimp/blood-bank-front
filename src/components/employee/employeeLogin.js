import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";

import "../../assets/css/EmployeeLogin.css";

// User Pool 정보
// const poolData = {
//   UserPoolId: "ap-northeast-2_OXUWvngTQ", // Cognito User Pool ID
//   ClientId: "4hkvc5ufmcecvllpnbunqn6jgi", // Cognito App Client ID
// };

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId: awsConfig.ClientId,
});

// const userPool = new CognitoUserPool(poolData);

const EmployeeLogin = () => {
  const [empUserName, setEmpUserName] = useState("");
  const [empPassword, setEmpPassword] = useState("");

  const empLoginCheck = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: empUserName,
      Password: empPassword,
    });

    const cognitoUser = new CognitoUser({
      Username: empUserName,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        alert("Welcome!");
        window.location = "/login/emp/dash";
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div className="emp-login">
      <h2>EMPLOYEE LOGIN</h2>
      <form>
        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => setEmpUserName(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setEmpPassword(e.target.value)}
          required
        />
        <button type="button" onClick={empLoginCheck}>Submit</button>
      </form>
    </div>
  );
};

export default EmployeeLogin;