import React from "react";
import { Layout, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;

const BasicLayout = props => {
  const { authState } = props;
  if (authState === "signedIn") {
    return null;
  }
  return (
    <Layout className="layout">
      <Header>
        <Row>
          <Col md={8}>
            <span className="logo">Ant Design - AmplifyJs</span>
          </Col>
        </Row>
      </Header>
      <Content
        className="basic-layout-content"
      >
        {React.Children.map(props.children, child =>
          React.cloneElement(child, props)
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>Copyright @ ABC</Footer>
    </Layout>
  );
};

export default BasicLayout;
