import styles from './addResume.css';
import React from "react";
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
var pdfjsLib = require('pdfjs-dist');

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Dragger = Upload.Dragger;
class AddResumeFrame extends React.Component {
  state = {
    resumeFileList:[],
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var myHeaders = new Headers();
        myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
        var formData = new FormData();
        for (var key in values) {
          formData.append(key, values[key]);
        }
        formData.append("resumeFile", this.state.resumeFileList, values['resume']);
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
          this.props.router.push('/');
        });
      }
    });
  }

  handlePreview = (e) => {
    var loadingTask = pdfjsLib.getDocument(this.state.resumeFileList[0]);
    loadingTask.promise.then(function (pdfDocument) {
      // Request a first page
      return pdfDocument.getPage(1).then(function (pdfPage) {
        // Display page on the existing canvas with 100% scale.
        var viewport = pdfPage.getViewport(1.0);
        var canvas = document.getElementById('theCanvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        var ctx = canvas.getContext('2d');
        var renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport: viewport
        });
        return renderTask.promise;
      });
    }).catch(function (reason) {
      console.error('Error: ' + reason);
    });
  }
  render() {
    const props = {
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ resumeFileList }) => ({
          resumeFileList: [...resumeFileList, file],
        }));
        return false;
      },
      fileList: this.state.resumeFileList,
    }
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
              initialValue: '本科',
            })(<Select style={{ width: 120 }}>
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
            })(<Input className={styles.school} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="简历">
            {getFieldDecorator('resume', {
              rules: [{ required: true, message: '请上传简历' }],
            })(<div className="clearfix">
                <Upload {...props}>
                  <div>
                    <Button>
                      <Icon type="upload" />
                    </Button>
                  </div>
                </Upload>
                <Button className="preview" type="primary" onClick={this.handlePreview} disabled={this.state.resumeFileList.length === 0} >
                 预览
                </Button>
              </div>)}
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(<Checkbox>确认</Checkbox>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">
              提交{' '}
            </Button>
          </FormItem>
        </Form>
      </div>;
  }
}
const AddResumePage = Form.create()(AddResumeFrame);
export default AddResumePage;
