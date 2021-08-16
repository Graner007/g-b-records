import styled from '@emotion/styled';
import { Card as card } from "antd";

type CardProps = {
    maxWidth: number;
}

export const Card = styled(card)<CardProps>(
    props => ({ maxWidth: props.maxWidth })
);