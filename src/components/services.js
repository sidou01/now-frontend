import React from "react"
import { Menu, Pagination, Input, Card, Row, Col, AutoComplete, Badge } from "antd"
import styled from "styled-components"
// import { Input } from "antd"

const { Search } = Input

// export default () => (
// )

const { SubMenu } = Menu

export default class extends React.Component {
  state = {
    current: "mail"
  }

  handleClick = e => {
    console.log("click ", e)
    this.setState({
      current: e.key
    })
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ padding: "10px" }}
        >
          <Menu.Item key="app" disabled>
            <Pagination defaultCurrent={1} total={50} />
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Search
              style={{ justifyContent: "center" }}
              placeholder="Search for a Service"
              onSearch={value => console.log(value)}
              style={{ width: 200, marginLeft: "50px" }}
            />
          </Menu.Item>
          <Menu.Item key="alipay" style={{ float: "right" }}>
            Location: <strong>Oran</strong>
          </Menu.Item>
        </Menu>
        <ServicesContent>
          <Row>
            {/* <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 0.5 }}
              style={{ marginTop: "5px" }}
            >
              <Card
                title="Dr Jean-Jacques"
                extra={<a href="#">View Profile</a>}
                style={{ width: 300 }}
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://res.cloudinary.com/doctolib/image/upload/w_1024,h_700,c_limit/dgqklcylo1mmhthyszwb.jpg"
                  />
                }
              >
                <p>
                  <strong>Spcialty</strong>: Oncologie (cancérologie)
                </p>
                <strong>Contact</strong>:F +41 22 366 91 31
              </Card>
            </Col> */}
            <Col
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 0.5 }}
              style={{ marginTop: "5px" }}
            >
              <Card
                title="Dr méd. Matti Aapro"
                extra={<Badge color="blue" text="Doctor" />}
                style={{ width: 300 }}
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://www.genolier.net/site/assets/files/17734/aapro-1.500x0.jpg"
                  />
                }
              >
                <p>
                  <strong>Spcialty</strong>: Oncologie (cancérologie)
                </p>
                <p>
                  <strong>Email</strong>: maapro@genolier.net
                </p>
                <p>
                  <strong>Contact</strong>: F 041542657
                </p>
              </Card>
            </Col>
          </Row>
        </ServicesContent>
        ,
      </div>
    )
  }
}

const ServicesContent = styled.div`
  margin-top: 50px;
  margin-right: 50px;
`
