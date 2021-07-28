import { Component } from 'react';
import { Layout, PageHeader, Card, Row, Col, List, Avatar } from "antd";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
 
import { OrderModel } from "../../interface/OrderModel";
import { Content, Header, P } from "../../Styles";
import { StatusCodeModel } from "../../interface/StatusCodeModel";
import Loading from "../../warning/Loading";
import ErrorPage from "../../warning/ErrorPage";
import { LoginCtx } from "../../../context/LoginContext";

type RouterParams = {
    id: string;
}

interface Props extends RouteComponentProps<RouterParams> {

}

type State = {
    order: OrderModel;
    error: boolean;
    loading: boolean;
    statusCode: StatusCodeModel;
}

class OrderDetails extends Component<Props, State> {

    static contextType = LoginCtx;

    constructor(props: Props) {
        super(props);
        this.state = {
            order: {} as OrderModel,
            error: false,
            loading: true,
            statusCode: {} as StatusCodeModel
        }
    }

    componentDidMount() {
        axios.get(process.env.PUBLIC_URL + "/data/order.json")
            .then(res => {
                if (res.status === 200) {
                    let data: OrderModel[] = [];
                    data = res.data;

                    const order = data.find(order => order.id.toString() === this.props.match.params.id && order.user.email === this.context.state.email);

                    if (order) { this.setState({order: order, loading: false, error: false, statusCode: {} as StatusCodeModel}); }
                    else { this.setState({loading: false, error: true, statusCode: {code: "404"}}); }
                }
            })
            .catch(err => {
                switch (err.response.status) {
                    case 403:
                        this.setState({loading: false, error: true, statusCode: {code: "403"}});
                        break; 
                    case 404:
                        this.setState({loading: false, error: true, statusCode: {code: "404"}});
                        break;
                    case 500:
                        this.setState({loading: false, error: true, statusCode: {code: "500"}});                     
                        break;
                    default:
                        break;
                }
            });
    }

    render() {

        if (this.state.error) {
            return (
                <ErrorPage status={this.state.statusCode.code} />
            )
        }

        return (
            this.state.loading ? <Loading size={35} /> :
                <Layout>
                    <Header>
                        <PageHeader onBack={() => this.props.history.goBack()} title={"My Account > Order " + this.state.order.id + " - " + this.state.order.orderDate} />
                    </Header>
                    <Content padding="3%">
                        <Row gutter={24} justify="center">
                            <Col span={12}>
                                <Card
                                    title={this.state.order.address}
                                    extra={<P fontSize={18}>{this.state.order.payment}$</P>}
                                    >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={this.state.order.products}
                                        size="large"
                                        renderItem={item => (
                                        <Link to={"/products/" + item.name.split(" ").join("-").toLowerCase()}><List.Item
                                            className="shadow"
                                            actions={[<P fontSize={18}>Price: {item.price * item.quantity}$</P>, <P fontSize={18}>Quantity: {item.quantity}</P>]}
                                        >
                                            <List.Item.Meta
                                                title={item.name}
                                                description={item.artist}
                                                avatar={<Avatar src={item.albumCover} shape="square" size="large" />}
                                            />
                                        </List.Item></Link>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
        )
    }
}

export default withRouter(OrderDetails);