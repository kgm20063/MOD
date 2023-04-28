const $input = document.querySelector("input");
const $search_btn = document.querySelector("button");
const $list = document.querySelector(".autocomplete > ul");
const $result = document.querySelector(".result");

$input.addEventListener("input", () => {
  $list.textContent = null; // 계속 추가 되는것을 막아줌
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));

  stlist.slice(0, 10).forEach((e) => {
    const li = document.createElement("li");
    const replaceText = e.station_nm.replace(inputValue, `<span class="red">${inputValue}</span>`); // 입력한 value값과 같은 문자를 span태그로 감싸게 하고 클래스 red를 넣음
    li.innerHTML = `${replaceText} ${e.line_num}`;
    $list.append(li);
  });
  if (inputValue == "") $list.textContent = null;
});

$search_btn.addEventListener("click", () => {
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));
  $result.innerHTML = "";
  stlist.sort(function (a, b) {
    const aa = a.station_nm;
    const bb = b.station_nm;
    if (aa < bb) {
      return -1;
    }
    if (aa > bb) {
      return 1;
    }
    return 0;
  });

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
