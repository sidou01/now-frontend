import React from 'react'
import { Row, Col, Avatar, Card, Icon, Comment, Tooltip, Badge } from 'antd'
import styled from 'styled-components'
import { ServiceHeader, ServiceAbout } from '../components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_SERVICE_INFO = gql`
  query GET_SERVICE_INFO($serviceId: ID!) {
    fetchService(serviceId: $serviceId) {
      id
      fullName
      address
      gender
      age
      education
      serviceType
      doctorField
      office_hours
      appointments_made
      likes
      rating
      avatar
      appointments {
        id
        title
        start
        end
        duration
      }
    }
  }
`

export default props => {
  const { loading, data } = useQuery(GET_SERVICE_INFO, {
    variables: { serviceId: props.id },
  })
  console.log(data)
  return (
    <ProfileContainer>
      <Row>
        <Col span={18} push={6}>
          <ServiceHeader service={data.fetchService} />
        </Col>
        <Col span={6} pull={18}>
          <Avatar
            size={200}
            shape="square"
            src={data && data.fetchService.avatar}
          />

          {/*}
          <Card
            style={{ width: 210 }}
            cover={
              <img
                alt="example"
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
              />
            }>
            <div style={{ fontSize: 12, float: 'left' }}>
              <Icon type="mail" style={{ float: 'left', width: '26px' }} />
              <p style={{ marginLeft: '2rem' }}>dan.abramov@gmail.com</p>
              <Icon type="phone" style={{ float: 'left', width: '26px' }} />
              <p style={{ marginLeft: '2rem' }}> (+213) 540233312 </p>
            </div>
          </Card>
	  {*/}
        </Col>
      </Row>
      <Row>
        <Col span={18} push={6}>
          <ServiceAbout service={data.fetchService} />
        </Col>
        <Col span={6} pull={18} />
      </Row>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  padding: 50px;
  overflow: 'scroll';
  background: 'red';
`
