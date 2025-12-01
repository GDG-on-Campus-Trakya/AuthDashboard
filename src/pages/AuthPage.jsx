import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card, Tabs, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const AuthPage = () => {
  // Giriş Formu Gönderildiğinde Çalışır
  const onLoginFinish = (values) => {
    console.log("Login Başarılı:", values);
    message.success("Giriş işlemi başarılı!");
    // Burada API isteği atabilirsiniz.
  };

  // Kayıt Formu Gönderildiğinde Çalışır
  const onRegisterFinish = (values) => {
    console.log("Kayıt Başarılı:", values);
    message.success("Kayıt işlemi başarılı!");
    // Burada API isteği atabilirsiniz.
  };

  // --- GİRİŞ FORMU BİLEŞENİ ---
  const LoginForm = () => (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onLoginFinish}
      layout="vertical"
    >
      <Form.Item
        name="email"
        label="E-posta"
        rules={[
          { required: true, message: "Lütfen e-postanızı girin!" },
          { type: "email", message: "Geçerli bir e-posta girin!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="ornek@email.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Şifre"
        rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Şifreniz" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Giriş Yap
        </Button>
      </Form.Item>
    </Form>
  );

  // --- KAYIT FORMU BİLEŞENİ ---
  const RegisterForm = () => (
    <Form
      name="register"
      onFinish={onRegisterFinish}
      layout="vertical"
      scrollToFirstError
    >
      <Form.Item
        name="fullname"
        label="Ad Soyad"
        rules={[
          {
            required: true,
            message: "Lütfen adınızı girin!",
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Adınız Soyadınız" />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-posta"
        rules={[
          { type: "email", message: "Geçerli bir e-posta değil!" },
          { required: true, message: "Lütfen e-postanızı girin!" },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="ornek@email.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Şifre"
        rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Şifreniz" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Şifre Tekrar"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Lütfen şifrenizi tekrar girin!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Şifreler eşleşmiyor!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Şifreyi onayla"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
  );

  // Sekme (Tab) Ayarları
  const items = [
    {
      key: "1",
      label: "Giriş Yap",
      children: <LoginForm />,
    },
    {
      key: "2",
      label: "Kayıt Ol",
      children: <RegisterForm />,
    },
  ];

  return (
    <div className="auth-container">
      <Card style={{ width: 400, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Hoşgeldiniz</h2>
          <span style={{ color: "gray" }}>Devam etmek için giriş yapın</span>
        </div>
        <Tabs defaultActiveKey="1" items={items} centered />
      </Card>
    </div>
  );
};

export default AuthPage;
