import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserByTokenQuery } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/slices/authSlice";
import ThemeProvider from "./ThemeProvider";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  //const { user, token } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserByTokenQuery();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser({ user: data?.data || null }));
    }
  }, [data, isLoading, dispatch]);

  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AuthProvider;
