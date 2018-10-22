import React from 'react';
import { Modal, Tabs, Form,Input, Button } from 'antd';
const LoginModel = (props) => (
  <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={true} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
    <Tabs type="card" onChange={props.callback.bind(this)}>
      <Tabs.TabPane tab="登录" key="1">
        <Form horizontal onSubmit={props.handleSubmit.bind(this)}>
          <Form.item label="账户">
            <Input placeholder="请输入您的账号" {...props.form('userName')} />
          </Form.item>
          <Form.item label="密码">
            <Input type="password" placeholder="请输入您的密码" {...props.form('password')} />
          </Form.item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="注册" key="2">
        <Form horizontal onSubmit={props.handleSubmit.bind(this)}>
          <Form.item label="账户">
            <Input placeholder="请输入您的账号" {...props.form('r_userName')} />
          </Form.item>
          <Form.item label="密码">
            <Input type="password" placeholder="请输入您的密码" {...props.form('r_password')} />
          </Form.item>
          <Form.item label="确认密码">
            <Input type="password" placeholder="请再次输入您的密码" {...props.form('r_confirmPassword')} />
          </Form.item>
          <Button type="primary" htmlType="submit">注册</Button>
        </Form>
      </Tabs.TabPane>
    </Tabs>
  </Modal>
);
export default LoginModel;