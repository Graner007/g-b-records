import React, { Component } from 'react';
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

        console.log(decade);

        return (
            <>
                {error && <ErrorMessage text={error.message} />}
                {loading && <Layout><Content textAlign="center"><Loading size={35} /></Content></Layout>}
                {decade && 
                    <Layout style={{backgroundColor: "white"}}>
                        <Header textAlign="center" margin={30}>
                            <H1 bold={true}>Shop by Decade</H1>
                        </Header>
                        <Content padding="0 150px 0 150px">
                            <Row gutter={16} justify="center">
                                {decade.map(d => (
                                    <Col style={{padding: 8}} span={12}><Link to={d.linkUrl}><Image src={d.name} preview={false} className="shadow" /></Link></Col>
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