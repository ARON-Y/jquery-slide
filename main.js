$(document).ready(function () {
  //다음 버튼 이벤트가 발생하면 보여질(display none을 주고 .on class가 활성화 됐을때 displat block으로 보일거라서) 채널의 순번을 구하여 슬라이딩을 한다.

  var len = $(".panel>li").length;
  var enableClick = true;

  $(".next").on("click", function (e) {
    e.preventDefault();

    if (enableClick) {
      enableClick = false;
      var current_index = $(".panel>li").filter(".on").index();
      //여기서의 filter는 find와 같은 개념. li중 on이 있는 index만 걸러달라는 뜻. 자바스크립트와는 다른 메서드라고 생각하기!
      var next_index;

      if (current_index != len - 1) {
        //최종 index를 구하기 위해 len - 1을 해주었다.
        next_index = current_index + 1;
        //최종적인 4 index의 next는 0 index로 가야한다.
      } else {
        next_index = 0;

        /* current_index가 4인덱스(li는 5개가 있으므로)가 아닐때는 -1을 해주지만 그게 아닐때는 0번째 인덱스로 가야한다.
      if (current_index == len - 1) {
      next_index = 0;
    } else {
      next_index = current_index + 1; 도 같은 의미의 코딩이다.
      current_index가 전체 길이의 -1과 같다면(4) 다음 인덱스는 0번째 인덱스이고 그게 아니면 다음 인덱스는 current_index에 + 1을 해주세요.
      */
      }

      moveNext(next_index);
    }
  });

  function moveNext(index) {
    $(".panel>li")
      .filter(".on")
      .stop()
      .animate({ left: "-100%" }, 500, function () {
        $(this).removeClass("on").hide();
      });
    /* animate(); : 제이쿼리 문법, 애니메이션 효과를 만든다. .animate(해당값, 지속시간, (가속도), 이후에 적용될 코드(콜백) )
지속시간 기본값 = 400(0.4s) fast, slow로도 사용이 가능. fast = 200, slow =600
가속도 = swing, linear 기본값이 swing. 

.stop() 메서드의 중요성 : 애니메이션 함수를 구현할 때 이전 애니메이션이 멈추기 전까지 애니메이션이 동작하지 않는 현상이 있다.(원인은 js 안에 있는 콜스텍 큐)
stop은 현재 동작하고 있는 애니메이션을 즉시 동작 중단 시키고 다음 애니메이션을 적용하도록 한다. */
    $(".panel>li")
      .eq(index)
      .show()
      .css({ left: "100%" })
      .animate({ left: "0%" }, 500, function () {
        $(this).addClass("on");
        enableClick = true;
        /* hide(), show() 애니메이션을 나타내고, 사라지게 하는 메소드. fadein, fadeout 메소드와 비슷하지만 분명한 차이가 있다. css()메소드는 제이쿼리가 스타일에 접근하는 것이다.
  css(요소, 값) 으로 적용시킨다. 하지만 여러개의 효과를 넣어야 할 때는 css({요소:값, 요소:값}) 으로 적용한다. */
      });

    $(".navi>li").children("a").removeClass("on");
    // node의 문제 때문에 .navi>li>a로 들어가지 않고 구분해준 것이다. 정확한 요소 노드를 명시해 주기 위함이라고 생각할 것!
    $(".navi>li").eq(index).children("a").addClass("on");
  }

  $(".prev").on("click", function (e) {
    e.preventDefault();
    if (enableClick) {
      enableClick = false;
      // var current_index = $(".panel>li").filter(".on").index(); 아래 코딩과 같은말
      var current_index = $(".panel>li.on").index();
      var prev_index;
      if (current_index == 0) {
        //이전으로 가는 버튼이 0번째 인덱스에 있는 상태라면
        prev_index = len - 1;
        //전체 길이의 -1을 해준 값으로 이동을 해주어야 한다. (총 5개의 li중에서 0번째 인덱스의 -1은 4번째 인덱스이다.)
      } else {
        prev_index = current_index - 1;
        //그게 아니라면 그냥 타겟 인덱스에서 -1 한 값으로 이동 해주세요. (4번째 인덱스 -1 값 = 3번째 인덱스, 3번째 인덱스에서 -1 값 = 2번째 인덱스)
      }

      movePrev(prev_index);
    }
  });

  function movePrev(index) {
    $(".panel>li")
      .filter(".on")
      .stop()
      .animate({ left: "100%" }, 500, function () {
        $(this).removeClass("on").hide();
      });

    //eq(); 제이쿼리에서 많이 사용하는 메서드. 선택한 요소의 인덱스 번호에 해당하는 요소를 찾는다.
    $(".panel>li")
      .eq(index)
      .show()
      .css({ left: "-100%" })
      .animate({ left: "0%" }, 500, function () {
        $(this).addClass("on");
        enableClick = true;
      });

    $(".navi>li").children("a").removeClass("on");
    $(".navi>li").eq(index).children("a").addClass("on");
  }

  $(".navi>li").on("click", function (e) {
    e.preventDefault();

    var current_index = $(".panel > li.on").index();
    //지역변수 선언, 현재의 인덱스는 on이 활성화된 li의 인덱스
    var target_index = $(this).index();
    /*this = navi의 인덱스, 네비로 클릭한 해당 인덱스. current 인덱스와 target 인덱스를 비교해서 같으면 반응을 하지 않고(return) target 인덱스가 크면
    next로 이동, target 인덱스가 작으면 prev로 이동한다. */
    if (target_index == current_index) {
      return;
    }
    if (target_index > current_index) {
      //next으로 이동
      moveNext(target_index);
    }
    if (target_index < current_index) {
      //prev으로 이동
      movePrev(target_index);
    }
  });
});

/* js VS jquery 무엇을 공부해야 하는가?
웹 디자인, 웹 퍼블리셔만 할것이다? jq 80% js 20% 정도의 공부
웹 퍼블리셔 + @, 프론트엔드 쪽으로 생각이 있다면 js 80% jq 20%로 공부 */
