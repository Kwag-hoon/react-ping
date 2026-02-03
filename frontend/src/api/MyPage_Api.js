// src/api/MyPage_Api.js
import Api from "./Api";

// 마이피드백 목록
export const getMyFeedback = () => Api.get("/api/mypage/feedback");

