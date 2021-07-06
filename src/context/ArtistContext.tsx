import * as React from "react";

interface ArtistContextInterface {
    id: number
    name: string;
}

export const ArtistCtx = React.createContext<ArtistContextInterface[] | null>(null);

const sampleAppContext: ArtistContextInterface[] = [
    {
        id: 1,
        name: "Elvis Presley"
    },
    {
        id: 2,
        name: "Beatles"
    },
    {
        id: 3,
        name: "Eminem"
    },
    {
        id: 4,
        name: "Metallica"
    },
    {
        id: 5,
        name: "Michael Jackson"
    },
];

export const ArtistContextProvider = (props: any) => (
  <ArtistCtx.Provider value={sampleAppContext}>{props.children}</ArtistCtx.Provider>
);