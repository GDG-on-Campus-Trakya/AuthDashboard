import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card, Tabs, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
// DİKKAT: api dosyanın yeri src/api.js ise import './api' olmalı.
// Eğer src/api/api.js ise import '../api/api' doğrudur. Dosya yolunu kontrol et.
import api from "../api/api.js";

const AuthPage = () => {
  // --- LOGIN İŞLEMİ ---
  const onLoginFinish = async (values) => {
    try {
      // HATA 1 DÜZELTİLDİ: 'axios.post' yerine 'api.post' kullanıldı.
      const res = await api.post("/login", values);

      message.success("Giriş işlemi başarılı! Yönlendiriliyorsunuz...");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Giriş Hatası:", error);
      message.error(
        error.response?.data?.message ||
          "Giriş yapılamadı. Bilgileri kontrol edin"
      );
    }
  };

  // --- REGISTER İŞLEMİ ---
  const onRegisterFinish = async (values) => {
    try {
      const { confirm, fullname, ...otherValues } = values;

      // HATA 2 DÜZELTİLDİ: Backend 'username' bekliyor, Frontend 'fullname' veriyor.
      // Veriyi backend'in beklediği formata çeviriyoruz:
      const registerData = {
        ...otherValues,
        username: fullname, // fullname'i username olarak gönderiyoruz
      };

      const response = await api.post("/register", registerData);

      if (response.status === 201 || response.status === 200) {
        message.success("Kayıt başarılı! Lütfen giriş yapın.");
      }
    } catch (error) {
      console.error("Kayıt Hatası:", error);
      message.error(error.response?.data?.message || "Kayıt işlemi başarısız");
    }
  };

  // --- Login Form Bileşeni (Aynı) ---
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

  // --- Register Form Bileşeni (Aynı) ---
  const RegisterForm = () => (
    <Form
      name="register"
      onFinish={onRegisterFinish}
      layout="vertical"
      scrollToFirstError
    >
      <Form.Item
        name="fullname" // Backend bunu 'username' olarak istiyor, yukarıda düzelttik
        label="Ad Soyad (Kullanıcı Adı)"
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

  const items = [
    { key: "1", label: "Giriş Yap", children: <LoginForm /> },
    { key: "2", label: "Kayıt Ol", children: <RegisterForm /> },
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
