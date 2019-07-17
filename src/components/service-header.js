import React from 'react'
import { Card, Icon, Tag, Rate, Button, Divider, Statistic, Badge } from 'antd'

export default () => {
  return (
    <Card
      title={ServiceTitle}
      style={{ width: '100%', marginTop: '-20px' }}
      bordered={false}>
      <h4 style={{ fontWeight: 700 }}>OVERALL RATING</h4>

      <div>
        <p style={{ fontWeight: 700, float: 'left', fontSize: 24 }}>3.5</p>
        <Rate
          style={{ float: 'left', marginLeft: '1.5rem', color: '#0094FF' }}
          allowHalf
          defaultValue={3.5}
          disabled
        />
      </div>
      <Divider type="vertical" style={{ height: '75px', marginTop: '-35px' }} />
      <Statistic
        title="Active Appointments"
        value={112893}
        style={{
          float: 'right',
          marginRight: '20rem',
          marginTop: '-4.2rem',
          fontSize: 24,
          fontWeight: '700',
        }}
      />

      <Statistic
        title="Feedback"
        value={1128}
        prefix={<Icon type="like" />}
        style={{
          float: 'right',
          marginRight: '13rem',
          marginTop: '-4.2rem',
          fontSize: 24,
          fontWeight: 700,
        }}
      />
      <Button
        type="default"
        icon="info-circle"
        style={{ float: 'right', marginTop: '-3rem' }}>
        Check Available Date
      </Button>

      <div style={{ marginTop: '2rem', float: 'left', marginRight: '12rem' }}>
        <Button
          type="primary"
          icon="plus"
          style={{ float: 'left', clear: 'both' }}>
          Make Appointment
        </Button>
        <Button
          type="danger"
          icon="close-square"
          style={{ float: 'left', marginLeft: '1rem' }}>
          Cancel Appointment
        </Button>
      </div>
    </Card>
  )
}

const ServiceTitle = (
  <div style={{ display: 'block' }}>
    <h2 style={{ float: 'left' }}>Dan Abramov</h2>
    <Badge style={{ marginLeft: '0.5rem' }} color="#87d068" text="Online" />
    <Tag color="blue" style={{ float: 'right', marginTop: '0.5rem' }}>
      Dentist
    </Tag>
    <div>
      <a
        href="mailto:sidou010@outlook.com"
        style={{
          float: 'right',
          marginLeft: '0.5rem',
          marginRight: '1rem',
          marginTop: '-1rem',
          fontWeight: 50,
        }}>
        dan.Abramov@gmail.com
      </a>
      <Icon
        type="mail"
        theme="outlined"
        style={{ float: 'right', marginLeft: '1rem', marginTop: '-0.8rem' }}
      />
    </div>
  </div>
)
