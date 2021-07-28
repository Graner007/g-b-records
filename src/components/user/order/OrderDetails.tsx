import { Component } from 'react';
import { Layout, PageHeader } from "antd";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";
 
import { OrderModel } from "../../interface/OrderModel";
import { Content, Header } from "../../Styles";
import { StatusCodeModel } from "../../interface/StatusCodeModel";
import Loading from "../../warning/Loading";
import ErrorPage from "../../warning/ErrorPage";

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
        axios.get(process.env.PUBLIC_URL + "/data/user.json")
            .then(res => {
                if (res.status === 200) {
                    let data: OrderModel[] = [];
                    data = res.data;

                    const order = data.find(order => order.id.toString() === this.props.match.params.id);

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
                        <PageHeader onBack={() => this.props.history.goBack()} title={"My Account > Order " + this.state.order.id} />
                    </Header>
                    <Content padding="3%">
                        
                    </Content>
                </Layout>
        )
    }
}

export default withRouter(OrderDetails);