import { Form, Input, Button, Space } from "antd";
import md5 from "js-md5";
import { doChange } from "@/utils/api";
const AddUser = (props) => {
  const [form] = Form.useForm();
  const { close, searchUser, alertMsg, thisUser } = props;
  form.setFieldsValue(thisUser);
  const onFinish = (values) => {
    values.password = md5(values.password);
    doChange(values)
      .then((res) => {
        if (res) {
          alertMsg("提交成功！", "success");
        } else {
          alertMsg("提交失败，请重试", "error");
        }
        onReset();
        close();
        searchUser();
      })
      .catch(() => {
        alertMsg("提交失败，请重试", "error");
        close();
        searchUser();
      });
  };
  const onReset = () => {
    form.resetFields();
  };
  const onClose = () => {
    form.resetFields();
    close();
  };
  return (
    <Form
      name="basicForm"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 17 }}
      autoComplete="off"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        label="用户名"
        name="account"
        rules={[
          {
            pattern: /^[A-Za-z\d_]+$/,
            message: "自能包含字母数字下划线字符!",
          },
          { required: true, message: "用户名不可以为空" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="姓名"
        name="name"
        rules={[{ required: true, message: "姓名不可以为空" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "密码不可以为空" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="ID" name="id" style={{ display: "none" }}>
        <Input disabled={true} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 14 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={onClose}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default AddUser;
