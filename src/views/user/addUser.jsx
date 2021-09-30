import { Form, Input, Button, Space } from "antd";
import md5 from "js-md5";
const onFinish = (values) => {
  values.password = md5(values.password);
  console.log("Finish:", values);
};
const AddUser = (props) => {
  const { close } = props;
  return (
    <Form
      name="basicForm"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 17 }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "用户名不可以为空" }]}
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
      <Form.Item wrapperCol={{ offset: 14 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={close}>取消</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default AddUser;
