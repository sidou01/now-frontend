import React from "react"
import { Skeleton, Typography, List, Avatar, Icon, Rate, Button } from "antd"

const { Title } = Typography

const listData = [
  {
    href: "http://ant.design",
    title: `Doctor Stephen A Smith`,
    avatar: "https://www.sheffield.ac.uk/polopoly_fs/1.739455!/image/A_Cochrane_300x300.jpg",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    serviceImage: "https://www.sheffield.ac.uk/polopoly_fs/1.739455!/image/A_Cochrane_300x300.jpg"
  },
  {
    href: "http://ant.design",
    title: `Doctor Matti Aapro`,
    avatar: "https://www.genolier.net/site/assets/files/17734/aapro-1.500x0.jpg",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    serviceImage: "https://www.genolier.net/site/assets/files/17734/aapro-1.500x0.jpg"
  }
]

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

export default class extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: !this.state.loading }), 2000)
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <Title level={2}>Trending Services</Title>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={
                !loading && [
                  <Rate allowHalf defaultValue={2.5} disabled />,
                  <Button type="primary">View Profile</Button>
                  // <IconText type="message" text="2" />,
                ]
              }
              extra={!loading && <img width={272} alt="logo" src={item.serviceImage} />}
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
