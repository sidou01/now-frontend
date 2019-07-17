import React from 'react'
import { Skeleton, Typography, List, Avatar, Rate } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from '@reach/router'

const { Title } = Typography

const FETCH_SERVICES = gql`
  query FETCH_SERVICES {
    fetchServicesByType(type: Doctor) {
      id
      fullName
      email
      avatar
      Bio
      phone
      doctorField
    }
  }
`

export default () => {
  const {
    loading,
    data: { fetchServicesByType },
  } = useQuery(FETCH_SERVICES, { fetchPolicy: 'cache-and-network' })
  console.log(loading)

  return (
    <div>
      <Title level={2}>Trending Services</Title>
      {fetchServicesByType ? (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={fetchServicesByType}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={
                !loading && [
                  <Rate
                    allowHalf
                    defaultValue={3.5}
                    disabled
                    style={{ color: '#0094FF' }}
                  />,
                  // <Button type="primary">View Profile</Button>,
                  // <IconText type="message" text="2" />,
                ]
              }
              extra={
                !loading && <img width={272} alt="logo" src={item.avatar} />
              }>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Link to={`service/${item.id}`}>{item.fullName}</Link>}
                description={item.Bio}
              />
              {item.Bio}
            </List.Item>
          )}
        />
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      )}
    </div>
  )
}
