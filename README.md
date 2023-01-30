# CouCuBook 커쿠북
<img width="100" src="./coucubook-app/assets/icon.png" alt="로고">  

---
## Description

- React-Native, Typescript를 활용한 커플쿠폰북 앱 만들어 배포하기 개인 프로젝트  
- 상대방을 위해 직접 만들어 선물하는 커플 쿠폰북  
- 개발기간: 2022.12.21 ~ 2023.01.17  
- 개발환경: Expo managed workflow
- 맡은 역할: 1인 개발로 모든 과정(기획, 개발, 배포 등)

---

## 다운로드
구글 플레이 스토어 : <a href='https://play.google.com/store/apps/details?id=com.mokdasoo.coucubookapp'>링크</a>  

앱스토어 : <a href='https://apps.apple.com/us/app/coucubook-%EC%BB%A4%EC%BF%A0%EB%B6%81/id1666187593'>링크</a>  

---

## 기술
<img src="https://img.shields.io/badge/react native-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=Expo&logoColor=white"/><img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/><br/>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"/>
</br>
<img src="https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white"/><img src="https://img.shields.io/badge/Google AdMob-EA4335?style=for-the-badge&logo=Google AdMob&logoColor=white"/>
</br>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/><img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white"/><img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=black"></br>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/notion-FFFFFF?style=for-the-badge&logo=notion&logoColor=black"> <img src="https://img.shields.io/badge/VS Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/><img src="https://img.shields.io/badge/WebStorm-29ABE2?style=for-the-badge&logo=WebStorm&logoColor=white"/><img src="https://img.shields.io/badge/DataGrip-2AB1AC?style=for-the-badge&logo=DataGrip&logoColor=white"/>

---
## 프로젝트 화면 구성
<img width='100%' src="./readme_img/커쿠북앱구성도2.png" alt="사진">
</br>

## 프로젝트 소개

<img width='100%' src="./readme_img/shot1.png" alt="사진">
</br>

- 앱의 첫 화면
- 로그인 화면
</br>

---

<img width='50%' src="./readme_img/shot2.png" alt="사진">

- 카카오, 애플 간편 로그인 기능
</br>

---

<img width='70%' src="./readme_img/shot3.png" alt="사진">

- 필수 정보 입력 화면
</br>

---

<img width='70%' src="./readme_img/shot4.png" alt="사진">

- 첫 번째 탭, 메인이미지 화면
- 사진 변경 시 사진은 서버에 저장되어 본인과 연인에게 동시 적용
- 기념일 날짜 계산하여 디데이 표시 
</br>

---

<img width='100%' src="./readme_img/shot5.png" alt="사진">

- 두 번째 탭, 선물받은 쿠폰북 보관함 화면
- 선물받은 쿠폰북들 리스트로 확인 가능
- 쿠폰북 누르면 쿠폰북 상세화면 으로 이동(쿠폰 목록들 볼 수 있음)
- 쿠폰 누르면 쿠폰 상세화면 으로 이동(쿠폰 사용 기능) 
</br>

---

<img width='100%' src="./readme_img/shot6.png" alt="사진">

- 세 번째 탭,  쿠폰북 제작 보관함 화면
- 제작한 쿠폰북들 리스트로 확인 가능, 쿠폰북 제작, 수정 삭제 기능
- 우측 상단 쿠폰북 만들기 누르면 쿠폰북 제작 화면 으로 이동
- 쿠폰북 정보 입력, 쿠폰들 추가 할 수 있음, 쿠폰 개수 더 늘리고 싶으면 광고 시청하면 리워드 5개씩 제공
- 선물하기 전인 쿠폰북은 저장하면 폰 로컬 내부에 저장됨, 선물 해야 서버 DB에 저장
</br>

---

<img width='70%' src="./readme_img/shot7.png" alt="사진">

- 네 번째 탭,  설정 화면
- 로그아웃 기능
- 회원 정보 수정, 회원 탈퇴 기능
- 커플 정보 수정, 인연 끊기 기능
</br>


---

##  <a href='https://pineapple-spatula-1be.notion.site/e530cfbe51ac45f38c2022e014409e43'>✍️ 기능 명세 </a>
##  <a href='https://dg-studio.gitbook.io/coucubook-api/'>💻 API </a>
