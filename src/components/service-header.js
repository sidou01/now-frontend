import React from 'react'
import { Card, Icon, Tag, Rate, Button, Divider } from 'antd'
import styled from 'styled-components'

export default () => {
  return (
    <Card
      title={ServiceTitle}
      style={{ width: '100%', marginTop: '-20px' }}
      bordered={false}>
      <h4 style={{ fontWeight: 700 }}>RATING</h4>

      <div>
        <p style={{ fontWeight: 700, float: 'left', fontSize: 24 }}>3.5</p>
        <Rate
          style={{ float: 'left', marginLeft: '1.5rem', color: '#0094FF' }}
          allowHalf
          defaultValue={3.5}
          disabled
        />
      </div>
      <Divider type="vertical" style={{ height: '65px', marginTop: '-25px' }} />
      <p style={{ float: 'right' }}>
        <strong>Email</strong>: dan.abramov@gmail.com
      </p>

      <div style={{ marginTop: '3.5rem', float: 'right' }}>
        <Button
          type="primary"
          icon="tag"
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
    <div>
      <Icon
        type="environment"
        theme="filled"
        style={{ float: 'left', marginLeft: '1rem', marginTop: '0.5rem' }}
      />
      <h4
        style={{
          float: 'left',
          marginLeft: '0.5rem',
          marginTop: '0.5rem',
          fontWeight: 50,
        }}>
        Oran Bir el Djir
      </h4>
    </div>

    <Tag color="blue" style={{ float: 'right', marginTop: '0.5rem' }}>
      Dentist
    </Tag>
  </div>
)
