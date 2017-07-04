import React from "react";
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import { withRouter } from 'react-router';
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
class PCResumeAdd extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: "",
    fileList: {}
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var myHeaders = new Headers();
        myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
        var formData = new FormData();
        for (var key in values) {
          formData.append(key, values[key]);
        }
        console.log(values['resume']);
        formData.append("resumeFile", this.state.fileList.file, values['resume']);
        var myInit = {
          method: "POST",
          headers: myHeaders,
          mode: "cors",
          cache: "default",
          body: formData
        };
        var myRequest = new Request(
          "http://localhost:3000/api/addCandidate",
          myInit
        );
        fetch(myRequest).then(response => {
          console.log(this.props.router);
          this.props.router.push('/');
        });
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  handleChange = ({ fileList }) => this.setState({ fileList });
  beforeUpload = fileObj => {
    let reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onloadend = function() {
      this.setState({
        fileList: {
          uid: -1,
          name: "jianli.pdf",
          status: "done",
          url: reader.result,
          file: fileObj
        }
      });
    }.bind(this);
    return false;
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
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
    const chinaPhonePrefix = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    const resume_upload_props = {
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload
    };
    const resume_upload_button = (
      <div>
        <Button>
          <Icon type="upload" />简历上传
        </Button>
      </div>
    );
    return (
      <div>
        <PCHeader />
        <br />
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="姓名" hasFeedback>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入姓名"
                }
              ]
            })(<Input />)}
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
            {getFieldDecorator("degree", {
              rules: [
                { required: true, message: "学历程度:本科,硕士,博士.", whitespace: true }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="毕业学校" hasFeedback>
            {getFieldDecorator("school", {
              rules: [
                {
                  required: true,
                  message: "请输入毕业学校"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="籍贯">
            {getFieldDecorator("residence", {
              rules: [{ required: false, message: "请输入籍贯" }]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入电话号码" }]
            })(<Input addonBefore={chinaPhonePrefix} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="简历">
            {getFieldDecorator("resume", {
              rules: [{ required: true }]
            })(
              <div className="clearfix">
                <Upload {...resume_upload_props}>
                  {resume_upload_button}
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
        <PCFooter />
      </div>
    );
  }
}
export default withRouter(PCResumeAdd = Form.create()(PCResumeAdd));
