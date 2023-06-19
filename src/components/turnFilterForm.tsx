import { Form, Button, DatePicker, Select, Col, Row } from 'antd';
import dayjs from 'dayjs'
import { fetchTurns } from '../redux/turnsGetSlice';
import { setFilterValue } from '../redux/turnFilterValuesSlice';
import { IFilter } from '../models/filterTurn';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../helper/api';
import { addFormOn } from "../redux/turnsFormSlice";

const disabledDateTime = () => ({
  disabledHours: () => [0, 1, 2, 3, 4, 5, 6,7, 20, 21, 22, 23, 24],
});
const disabledDate = (current: any) => {
  return current < dayjs('2023-01-02');
};

export default function TurnFilterForm() {
  const dispatch: any = useDispatch();
  const [machines, setMachines] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/machine")
      .then((response) => {
        setMachines(response.data);
      })
  }, []);
  useEffect(() => {
    api.get("/student")
      .then((response) => {
        setStudents(response.data);
      })
  }, []);

  const formOnFinish = (values: any) => {
    if(values.date==null)
       values.date=dayjs('2023/01/01 07', "YYYY-MM-DD HH");
    if(values.date.$H==0)
       values.date=dayjs(values.date).hour(7);

console.log(values.date)
    var filterValues: IFilter = {
      machineId: values.machine,
      studentId: values.student,
      date: values.date.toJSON(),
      pageNo: 1
    };
    dispatch(setFilterValue(filterValues));
    dispatch(fetchTurns(filterValues));
  };

  function addButtonOnClick() {
    dispatch(addFormOn());
  }

  return (
    <>
      <Form id="form" onFinish={formOnFinish}>
        <Row gutter={[16, { xs: 8, sm: 9, md: 11, lg: 12 }]} justify="space-between" align={'middle'} id='row'>
          <Col className="gutter-row" id='machineCol' xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item
              id="machine"
              name="machine"
              label="Makine"
              tooltip="Makine seçiniz."
            >
              <Select
                id="selectMachine"
                allowClear
                placeholder="Tümü"
                options={machines.map((machine: any) => ({ label: machine.no, value: machine.id, id: "id" }))}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" id='studentCol' xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item
              id="student"
              name="student"
              label="Öğrenci"
              tooltip="Öğrenci seçiniz" >
              <Select
                id="selectStudent"
                allowClear
                placeholder="Tümü"
                options={students.map((student: any) => ({ label: student.name + " " + student.surname, value: student.id, id: "id" }))}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" id='dateCol' xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item

              id="date"
              name="date"
              label="Tarih"
              initialValue={dayjs('2023/01/01 07', "YYYY-MM-DD HH")} >
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
          <Col className="gutter-row" id='filterButtonCol' xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item >
              <Button id="filterButton" type="primary" htmlType="submit">
                Listele
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" id='addButtonCol' xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item >
              <Button id="addButton" type="primary" htmlType="submit" onClick={addButtonOnClick}>
                +
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}