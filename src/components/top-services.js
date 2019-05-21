import React from 'react'
import { Skeleton, Typography, List, Avatar, Icon, Rate, Button } from 'antd'

const { Title } = Typography

const listData = []
for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Doctor Lipshit ${i}`,
    avatar:
      'https://www.sheffield.ac.uk/polopoly_fs/1.739455!/image/A_Cochrane_300x300.jpg',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  })
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

export default class extends React.Component {
  state = {
    loading: true,
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
                  <Button type="primary">View Profile</Button>,
                  <IconText type="message" text="2" />,
                ]
              }
              extra={
                !loading && (
                  <img
                    width={272}
                    alt="logo"
                    src="https://www.sheffield.ac.uk/polopoly_fs/1.739455!/image/A_Cochrane_300x300.jpg"
                  />
                )
              }>
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
