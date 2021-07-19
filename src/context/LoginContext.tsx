import React, { useState, createContext } from "react";

type User = {
    loggedIn: boolean;
    email: string;
}

const defaultValue = {} as User;

type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;

const defaultUpdate: UpdateType = () => defaultValue;

export const LoginCtx = createContext({
  state: defaultValue,
  update: defaultUpdate,
});

function LoginProvider(props: React.PropsWithChildren<{}>) {
  const [state, update] = useState<User>(defaultValue);

  return <LoginCtx.Provider value={{ state, update }} {...props} />;
}

export default LoginProvider;