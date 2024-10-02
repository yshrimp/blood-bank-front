import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { awsConfig } from "./aws-exports";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId: awsConfig.ClientId,
});

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const cognitoUser = userPool.getCurrentUser();
      console.log("Cognito User:", cognitoUser);

      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err || !session.isValid()) {
	    console.error("Session error:", err); 	  
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }

          console.log("Session valid:", session.isValid()); // 세션 유효성 확인

          if (!session.isValid()) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }		
		
          // 토큰에서 그룹 정보 가져오기
          const groups = session.getAccessToken().payload["cognito:groups"];
          console.log("User groups:", groups);          
          // "Real" 그룹에 속한 사용자만 인증
          if (groups && groups.includes("Real")) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }

          setIsLoading(false);
        });
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  return isAuthenticated ? children : <Navigate to="/login/emp" />;
};

export default PrivateRoute;

