import * as React from "react";

interface UserContextInterface {
    id: number;
    cardId: number;
    username: string;
    email: string;
    password: string;
    registeredDate: Date;
}

export const UserCtx = React.createContext<UserContextInterface[] | null>(null);

const sampleAppContext: UserContextInterface[] = [ 
    {
        id: 1,
        cardId: 1,
        username: "bobby.charlton",
        email: "bobby.charlton@gmail.com",
        password: "man_utd",
        registeredDate: new Date("2020-12-11")
    },
    {
        id: 2,
        cardId: 2,
        username: "ben.brown",
        email: "ben.brown@gmail.com",
        password: "barcelona",
        registeredDate: new Date("2019-05-29")
    }
];

export const UserContextProvider = (props: any) => (
  <UserCtx.Provider value={sampleAppContext}>{props.children}</UserCtx.Provider>
);