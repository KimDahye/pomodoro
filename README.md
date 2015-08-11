# pomodoro

## 뽀모도로 테크닉이란?
1. plan : 일 목록이라고 하는 백로그에서 가장 중요한 일을 추려내고 할 일 목록에 이 일들을 적는 것으로 하루 시작.
2. track: 25분으로 맞추고 첫번째 일을 시작. 이동안 프로세스 측정지표를 몇가지 모은다. 내부 방해, 외부 방해 몇번인지 등
3. record: 하루 정리할 때, 그날 관찰한 것을 정리 - 방해받은 숫자 기록
4. process: 가공하지 않은 자료 -> 정보로 바꾸기. ie. 평균 몇번의 방해가 있었나. 등
5. visualize: 정보를 조직화. 일일회고에 해당, 업무 습관을 현실에 맞춘다.  

## 뽀모도로 테크닉에 필요한 것: 타이머와 종이 세장
* 종이1: TO Do Today(오늘 할 일) - 오늘 날짜, 내이름, 오늘 하기로 계획한 일 목록 (매일 아침에 오늘 할 일을 다시 작성)
* 종이2: Acitivity Inventory(일 목록): 내 이름, 앞으로 할 일들을 순서 두지 않고 기록, 날마다 같은 일 목록을 사용하는데, 새로운 일을 추가하고 끝낸 일에 줄을 긋는다.
* 종이3: Records(기록지) - 프로세스 개선에 사용할 프로세스 측정 지표를 기록한다. 오늘의 축정치와 이전 측정치를 비교하기 위해서, 날마다 같은 기록지를 사용한다. 

## 기능
* timer 모듈
* 서비스 처음 시작할 때, 그리고 언제든지 Activity Inventory에 할 일을 넣을 수 있다. - 메모리에 저장되어야 한다.
* 하루의 처음에 이 서비스를 켰을 때, 오늘 할 일을 Activity Inventory에서 가져온다.
* 오늘 할일 페이지에서 몇 뽀모도로가 걸릴지 예상한다.
* 오늘 할 일 페이지를 완료하면, 메모리에 저장되어야 한다.
* 뽀모도로 마치기를 누를 때까지, 타이머가 돌아간다. 
* 뽀모도로 25분 시작될 때 오늘 할 일에서 집중해야 하는 일을 선택한다.
* 할일을 선택하면 타이머가 돌아간다. 타이머가 끝나면 notification 해준다. (알람음과 함께 mac app처럼 notification 창 나온다)
* 타이머가 끝나면 이 일을 어느정도 했는지, 끝마쳤는지 기록할 수 있다.
* 뽀모도로 마치기를 누르면, 오늘의 통계 페이지가 보인다. 통계 페이지는 언제나 볼 수 있긴 하다.

## 확장프로그램 vs 웹서비스
* 뽀모도로 테크닉을 위한 구글 확장 프로그램가..
    - 브라우저에 종속되지 않은 윈도우로서 mac application 처럼 작용할 수 있나? 그러지 못한다면 그냥 site로 만들어야 함.
    - 구글 확장프로그램에서 DB로 로컬 메모리를 사용할 수 없다면 그냥 site로 만들어야 함

## 일정 계획
* 8/18: 구글 확장 프로그램 윈도우형으로 만들어보기, notification 기능 붙여보기 
* 8/25: Acitivity Inventory 기능을 구현한다. 여기서 오늘 할 일을 뽑을 수 있도록 한다.
* 9/1:  timer 모듈 만들고 붙이기 - 25, 5분 4번 정도 돌면 long break를 갖을 수 있도록.... notification 기능 붙이기
* 9/8: 통계 페이지에 보일 chart 만들기 - canvas 공부하기, 통계 페이지 완성하기 - 하루를 시계로 표현하여 그 시계 안에 몇개의 뽀모도로 했는지 - 그 뽀모도로에서 한 게 뭔지, break는 언제 가졌는지, 오늘 하루 몇개의 방해를 받았는지가 기록되어 있다.
* 9:15: 통계 페이지까지 완성. 그리고 서버가 혹시 필요하다면 서버와 붙이기.
* 언젠가: webWorker, promise 공부하기
