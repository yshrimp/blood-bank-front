
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

        // Cognito user sign up for username, password, email, phone_number, name, gender, and custom:age
        userPool.signUp(
            userUserName,
            userPassword,
            [
                { Name: 'email', Value: userMail },
                { Name: 'phone_number', Value: userPhone },       // 필수 속성으로 phone_number
                { Name: 'name', Value: userFName },               // 필수 속성으로 name
                { Name: 'gender', Value: userGender },            // 필수 속성으로 gender
                { Name: 'custom:age', Value: userAge },           // 사용자 지정 속성으로 age
            ],
            null,
            (err, result) => {
                if (err) {
                    console.error('Sign-up error', err);
                    alert('Sign-up failed.');
                    return;
                }
                const cognitoUser = result.user;
                const cognitoUserSub = result.userSub;  // Cognito에서 반환된 사용자 서브 ID
                console.log('Cognito user registered:', cognitoUser.getUsername());

                // Sending additional info to backend (remaining info not sent to Cognito)
                Axios.post("/api/reg/usr", {
                    userBloodGroup,
                    userPlace,
                    cognitoSub: cognitoUserSub  // cognitoSub 추가
                }).then((response) => {
                    console.log("Additional user info saved:", response);
                    alert("Sign-up successful! Please verify your email.");
                    window.location.href = "/verify-email";  // 이메일 인증 페이지로 이동
                }).catch((error) => {
                    console.error("Error saving additional info:", error);
                    alert("Error saving additional info.");
                });
            }
        );
    };

    return (
        <div className="user-register">  {/* 클래스 이름 추가 */}
            <h2 className="register-title">USER REGISTER</h2>
            <form className="userReg-form" onSubmit={handleRegister}>  {/* 클래스 이름 추가 */}
                <input type="text" value={userUserName} onChange={(e) => setuserUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={userPassword} onChange={(e) => setuserPassword(e.target.value)} placeholder="Password" required />
                <input type="email" value={userMail} onChange={(e) => setuserMail(e.target.value)} placeholder="Email" required />
                <input type="text" value={userFName} onChange={(e) => setuserFName(e.target.value)} placeholder="Full Name" required />
                <input type="text" value={userPhone} onChange={(e) => setuserPhone(e.target.value)} placeholder="Phone" required />
                <input type="text" value={userPlace} onChange={(e) => setuserPlace(e.target.value)} placeholder="Place" required />
                <input type="number" value={userAge} onChange={(e) => setuserAge(e.target.value)} placeholder="Age" required min="1" max="150" />
                <input type="text" value={userGender} onChange={(e) => setuserGender(e.target.value)} placeholder="Gender" required />
                <input type="text" value={userBloodGroup} onChange={(e) => setuserBloodGroup(e.target.value)} placeholder="Blood Group" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegister;



