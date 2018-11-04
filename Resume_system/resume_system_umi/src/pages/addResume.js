import styles from './addResume.css';
import React from "react";
import { connect } from 'dva';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Upload,
  message,
  Modal
} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Dragger = Upload.Dragger;
class AddResumeFrame extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return <div>
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="姓名" hasFeedback>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请输入姓名"
              }
            ]
          })(<Input className={styles.name} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              学历&nbsp;
              </span>
          }
          hasFeedback
        >
         <Select defaultValue="本科" style={{ width: 120 }} >
            <Option value="bachelor">本科</Option>
            <Option value="master">硕士</Option>
            <Option value="doctor">博士</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
  }
}
const AddResumePage = Form.create()(AddResumeFrame);
export default AddResumePage;
