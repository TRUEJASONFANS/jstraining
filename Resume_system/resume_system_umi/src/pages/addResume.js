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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
      }
    });
  }

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="姓名" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                },
              ],
            })(<Input className={styles.name} />)}
          </FormItem>
        <FormItem {...formItemLayout} label={<span>学历&nbsp;</span>}>
          {getFieldDecorator('degree', {
            rules: [
              {
                required: true,
                message: '请选择学历',
              },
            ],
            initialValue: "本科"
          })(<Select defaultValue="本科" style={{ width: 120 }}>
            <Option value="bachelor">本科</Option>
            <Option value="master">硕士</Option>
            <Option value="doctor">博士</Option>
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="毕业学校" hasFeedback>
            {getFieldDecorator('school', {
              rules: [
                {
                  required: true,
                  message: '请输入毕业学校',
                },
              ],
            })(<Input className={styles.school}/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="简历">
            {getFieldDecorator("resume", {
              rules: [{ required: true , message:'请上传简历'}]
            })(
            <div className="clearfix">
              <Upload>
                <div>
                  <Button>
                    <Icon type="upload" />
                  </Button>
                </div>
              </Upload>
            </div>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(<Checkbox>确认</Checkbox>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">提交 </Button>
          </FormItem>
        </Form>
      </div>;
  }
}
const AddResumePage = Form.create()(AddResumeFrame);
export default AddResumePage;
