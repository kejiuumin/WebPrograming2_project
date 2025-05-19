import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // 에러 메시지 상태 추가

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // 입력값 변경 시 에러 초기화
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }
    setError(""); // 에러 초기화
    alert(`ID: ${form.username}\nPW: ${form.password}`);
  };

  return (
    <div className="max-w-80 mx-auto w-full mt-20 flex flex-col justify-between items-center">
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
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-[#333] cursor-pointer transition"
        >
          로그인
        </button>
      </form>
      <div className="mt-4 text-gray-600 text-sm">
        이미 계정이 없으신가요?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
