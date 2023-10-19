import { FC, useState, createContext, useEffect } from "react";
import { IUser, TypeSetState } from "../../types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

interface IAuthContext {
  user: IUser | null;
  setUser: TypeSetState<IUser | null>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const authStatus = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user?.uid,
          name: user.displayName || "",
          email: user.email || "",
          avatar: user.photoURL || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      authStatus();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
