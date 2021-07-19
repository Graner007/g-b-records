import styled from '@emotion/styled';
import { Layout as layout } from "antd";
import { Content as content, Header as header, Footer as footer } from 'antd/lib/layout/layout';

type HeaderProps = {
    backgroundColor?: string;
    textAlign?: "center" | "left" | "right"; 
    padding?: string | number; 
}

export const Header = styled(header)<HeaderProps>(
    props => ({ backgroundColor: props.backgroundColor || "#fff",
                textAlign: props.textAlign || "left",
                padding: props.padding
    })
);

type LayoutProps = {
    padding?: string | number;
    backgroundColor?: string;
}

export const Layout = styled(layout)<LayoutProps>(
    props => ({ padding: props.padding,
                backgroundColor: props.backgroundColor || "#fff" 
    })
);

type ContentProps = {
    padding?: string | number;
    backgroundColor?: string;
}

export const Content = styled(content)<ContentProps>(
    props => ({ padding: props.padding,
                backgroundColor: props.backgroundColor || "#fff"
    })
);

export const H1 = styled.h1(
    {
        fontSize: 25,
        color: "black",
        fontWeight: "bold"
    }
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