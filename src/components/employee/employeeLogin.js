/*import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";

import "../../assets/css/EmployeeLogin.css";


const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId: awsConfig.ClientId,
});


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
*/

import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";
import "../../assets/css/EmployeeLogin.css";

// User Pool 설정
const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId: awsConfig.ClientId,
});

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
        const groups = result.getAccessToken().payload["cognito:groups"];

        if (groups && groups.includes("Real")) {
          alert("Welcome!");
          window.location = "/login/emp/dash"; // 대시보드로 리다이렉트
        } else {
          alert("You do not have access to this page.");
          window.location = "/login/emp"; // 권한이 없을 경우 리다이렉트
        }
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

