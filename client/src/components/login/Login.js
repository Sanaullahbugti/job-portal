import React from "react";
import { Form, Icon, Input, Button, Typography } from "antd";
export default function Login(props) {
  const { Title } = Typography;
  const {
    role,
    name,
    password,
    handleChange,
    login,
    handleComFormStatus,
    handleFormStatus
  } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {" "}
      <Form
        className="login-form"
        style={{
          border: "2px solid grey",
          borderRadius: "2%",
          padding: "2%",
          width: "35%"
        }}
      >
        {role === "student" ? (
          <Title
            style={{
              color: "rgb(64,169,255)"
            }}
          >
            {" "}
            Student Login From{" "}
          </Title>
        ) : (
          <Title
            style={{
              color: "rgb(64,169,255)"
            }}
          >
            {" "}
            Company Login From{" "}
          </Title>
        )}

        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Username"
          style={{ marginBottom: "5%" }}
          name="name"
          onChange={evt => handleChange(evt)}
          value={name}
        />
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          onChange={evt => handleChange(evt)}
          value={password}
          placeholder="Password"
          style={{ marginBottom: "5%" }}
        />

        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%", marginBottom: "5%" }}
          onClick={login}
        >
          Log in
        </Button>

        {role === "student" ? (
          <a href="" onClick={evt => handleFormStatus(evt)}>
            register now!
          </a>
        ) : (
          <a href="" onClick={evt => handleComFormStatus(evt)}>
            register now!
          </a>
        )}
      </Form>
    </div>
  );
}
