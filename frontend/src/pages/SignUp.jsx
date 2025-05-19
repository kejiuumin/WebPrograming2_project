import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // 입력값 변경 시 에러 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.nickname ||
      !form.password ||
      !form.passwordConfirm
    ) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert(
      `회원가입 정보\n아이디: ${form.username}\n닉네임: ${form.nickname}\n비밀번호: ${form.password}`
    );
    // 실제 회원가입 API 연동은 여기에서 구현 예정정
  };

  return (
    <div className="max-w-80 mx-auto w-full mt-10 flex flex-col justify-between items-center">
      <Link to="/" className="font-bold font-dotum text-5xl/26 text-center">
        GameHub
      </Link>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="아이디를 입력하세요"
        />
        <Input
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        <Input
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleChange}
          placeholder="비밀번호 확인"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-[#333] cursor-pointer transition"
        >
          회원가입
        </button>
      </form>
      <div className="mt-4 text-gray-600 text-sm">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
