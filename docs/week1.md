1. 백스테이지 템플릿 1개씩 금주 토요일 오전 10시까지 공유, 이후 투표로 결정
   - 사이트는 자유롭게 이용하며 되도록 무료버전으로
   - https://vercel.com/templates/next.js 등 자유로운 템플릿 사이트 이용
   - 되도록 스포티파이 백스테이지같이 탭바가 있는 형식 (https://backstage.spotify.com/)

2. 투표를 통해 템플릿 선정 이후 자신의 깃헙 레포에서 해당 백스테이지 템플릿을 도커이미지로 만든후 로컬에서 도커 이미지 빌드하는 깃헙 액션 ci yaml작성
3. nestjs이용해서 자기 자신 github repo에 있는 issue 긁어오는 api만들어 보기
4.(옵션) eks 생성 테라폼 작성
5.(옵션) github repo에서 tag생성시 issue를 생성해주는 커스텀 액션 개발

## TodoList

+ [x] 백스테이디 템플릿 선정
+ [x] github runner local에 설치
+ [ ] Next, Nest 프로젝트를 도커로 이미지 빌드하는 Github Action CI yaml 작성
+ [ ] Nest 통해 자신의 github repo에 있는 issue 긁어오는 api 구현
+ [ ] AWS 스터디용 계정 생성
+ [ ] (옵션) eks 생성 테라폼 작성
+ [ ] (옵션) github repo에서 tag생성 시 issue를 생성해주는 커스텀 액션 개발
