import React from 'react'
import { Row, Col, Avatar } from 'antd'
import styled from 'styled-components'
import { ServiceHeader } from '../components'

export default () => {
  return (
    <ProfileContainer>
      <Row>
        <Col span={16} push={8}>
          <ServiceHeader />
        </Col>
        <Col span={8} pull={16}>
          <Avatar
            size={250}
            shape="square"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
          />
        </Col>
      </Row>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  padding: 50px;
`
