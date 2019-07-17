import React, { useState } from 'react'
import { Tabs, Icon, Descriptions, Table, Tag, Button, Modal } from 'antd'
import dayjs from 'dayjs'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const { TabPane } = Tabs
const { Column } = Table

export default ({ service }) => (
  <Tabs defaultActiveKey="1">
    <TabPane
      tab={
        <span>
          <Icon type="calendar" />
          Daily Schedule
        </span>
      }
      key="1">
      <ServiceSchedule serviceId={service.id} />
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
        <Descriptions.Item label="Address">{service.address}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {service.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Field">
          {service.doctorField}
        </Descriptions.Item>

        <Descriptions.Item label="Gender">{service.gender}</Descriptions.Item>
        <Descriptions.Item label="Age">{service.age}</Descriptions.Item>
        <Descriptions.Item label="Education">
          {service.education}
        </Descriptions.Item>
      </Descriptions>
      ,
    </TabPane>
  </Tabs>
)

const GET_TODAY_SERVICE_APPOINTMENTS = gql`
  query GET_TODAY_SERVICE_APPOINTMENTS($serviceId: ID!) {
    fetchServiceTodaysAppointments(serviceId: $serviceId) {
      id
      title
      start
      end
      duration
    }
  }
`
const SCHEDULE_APPOINTMENT = gql`
  mutation SCHEDULE_APPOINTMENT(
    $serviceId: ID!
    $title: String
    $start: Date!
    $duration: AppointmentDuration
  ) {
    scheduleAppointment(
      input: {
        serviceId: $ID
        title: $title
        start: $start
        duration: $duration
      }
    ) {
      id
      end
    }
  }
`
const ServiceSchedule = ({ serviceId }) => {
  const [visible, toggleVisible] = useState(false)
  const [confirmLoading, toggleConfirmLoading] = useState(false)
  const { loading, data } = useQuery(GET_TODAY_SERVICE_APPOINTMENTS, {
    variables: {
      serviceId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const handleOk = () => {
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   })
    // }, 2000)
  }

  const handleCancel = () => toggleVisible(false)
  const showModal = () => toggleVisible(true)

  if (loading) {
    return <h2>loading...</h2>
  }
  console.log(data.fetchServiceTodaysAppointments)
  const fetchedData = generateTable(daily, data.fetchServiceTodaysAppointments)
  return (
    <>
      <Table dataSource={fetchedData}>
        <Column title="From" dataIndex="start" key={1} />
        <Column title="To" dataIndex="end" key={2} />
        <Column
          title="Availability"
          dataIndex="open"
          key={3}
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
          key={4}
          render={(open, record) => (
            <span>
              {open ? (
                <Button type="primary" onClick={e => showModal()}>
                  Schedule
                </Button>
              ) : (
                <Button type="primary" disabled>
                  Schedule
                </Button>
              )}
            </span>
          )}
        />
      </Table>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </>
  )
}

const daily = [
  {
    start: 8,
    end: 9,
    open: true,
  },
  {
    start: 9,
    end: 10,
    open: true,
  },
  {
    start: 10,
    end: 11,
    open: true,
  },
  {
    start: 11,
    end: 12,
    open: true,
  },
  {
    start: 12,
    end: 13,
    open: true,
  },
  {
    start: 13,
    end: 14,
    open: false,
  },
  {
    start: 14,
    end: 15,
    open: false,
  },
  {
    start: 15,
    end: 16,
    open: true,
  },
  {
    start: 16,
    end: 17,
    open: true,
  },
]

function generateTable(dailyTimeline, data) {
  const result = []
  let found = false
  for (let i = 0; i < dailyTimeline.length; i++) {
    found = false
    let start = dayjs()
      .set('hour', dailyTimeline[i].start)
      .set('minute', 0)
      .set('second', 0)
      .set('ms', 0)

    for (let j = 0; j < data.length; j++) {
      let fetchedStart = dayjs(data[j].start)
        .set('minute', 0)
        .set('second', 0)
        .set('ms', 0)
      if (start.isSame(fetchedStart)) {
        found = true
      }
      // console.log(i)
      // console.log(`fetchedStart: ${fetchedStart.hour()}`)
      // console.log(`start: ${start}`)
      // console.log(found)
    }
    // console.log(`index ${i}: found is: ${found}`)
    result.push({
      key: i,
      start: start.format('HH:mm'),
      end: start.add(1, 'hour').format('HH:mm'),
      open: !found,
    })
  }

  return result
}
