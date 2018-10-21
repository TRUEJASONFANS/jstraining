import React from 'react';
import { Modal, Tabs, TabPane, Form, FormItem, Input, Button } from 'antd';
const LoginModel = (props) => (
  <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
    <Tabs type="card" onChange={this.callback.bind(this)}>
      <TabPane tab="登录" key="1">
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label="账户">
            <Input placeholder="请输入您的账号" {...props.form('userName')} />
          </FormItem>
          <FormItem label="密码">
            <Input type="password" placeholder="请输入您的密码" {...props.form('password')} />
          </FormItem>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form>
      </TabPane>
      <TabPane tab="注册" key="2">
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label="账户">
            <Input placeholder="请输入您的账号" {...props.form('r_userName')} />
          </FormItem>
          <FormItem label="密码">
            <Input type="password" placeholder="请输入您的密码" {...props.form('r_password')} />
          </FormItem>
          <FormItem label="确认密码">
            <Input type="password" placeholder="请再次输入您的密码" {...props.form('r_confirmPassword')} />
          </FormItem>
          <Button type="primary" htmlType="submit">注册</Button>
        </Form>
      </TabPane>
    </Tabs>
  </Modal>
);
export default LoginModel;