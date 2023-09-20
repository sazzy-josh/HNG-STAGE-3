import {AuthContext} from "@/context/auth";
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";

const ProtectedRoute = ({children}) => {
  const {user, loading, setLoading, setUser} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;
