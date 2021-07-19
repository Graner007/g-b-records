import { Layout, Menu } from "antd";
import { useParams } from "react-router-dom";

import { Content, Header } from './Styles';
import RecordListByCategory from "./record/RecordListByCategory";
import SearchBar from "./navbar/SearchBar";

type Props = {
    title: string;
}

interface RouteParams {
    name: string; 
}

const SubMenuWithListContent = ({title}: Props) => {

    const { Sider } = Layout;
    const { name } = useParams<RouteParams>();
    const displayName = name.split("-").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");

    return (
        <Layout>
            <Sider theme="light" breakpoint="lg" collapsedWidth="0" >
                <Menu theme="light" mode="inline" selectable={false} style={{cursor: "no-pointer"}}>
                    <Menu.Item key="1">
                        <h3>Filters</h3>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <h4>{title}</h4>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <SearchBar placeholder={title.toLowerCase()} size="small" width="75%" padding="10px 0 10px 0" />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <p>{displayName}</p>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header>
                    <h4>Home {'>'} {displayName}</h4>
                </Header>
                <Content padding="3%" backgroundColor="#ececec">
                    <RecordListByCategory name={name} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default SubMenuWithListContent;