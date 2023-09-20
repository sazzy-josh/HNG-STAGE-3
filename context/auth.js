import {createContext, useContext, useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {auth} from "@/libs/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //HANDLES SIGN UP
  const handleSignUp = (data) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password);
  };

  //HANDLES GOOGLE AUTHENTICATION
  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //HANDLES SIGN OUT
  const handleSignOut = () => {
    return signOut(auth);
  };

  //HANDLES SIGN IN
  const handleSignIn = (values) => {
    return signInWithEmailAndPassword(auth, values.email, values.password);
  };

  //   useEffect(() => {
  //     const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //       console.log(user);
  //     });
  //     return unsuscribe;
  //   }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        handleSignUp,
        handleSignIn,
        handleSignOut,
        GoogleLogin,
        setError,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
