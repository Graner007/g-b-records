import * as React from "react";

interface CartContextInterface {
    id: number;
    items: string[];
}

export const CartCtx = React.createContext<CartContextInterface[] | null>(null);

export const addItemToCartById = (id: number, item: string) => {
    sampleAppContext[id - 1].items.push(item);
}

const sampleAppContext: CartContextInterface[] = [ 
    {
        id: 1,
        items: []
    },
    {
        id: 2,
        items: []
    }
];

export const CartContextProvider = (props: any) => (
  <CartCtx.Provider value={sampleAppContext}>{props.children}</CartCtx.Provider>
);