import * as React from "react";

enum Genre {
    ROCK_AND_ROLL = "Rock and Roll",
    POP = "Pop",
    HIP_HOP = "Hip Hop",
    METAL = "Metal",
    JAZZ = "Jazz"
} 

interface GenreContextInterface {
    id: number
    name: Genre;
}

export const GenreCtx = React.createContext<GenreContextInterface[] | null>(null);

const sampleAppContext: GenreContextInterface[] = [ 
    {
        id: 1,
        name: Genre.ROCK_AND_ROLL
    },
    {
        id: 2,
        name: Genre.POP
    },
    {
        id: 3,
        name: Genre.HIP_HOP
    },
    {
        id: 4,
        name: Genre.METAL
    },
    {
        id: 5,
        name: Genre.JAZZ
    },
];

export const GenreContextProvider = (props: any) => (
  <GenreCtx.Provider value={sampleAppContext}>{props.children}</GenreCtx.Provider>
);