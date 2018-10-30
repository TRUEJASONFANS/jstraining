import React from 'react';
import { Modal, Tabs, Form, Input, Button } from 'antd';
const LoginModel = (props) => (
  <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={true} okText="关闭">
    {/* <Tabs type="card" onChange={props.callback.bind(this)}>
      <Tabs.TabPane tab="登录" key="1">
        <Form horizontal onSubmit={props.handleSubmit.bind(this)}>
          <Form.item label="账户">
            <Input placeholder="请输入您的账号"/>
          </Form.item>
          <Form.item label="密码">
            <Input type="password" placeholder="请输入您的密码"/>
          </Form.item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form>
      </Tabs.TabPane> */}
    {/* <Tabs.TabPane tab="注册" key="2">
        <Form horizontal onSubmit={props.handleSubmit.bind(this)}>
          <Form.item label="账户">
            <Input placeholder="请输入您的账号"/>
          </Form.item>
          <Form.item label="密码">
            <Input type="password" placeholder="请输入您的密码" />
          </Form.item>
          <Form.item label="确认密码">
            <Input type="password" placeholder="请再次输入您的密码" />
          </Form.item>
          <Button type="primary" htmlType="submit">注册</Button>
        </Form>
      </Tabs.TabPane>
    </Tabs> */}
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
);
export default LoginModel;