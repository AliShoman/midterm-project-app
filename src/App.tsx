import React, { useState } from "react";
import AuthenticationRouter from "./components/router/AuthenticationRouter";
import SignIn from "./components/sign-in/SignIn";
import { AuthContext } from "./context/Context";
import { User } from "./models/User";

function App() {

  const initializeUser = () => {
    let cachedUserString = localStorage.getItem("e-commerce-user");
    console.log(cachedUserString);
    if (cachedUserString) {
      try {
        return JSON.parse(cachedUserString) as User;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };
  const [user, setUser] = useState(() => initializeUser() as User|null);

  const updateUserData = (newUserData: User) => {
    let mergedUserData: User;
    if (user) {
      mergedUserData = { ...user, ...newUserData };
    } else {
      mergedUserData = newUserData;
    }
    setUser(mergedUserData);
    localStorage.setItem("e-commerce-user", JSON.stringify(mergedUserData));
  };
  const signOut = ()=>{
    setUser(null);
    localStorage.setItem("e-commerce-user", '');
  }
  return (
    <AuthContext.Provider
      value={{
        user: user,
        updateUserData: updateUserData,
        signOut:signOut
      }}
    >
      <div className="App">
        <AuthenticationRouter/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
