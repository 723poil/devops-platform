# DevOps 플랫폼 개발 스터디 (2024.03.28 ~ )
DevOps 플랫폼을 인프라, 프론트, 백엔드 전부 직접 개발해보면서 경험해보는 스터디

[page](https://github.com/723poil/devops-platform-page)

+ 주차별
  + [1주차](./docs/week1.md)
  + [2주차](./docs/week2.md)

## 구상도
![image](https://github.com/723poil/devops-platform/assets/75459370/3c6c1910-80c4-4bb5-b7b5-9373c4ecdfe8)


## skills

| | |
|--|--|
|CI/CD|Github Action, Github Kanban, ArgoCd|
|Infra|AWS, k8s(eks)|
|IaC|Terraform, Helm|
|Monitoring|Grafana, Prometheus, Loki, Tempo, OpenTelemetry, Fluentbit|
|Front|Next.js|
|Back|Nest.js|


## Backstage

|카테고리|구현|구현 상세|
|--|--|--|
|쿠버네티스|클러스터 정보|클러스터명, pod갯수, restart현황, 클러스터 cpu - memory - ip, 클러스터 health check|
||마이크로 서비스 정보|pod갯수, status(running, restart수 등), pod cpu - memory - network, 할당된 워커노드 ip, HPA 발생시간, 최근 배포 시간 및 이미지 이름|
|배포|전체 배포 수(기간설정가능)||
| |롤백 정보(기간설정 or 특정 서비스 선택 가능)|롤백한 마이크로 서비스 이름, 롤백된 이미지 정보, 롤백된 pod수, 배포 방식(롤링, 블루그린 등)|
||마이크로 서비스 정보|배포 현황(특정 환경별 이미지 및 담당자), 현재 prd 배포 이미지 수 정보|
||어뷰징|누가 워크플로우를 어기고 배포시도를 했는지|
|이벤트|엔드포인트로 이벤트 보내기 설정||
||이벤트 받을사람 지정||
||이벤트 알람 push 이력||
