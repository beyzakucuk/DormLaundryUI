import { Button, Form, Row, Col, Select} from 'antd';
import { useState,useEffect } from 'react';
import api from '../helper/api.js';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [students,setStudents]= useState([]);

  useEffect(() => {
     api.get("/student")
                .then((response) => {
                  console.log(response.data)
                    setStudents(response.data);
                })
  }, []);

  function loginFormOnFinish(values:any){
    localStorage.setItem("studentId", values.formItemStudentName);
    router.push("/turnPage");
  }
  return (
    <>
          <Form
            id='loginForm'
            layout="horizontal"
            form={form}
            initialValues={{ remember: true }}
            onFinish={loginFormOnFinish}
          >
            <Row gutter={[16, { xs: 12, sm: 12, md: 12, lg: 12 }]} justify="space-around" id='row'>
              <Col id='col-1' xs={24} sm={12} md={12} lg={8} xl={8}>
                <Form.Item
                  id='formItemStudentName'
                  name="formItemStudentName"
                  label="Öğrenci Adı"
                  rules={[{ required: true, message: 'Lütfen öğrenci adı seçiniz!', }]}
                  required
                  tooltip="Öğrenci adı zorunlu alandır."
                  hasFeedback
                >
                  <Select
                    id='nameSelect'
                    placeholder="Seçiniz"
                    style={{ width: 120 }}
                    options={students.map((student:any) => ({ label: student.name, value: student.id, id: "id" }))}
                  />
                    
                </Form.Item>
              </Col>

              <Col id='col-2' xs={24} sm={12} md={12} lg={8} xl={8}>
                <Button id='loginButton' type="primary" htmlType="submit">
                  Giriş
                </Button>
              </Col>
            </Row>
          </Form>
    </>
  )
}