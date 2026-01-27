-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 26-01-27 05:24
-- 서버 버전: 10.4.32-MariaDB
-- PHP 버전: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `kdt`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_answers`
--

CREATE TABLE `pin_answers` (
  `answer_no` int(10) UNSIGNED NOT NULL COMMENT '핀 답변 번호(PK)',
  `pin_no` int(10) UNSIGNED NOT NULL COMMENT '핀 질문 번호(FK)',
  `user_no` int(10) UNSIGNED NOT NULL COMMENT '답변 작성자',
  `answer_content` text NOT NULL COMMENT '답변 내용 (이모지 가능)',
  `create_datetime` datetime DEFAULT current_timestamp() COMMENT '답변 작성일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='핀 질문에 대한 답변 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_categories`
--

CREATE TABLE `pin_categories` (
  `category_no` int(10) UNSIGNED NOT NULL,
  `group_no` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='카테고리(문제 유형) 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_category_groups`
--

CREATE TABLE `pin_category_groups` (
  `group_no` int(11) NOT NULL,
  `group_name` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='카테고리 상위 그룹 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_posts`
--

CREATE TABLE `pin_posts` (
  `post_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 번호(PK)',
  `user_no` int(10) UNSIGNED NOT NULL COMMENT '작성자 회원번호(FK)',
  `post_title` varchar(200) NOT NULL COMMENT '게시물 제목',
  `post_content` text DEFAULT NULL COMMENT '게시물 설명',
  `view_count` int(10) UNSIGNED DEFAULT 0 COMMENT '조회수',
  `like_count` int(10) UNSIGNED DEFAULT 0 COMMENT '좋아요 수',
  `dislike_count` int(10) UNSIGNED DEFAULT 0 COMMENT '싫어요 수',
  `create_datetime` datetime DEFAULT current_timestamp() COMMENT '게시물 작성일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='디자인 게시물 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_post_categories`
--

CREATE TABLE `pin_post_categories` (
  `post_category_no` int(10) UNSIGNED NOT NULL COMMENT '게시물-카테고리 연결 번호(PK)',
  `post_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 번호(FK)',
  `category_no` int(10) UNSIGNED NOT NULL COMMENT '카테고리 번호(FK)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='게시물-카테고리 연결 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_post_images`
--

CREATE TABLE `pin_post_images` (
  `image_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 이미지 번호(PK)',
  `post_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 번호(FK)',
  `image_path` varchar(255) NOT NULL COMMENT '이미지 파일 경로',
  `order_index` int(10) UNSIGNED DEFAULT 1 COMMENT '이미지 출력 순서',
  `create_datetime` datetime DEFAULT current_timestamp() COMMENT '이미지 등록일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='게시물 이미지 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_post_likes`
--

CREATE TABLE `pin_post_likes` (
  `like_no` int(10) UNSIGNED NOT NULL COMMENT '좋아요 기록 번호',
  `post_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 번호(FK)',
  `user_no` int(10) UNSIGNED NOT NULL COMMENT '회원 번호(FK)',
  `like_type` enum('LIKE','DISLIKE') NOT NULL COMMENT '좋아요 / 싫어요',
  `create_datetime` datetime DEFAULT current_timestamp() COMMENT '누른 시간'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='게시물 좋아요/싫어요 기록 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_questions`
--

CREATE TABLE `pin_questions` (
  `pin_no` int(10) UNSIGNED NOT NULL COMMENT '핀 질문 번호(PK)',
  `post_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 번호(FK)',
  `image_no` int(10) UNSIGNED NOT NULL COMMENT '게시물 이미지 번호(FK)',
  `user_no` int(10) UNSIGNED NOT NULL COMMENT '질문 작성자(게시물 작성자)',
  `x` float(6,3) NOT NULL COMMENT '이미지 기준 X좌표 (0~100 %)',
  `y` float(6,3) NOT NULL COMMENT '이미지 기준 Y좌표 (0~100 %)',
  `question_content` text NOT NULL COMMENT '핀 질문 내용',
  `create_datetime` datetime DEFAULT current_timestamp() COMMENT '질문 작성일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='이미지 좌표 기반 핀 질문 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_question_categories`
--

CREATE TABLE `pin_question_categories` (
  `pin_question_category_no` int(10) UNSIGNED NOT NULL COMMENT '핀 질문-카테고리 연결 PK',
  `pin_no` int(10) UNSIGNED NOT NULL COMMENT '핀 질문 번호(FK)',
  `category_no` int(10) UNSIGNED NOT NULL COMMENT '카테고리 번호(FK)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='핀 질문-카테고리 연결 테이블';

-- --------------------------------------------------------

--
-- 테이블 구조 `pin_users`
--

CREATE TABLE `pin_users` (
  `user_no` int(10) UNSIGNED NOT NULL COMMENT '회원 번호 (PK)',
  `user_id` varchar(50) NOT NULL COMMENT '로그인 아이디',
  `user_pw` varchar(255) NOT NULL COMMENT '비밀번호 해시',
  `user_nickname` varchar(50) NOT NULL COMMENT '닉네임',
  `user_intro` varchar(255) DEFAULT NULL COMMENT '자기소개',
  `user_image` varchar(255) NOT NULL DEFAULT 'default.png' COMMENT '프로필 이미지 경로',
  `user_banner` varchar(255) NOT NULL DEFAULT 'default.png' COMMENT '프로필 배너 이미지 경로',
  `user_grade` enum('GENERAL','BASIC','PRO') NOT NULL COMMENT '경력 등급',
  `user_role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER' COMMENT '사용자 권한',
  `create_datetime` datetime NOT NULL DEFAULT current_timestamp() COMMENT '회원 가입 일시'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='회원 정보 테이블';

--
-- 테이블의 덤프 데이터 `pin_users`
--

INSERT INTO `pin_users` (`user_no`, `user_id`, `user_pw`, `user_nickname`, `user_intro`, `user_image`, `user_banner`, `user_grade`, `user_role`, `create_datetime`) VALUES
(1, 'admin', '1234', '관리자', 'Ping 관리자 계정', 'default.png', 'default.png', 'PRO', 'ADMIN', '2026-01-27 13:22:16'),
(2, 'user1', '1234', '유저1', '일반 사용자입니다', 'default.png', 'default.png', 'GENERAL', 'USER', '2026-01-27 13:22:16'),
(3, 'user2', '1234', '유저2', '기본 등급 사용자입니다', 'default.png', 'default.png', 'BASIC', 'USER', '2026-01-27 13:22:16'),
(4, 'user3', '1234', '유저3', '전문가 사용자입니다', 'default.png', 'default.png', 'PRO', 'USER', '2026-01-27 13:22:16');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `pin_answers`
--
ALTER TABLE `pin_answers`
  ADD PRIMARY KEY (`answer_no`),
  ADD KEY `fk_pin_answers_pin` (`pin_no`),
  ADD KEY `fk_pin_answers_user` (`user_no`);

--
-- 테이블의 인덱스 `pin_categories`
--
ALTER TABLE `pin_categories`
  ADD PRIMARY KEY (`category_no`),
  ADD KEY `fk_pin_categories_group` (`group_no`);

--
-- 테이블의 인덱스 `pin_category_groups`
--
ALTER TABLE `pin_category_groups`
  ADD PRIMARY KEY (`group_no`);

--
-- 테이블의 인덱스 `pin_posts`
--
ALTER TABLE `pin_posts`
  ADD PRIMARY KEY (`post_no`),
  ADD KEY `fk_pin_posts_user` (`user_no`);

--
-- 테이블의 인덱스 `pin_post_categories`
--
ALTER TABLE `pin_post_categories`
  ADD PRIMARY KEY (`post_category_no`),
  ADD UNIQUE KEY `uk_pin_post_category` (`post_no`,`category_no`),
  ADD KEY `fk_pin_post_categories_category` (`category_no`);

--
-- 테이블의 인덱스 `pin_post_images`
--
ALTER TABLE `pin_post_images`
  ADD PRIMARY KEY (`image_no`),
  ADD KEY `fk_pin_post_images_post` (`post_no`);

--
-- 테이블의 인덱스 `pin_post_likes`
--
ALTER TABLE `pin_post_likes`
  ADD PRIMARY KEY (`like_no`),
  ADD UNIQUE KEY `uk_pin_post_user` (`post_no`,`user_no`),
  ADD KEY `fk_pin_post_likes_user` (`user_no`);

--
-- 테이블의 인덱스 `pin_questions`
--
ALTER TABLE `pin_questions`
  ADD PRIMARY KEY (`pin_no`),
  ADD KEY `fk_pin_questions_post` (`post_no`),
  ADD KEY `fk_pin_questions_image` (`image_no`),
  ADD KEY `fk_pin_questions_user` (`user_no`);

--
-- 테이블의 인덱스 `pin_question_categories`
--
ALTER TABLE `pin_question_categories`
  ADD PRIMARY KEY (`pin_question_category_no`),
  ADD UNIQUE KEY `uk_pin_question_category` (`pin_no`,`category_no`),
  ADD KEY `fk_pqc_category` (`category_no`);

--
-- 테이블의 인덱스 `pin_users`
--
ALTER TABLE `pin_users`
  ADD PRIMARY KEY (`user_no`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `user_nickname` (`user_nickname`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `pin_answers`
--
ALTER TABLE `pin_answers`
  MODIFY `answer_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '핀 답변 번호(PK)';

--
-- 테이블의 AUTO_INCREMENT `pin_categories`
--
ALTER TABLE `pin_categories`
  MODIFY `category_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `pin_category_groups`
--
ALTER TABLE `pin_category_groups`
  MODIFY `group_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `pin_posts`
--
ALTER TABLE `pin_posts`
  MODIFY `post_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시물 번호(PK)';

--
-- 테이블의 AUTO_INCREMENT `pin_post_categories`
--
ALTER TABLE `pin_post_categories`
  MODIFY `post_category_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시물-카테고리 연결 번호(PK)';

--
-- 테이블의 AUTO_INCREMENT `pin_post_images`
--
ALTER TABLE `pin_post_images`
  MODIFY `image_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '게시물 이미지 번호(PK)';

--
-- 테이블의 AUTO_INCREMENT `pin_post_likes`
--
ALTER TABLE `pin_post_likes`
  MODIFY `like_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '좋아요 기록 번호';

--
-- 테이블의 AUTO_INCREMENT `pin_questions`
--
ALTER TABLE `pin_questions`
  MODIFY `pin_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '핀 질문 번호(PK)';

--
-- 테이블의 AUTO_INCREMENT `pin_question_categories`
--
ALTER TABLE `pin_question_categories`
  MODIFY `pin_question_category_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '핀 질문-카테고리 연결 PK';

--
-- 테이블의 AUTO_INCREMENT `pin_users`
--
ALTER TABLE `pin_users`
  MODIFY `user_no` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '회원 번호 (PK)', AUTO_INCREMENT=5;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `pin_answers`
--
ALTER TABLE `pin_answers`
  ADD CONSTRAINT `fk_pin_answers_pin` FOREIGN KEY (`pin_no`) REFERENCES `pin_questions` (`pin_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pin_answers_user` FOREIGN KEY (`user_no`) REFERENCES `pin_users` (`user_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_categories`
--
ALTER TABLE `pin_categories`
  ADD CONSTRAINT `fk_pin_categories_group` FOREIGN KEY (`group_no`) REFERENCES `pin_category_groups` (`group_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_posts`
--
ALTER TABLE `pin_posts`
  ADD CONSTRAINT `fk_pin_posts_user` FOREIGN KEY (`user_no`) REFERENCES `pin_users` (`user_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_post_categories`
--
ALTER TABLE `pin_post_categories`
  ADD CONSTRAINT `fk_pin_post_categories_category` FOREIGN KEY (`category_no`) REFERENCES `pin_categories` (`category_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pin_post_categories_post` FOREIGN KEY (`post_no`) REFERENCES `pin_posts` (`post_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_post_images`
--
ALTER TABLE `pin_post_images`
  ADD CONSTRAINT `fk_pin_post_images_post` FOREIGN KEY (`post_no`) REFERENCES `pin_posts` (`post_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_post_likes`
--
ALTER TABLE `pin_post_likes`
  ADD CONSTRAINT `fk_pin_post_likes_post` FOREIGN KEY (`post_no`) REFERENCES `pin_posts` (`post_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pin_post_likes_user` FOREIGN KEY (`user_no`) REFERENCES `pin_users` (`user_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_questions`
--
ALTER TABLE `pin_questions`
  ADD CONSTRAINT `fk_pin_questions_image` FOREIGN KEY (`image_no`) REFERENCES `pin_post_images` (`image_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pin_questions_post` FOREIGN KEY (`post_no`) REFERENCES `pin_posts` (`post_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pin_questions_user` FOREIGN KEY (`user_no`) REFERENCES `pin_users` (`user_no`) ON DELETE CASCADE;

--
-- 테이블의 제약사항 `pin_question_categories`
--
ALTER TABLE `pin_question_categories`
  ADD CONSTRAINT `fk_pqc_category` FOREIGN KEY (`category_no`) REFERENCES `pin_categories` (`category_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pqc_pin` FOREIGN KEY (`pin_no`) REFERENCES `pin_questions` (`pin_no`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
