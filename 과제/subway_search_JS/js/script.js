const $input = document.querySelector("input");
const $search_btn = document.querySelector("button");
const $list = document.querySelector(".autocomplete > ul");
const $result = document.querySelector(".result");
let index = 0;

// 입력창에서 키워드 입력 시 키워드가 포함된 역들의 전체 역명과 노선 이름을 자동완성 리스트 형태로 표시한다.
$input.addEventListener("input", () => {
  index = 0;
  $list.textContent = null; // 계속 추가 되는 것을 막아줌
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));
  // 자동완성 리스트 요소는 역명 기준으로 오름차순 정렬한다.
  stlist.sort((a, b) => {
    let aa = a.station_nm;
    let bb = b.station_nm;
    if (aa < bb) {
      return -1;
    }
    if (aa > bb) {
      return 1;
    }
    return 0;
  });

  // 자동완성 리스트 요소는 10개 이상 표시하지 않는다.
  stlist.slice(0, 10).forEach((e) => {
    const li = document.createElement("li");
    const replaceText = e.station_nm.replace(inputValue, `<span class="same">${inputValue}</span>`); // 입력한 value값과 같은 문자를 span태그로 감싸게 하고 클래스 same을 넣음
    li.innerHTML = `<span>${replaceText}</span> <span>${e.line_num}</span>`;
    $list.append(li);
  });
  if (inputValue == "") $list.textContent = null;
});

// 아래쪽 방향키를 누를 시 위쪽부터 순서대로 자동완성 리스트의 요소가 하이라이트 되면서 해당 요소의 역명이 입력창에 자동으로 입력되고,
// 사용자가 직접 키워드를 수정하기 전 까지 자동완성 리스트를 유지 한다.
$input.addEventListener("keydown", (e) => {
  if (e.keyCode == 40) {
    let $lis = document.querySelectorAll(".autocomplete>ul>li");
    $lis.forEach((e) => {
      e.classList.remove("active");
    });
    // 마지막 요소가 하이라이트 된 상태에서 아래쪽 방향키를 누를 시 첫 번째 요소가 하이라이트 된다.
    if (index == $lis.length) index = 0;
    $lis[index].classList.add("active");
    $input.value = $lis[index].firstChild.textContent;
    index++;
  }
});

// 입력창에 키워드가 있는 상태에서 ‘검색' 버튼이나 'Enter' 키를 누르면 키워드가 포함된 역들의 정보를 볼 수 있다.
$search_btn.addEventListener("click", () => {
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));
  $result.innerHTML = ""; // 계속 추가 되는 것을 막아줌
  if (inputValue === "") return;
  // 검색결과는 역이름을 기준으로 오름차순 정렬한다.
  stlist.sort((a, b) => {
    let aa = a.station_nm;
    let bb = b.station_nm;
    if (aa < bb) {
      return -1;
    }
    if (aa > bb) {
      return 1;
    }
    return 0;
  });

  // 검색결과에는 역명, 노선 이름, 첫차/막차 시간표
  stlist.forEach((list) => {
    const div = document.createElement("div");
    timeList.data.forEach((time) => {
      if (list.station_cd === time.station_cd) {
        div.innerHTML = `<span>${list.station_nm}역</span> ${list.line_num} <span>첫차: ${time.first_time}</span> <span>막차: ${time.last_time}</span>`;
        $result.append(div);
      }
    });
  });
});
