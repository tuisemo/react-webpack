import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import styles from "./index.less";
import api from "@/api/demo";
const { Header, Content, Footer, Sider } = Layout;

class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  getData = async () => {
    const res = await api.getProducts();
    console.log("res: ", res);
    this.setState({
      list: res.data
    });
  };
  render() {
    const { children } = this.props;
    return (
      <Layout className={styles["container"]}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className={styles["slogon"]}>React</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Link to="/example/counter" className="nav-text">
                <Icon type="user" />
                <span className="nav-text">Counter</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/example/todos" className="nav-text">
                <Icon type="video-camera" />
                <span className="nav-text">TodoList</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/example/tables" className="nav-text">
                <Icon type="video-camera" />
                <span className="nav-text">Tables</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div className={styles["wrap"]}>
              {/* 存放子路由 */}
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default Example;
