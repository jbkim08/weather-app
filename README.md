# 🌦️ 날씨 대시보드 (Weather Dashboard)

실시간 날씨 정보와 5일간의 예보를 제공하는 현대적인 웹 애플리케이션입니다. React 19와 Tailwind CSS 4를 활용하여 제작되었으며, 직관적인 UI와 역동적인 사용자 경험을 제공합니다.

![Weather App Preview](./docs/weather.gif) <!-- 실제 스크린샷이 있다면 교체 가능 -->

## ✨ 주요 기능

- **실시간 날씨 조회**: 도시 이름을 입력하여 현재 기온, 습도, 풍속 및 날씨 상태를 즉시 확인할 수 있습니다.
- **5일 일기 예보**: 향후 5일간의 날씨 변화 추이를 한눈에 파악할 수 있습니다.
- **한글 검색 지원**: OpenWeather Geocoding API를 통합하여 한국어 도시명(예: 서울, 부산)으로도 검색이 가능합니다.
- **단위 변환**: 섭씨(°C)와 화씨(°F) 단위를 자유롭게 전환하여 온도를 확인할 수 있습니다.
- **다이내믹 배경**: 현재 날씨 상태(맑음, 비, 눈, 구름 등)에 따라 배경 그라데이션이 실시간으로 변화합니다.
- **최근 검색 기억**: LocalStorage를 활용하여 마지막으로 검색한 도시를 기억하고 다음 방문 시 자동으로 표시합니다.
- **반응형 디자인**: Glassmorphism 디자인 시스템을 적용하여 모바일과 데스크탑 어디서나 아름다운 화면을 보여줍니다.

## 🛠️ 기술 스택

- **Core**: React 19, TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS 4
- **API**: Axios (OpenWeatherMap API 연동)
- **Icons**: Lucide React

## 🚀 시작하기

### 1. 사전 준비

이 프로젝트를 실행하기 위해서는 [OpenWeatherMap](https://openweathermap.org/api)의 API 키가 필요합니다.

### 2. 설치 및 실행

```bash
# 저장소 복제
git clone https://github.com/your-username/weather-app.git

# 프로젝트 폴더로 이동
cd weather-app

# 의존성 설치
npm install

# 환경 변수 설정
# .env 파일을 생성하고 아래 내용을 입력하세요
VITE_OPENWEATHER_API_KEY=여러분의_API_키
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속하여 확인하세요.

## 📂 프로젝트 구조

```text
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── CurrentWeather   # 현재 날씨 표시
│   ├── ForecastItem     # 예보 아이템
│   ├── SearchBar        # 검색창
│   └── ErrorMessage     # 에러 메시지
├── types/               # TypeScript 인터페이스 정의
├── assets/              # 이미지 및 정적 자산
├── App.tsx              # 메인 애플리케이션 로직 및 상태 관리
└── index.css            # 글로벌 스타일 및 Tailwind 설정
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
