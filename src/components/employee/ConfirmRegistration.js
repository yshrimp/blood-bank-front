import React, { useState } from "react";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";

import "../../assets/css/EmployeeLogin.css";

const userPool = new CognitoUserPool({
    UserPoolId: awsConfig.UserPoolId,
    ClientId: awsConfig.ClientId,
  });

const ConfirmRegistration = () => {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const confirmUser = () => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      alert("User confirmed successfully!");
      window.location.href = "/login/emp"
    });
  };

  return (
    <div>
      <h2>Confirm Registration</h2>
      <form>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          name="confirmationCode"
          type="text"
          placeholder="Confirmation Code"
          onChange={(e) => setConfirmationCode(e.target.value)}
          required
        />
        <button type="button" onClick={confirmUser}>Confirm</button>
      </form>
    </div>
  );
};

export default ConfirmRegistration;
