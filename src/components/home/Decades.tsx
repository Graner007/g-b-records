import { Component } from 'react';
import { Row, Col, Image, Layout } from "antd";
import { Link } from "react-router-dom";
import { ChildProps, graphql } from "@apollo/react-hoc";
import { gql } from '@apollo/client';

import { MediaModel } from "../interface/MediaModel";
import { Content, Header, H1 } from "../Styles";
import ErrorMessage from '../warning/ErrorMessage';
import Loading from '../warning/Loading';

const DECADE_QUERY = gql`
    query DecadeQuery {
        decade {   
            name
            linkUrl
        }
    }
`;

type Decade = {
    decade: MediaModel[];
}

const withDecadeImage = graphql<{}, Decade>(DECADE_QUERY);

class Decades extends Component<ChildProps<{}, Decade>, {}> {
    render() {
        const { loading, decade, error } = this.props.data!;

        return (
            <>
                {error && <ErrorMessage text={error.message} />}
                {loading && <Layout><Content textalign="center"><Loading size={35} /></Content></Layout>}
                {decade && 
                    <Layout style={{backgroundColor: "white"}}>
                        <Header textalign="center" margin={30}>
                            <H1 bold={true}>Shop by Decade</H1>
                        </Header>
                        <Content padding="0 200px 0 200px">
                            <Row gutter={16} justify="center">
                                {decade.map((d, index) => (
                                    <Col key={index} style={{padding: 8}} span={12}><Link to={d.linkUrl}><Image src={d.name} preview={false} className="shadow" /></Link></Col>
                                ))}
                            </Row>
                        </Content>
                    </Layout>
                }
            </>
        )
    }
}

export default withDecadeImage(Decades);