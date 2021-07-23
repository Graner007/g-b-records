import styled from '@emotion/styled';
import { Layout as layout } from "antd";
import { Content as content, Header as header, Footer as footer } from 'antd/lib/layout/layout';

type HeaderProps = {
    backgroundColor?: string;
    textAlign?: "center" | "left" | "right"; 
    padding?: string | number;
    margin?: string | number; 
}

export const Header = styled(header)<HeaderProps>(
    props => ({ backgroundColor: props.backgroundColor || "#fff",
                textAlign: props.textAlign || "left",
                padding: props.padding,
                margin: props.margin
    })
);

type LayoutProps = {
    padding?: string | number;
    backgroundColor?: string;
}

export const Layout = styled(layout)<LayoutProps>(
    props => ({ padding: props.padding || "2% 15% 3% 15%",
                backgroundColor: props.backgroundColor || "#fff" 
    })
);

type ContentProps = {
    padding?: string | number;
    margin?: string | number;
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
}

export const Content = styled(content)<ContentProps>(
    props => ({ padding: props.padding,
                margin: props.margin,
                backgroundColor: props.backgroundColor || "#fff",
                textAlign: props.textAlign || "left"
    })
);

type HeadingProps = {
    fontSize?: number;
    bold: boolean;
}

export const H1 = styled.h1<HeadingProps>(
    {
        color: "black",
    },
    props => ({ fontSize: props.fontSize || 25,
                fontWeight: props.bold ? "bold" : "initial" 
    })
);

type ParagraphProps = {
    fontSize: number;
    color?: string;
}

export const P = styled.p<ParagraphProps>(
    props => ({ fontSize: props.fontSize, 
                color: props.color 
    })
);

type FooterProps = {
    backgroundColor: string;
    color: string;
    textAlign: "left" | "center" | "right";
}

export const Footer = styled(footer)<FooterProps>(
    props => ({ backgroundColor: props.backgroundColor,
                color: props.color,
                textAlign: props.textAlign
    })
);