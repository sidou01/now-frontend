import React from 'react'
import { Tabs, Icon, Descriptions, Table, Tag, Button } from 'antd'

const { TabPane } = Tabs
const { Column } = Table

export default () => (
  <Tabs defaultActiveKey="1">
    <TabPane
      tab={
        <span>
          <Icon type="calendar" />
          Daily Schedule
        </span>
      }
      key="1">
      <ServiceSchedule />
    </TabPane>
    <TabPane
      tab={
        <span>
          <Icon type="contacts" />
          Personal Information
        </span>
      }
      key="2">
      <Descriptions title="User Info">
        <Descriptions.Item label="Address">
          No. 18, Hangzhou, Zhejiang, China
        </Descriptions.Item>
        <Descriptions.Item label="Office Hours">9am - 16pm</Descriptions.Item>
        <Descriptions.Item label="Field">Dentist</Descriptions.Item>

        <Descriptions.Item label="Gender">MALE</Descriptions.Item>
        <Descriptions.Item label="Age">29</Descriptions.Item>
        <Descriptions.Item label="Education">UCLA</Descriptions.Item>
      </Descriptions>
      ,
    </TabPane>
  </Tabs>
)

const ServiceSchedule = () => (
  <Table dataSource={data}>
    <Column title="Doctor" dataIndex="doctor" key="doctor" />
    <Column title="From" dataIndex="from" key="from" />
    <Column title="To" dataIndex="to" key="to" />
    <Column
      title="Availability"
      dataIndex="open"
      key="Available"
      render={open => (
        <span>
          <Tag color={open ? 'green' : 'red'} key={open}>
            {open ? 'Available' : 'Taken'}
          </Tag>
        </span>
      )}
    />
    <Column
      title="Schedule"
      dataIndex="open"
      key="action"
      render={open => (
        <span>
          {open ? (
            <Button type="primary">Schedule</Button>
          ) : (
            <Button type="primary" disabled>
              Schedule
            </Button>
          )}
        </span>
      )}
    />
  </Table>
)

const data = [
  {
    key: '1',
    doctor: 'Dan',
    from: '8:00am',
    to: '9:00am',
    open: false,
  },
  {
    key: '2',
    doctor: 'Dan',
    from: '9:00am',
    to: '10:00am',
    open: true,
  },
  {
    key: '3',
    doctor: 'Dan',
    from: '11:00am',
    to: '12:00pm',
    open: true,
  },
  {
    key: '4',
    doctor: 'Dan',
    from: '13:00pm',
    to: '14:00pm',
    open: false,
  },
  {
    key: '5',
    doctor: 'Dan',
    from: '14:00pm',
    to: '15:00pm',
    open: false,
  },
  {
    key: '6',
    doctor: 'Dan',
    from: '15:00pm',
    to: '16:00pm',
    open: true,
  },
]
