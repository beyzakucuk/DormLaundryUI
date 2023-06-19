import { Form, Button, DatePicker, notification, Select, Col, Row } from 'antd';
import dayjs from 'dayjs'
import { filterFormOn } from '../redux/turnsFormSlice';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import api from '../helper/api';
import { fetchTurns } from 'No/redux/turnsGetSlice';

const disabledDate = (current: any) => {
  return current < dayjs().endOf('day');
};
const disabledDateTime = () => ({
  disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23, 24],
});

export default function TurnAddingForm() {
  const [machines, setMachines] = useState([]);
  const dispatch: any = useDispatch();
  const filterValues = useSelector((state:any) => state.turnFilterValues);

  useEffect(() => {
    api.get("/machine")
      .then((response) => {
        console.log(response.data)
        setMachines(response.data);
      })
  }, []);

  function listButtonOnClick() {
    dispatch(filterFormOn());
  }

  const turnAddingFormOnFinish = (values: any) => {
    api.post('/turn/', {
      Date: values.Date,
      StudentId: localStorage.getItem("studentId"),
      MachineId: values.Machine
    })
      .then(function () {
        notification.open({
          message: 'İşlem Başarılı',
        });
        dispatch(fetchTurns(filterValues.value))
      })
      .catch(function (error) {
        notification.open({
          message: 'Hata',
          description:
            error.response.data,
        });
      });
  };

  return (
    <>
      <Form id="turnAddingForm" onFinish={turnAddingFormOnFinish}>
        <Row justify="space-between" id="row" align={'middle'} gutter={[16, { xs: 8, sm: 9, md: 11, lg: 12 }]}>

          <Col className="gutter-row" id="col1" xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item
              id="Machine"
              name="Machine"
              label="Makine"
              rules={[{ required: true, message: 'Lütfen makine no seçiniz!' }]}
              required
              tooltip="Makine bilgisi zorunlu alandır."
              hasFeedback
            >
              <Select
                id="select"
                placeholder="Makine seçiniz"
                options={machines.map((machine: any) => ({ label: machine.no, value: machine.id, id: "id" }))}
              />
            </Form.Item>
          </Col>

          <Col className="gutter-row" id="col2" xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item
              id="Date"
              name="Date"
              label="Tarih"
              rules={[{ required: true, message: 'Lütfen tarih giriniz!', }]}
              required
              tooltip="Tarih zorunlu alandır."
              hasFeedback
            >
              <DatePicker
                id="date-picker"
                format="YYYY-MM-DD HH"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{
                  defaultValue: dayjs('00', 'HH'),
                }}
              />
            </Form.Item>
          </Col>

          <Col className="gutter-row" id="col3" xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item >
              <Button id="addButton" type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" id="col4" xs={24} sm={12} md={12} lg={8} xl={8} >
            <Form.Item >
              <Button id="listButton" type="primary" htmlType="submit" onClick={listButtonOnClick}>
                Filtreleme
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}