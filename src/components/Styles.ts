import styled from '@emotion/styled';
import { Layout as layout } from "antd";
import { Content as content, Header as header, Footer as footer } from 'antd/lib/layout/layout';

type HeaderProps = {
    backgroundcolor?: string;
    textalign?: "center" | "left" | "right"; 
    padding?: string | number;
    margin?: string | number; 
}

export const Header = styled(header)<HeaderProps>(
    props => ({ backgroundColor: props.backgroundcolor || "#fff",
                textAlign: props.textalign || "left",
                padding: props.padding,
                margin: props.margin
    })
);

type LayoutProps = {
    padding?: string | number;
    backgroundcolor?: string;
}

export const Layout = styled(layout)<LayoutProps>(
    props => ({ padding: props.padding || "2% 15% 3% 15%",
                backgroundColor: props.backgroundcolor || "#fff" 
    })
);

type ContentProps = {
    padding?: string | number;
    margin?: string | number;
    backgroundcolor?: string;
    textalign?: "left" | "center" | "right";
}

export const Content = styled(content)<ContentProps>(
    props => ({ padding: props.padding,
                margin: props.margin,
                backgroundColor: props.backgroundcolor || "#fff",
                textAlign: props.textalign || "left"
    })
);

type HeadingProps = {
    fontsize?: number;
    bold: boolean;
    textalign?: "left" | "center" | "right";
}

export const H1 = styled.h1<HeadingProps>(
    {
        color: "black",
    },
    props => ({ fontSize: props.fontsize || 25,
                fontWeight: props.bold ? "bold" : "initial",
                textAlign: props.textalign
    })
);

type ParagraphProps = {
    fontsize: number;
    color?: string;
    textalign?: "left" | "center" | "right";
}

export const P = styled.p<ParagraphProps>(
    props => ({ fontSize: props.fontsize, 
                color: props.color,
                textAlign: props.textalign
    })
);

type FooterProps = {
    backgroundcolor: string;
    color: string;
    textalign: "left" | "center" | "right";
}

export const Footer = styled(footer)<FooterProps>(
    props => ({ backgroundColor: props.backgroundcolor,
                color: props.color,
                textAlign: props.textalign
    })
);