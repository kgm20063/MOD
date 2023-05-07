const $input = document.querySelector("input");
const $search_btn = document.querySelector("button");
const $list = document.querySelector(".autocomplete > ul");
const $result = document.querySelector(".result");
let index = 0; // ~

$input.addEventListener("input", () => {
  $list.textContent = null; // 계속 추가 되는 것을 막아줌
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));
  stlist.sort(function (a, b) {
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

  stlist.slice(0, 10).forEach((e) => {
    const li = document.createElement("li");
    const replaceText = e.station_nm.replace(inputValue, `<span class="same">${inputValue}</span>`); // 입력한 value값과 같은 문자를 span태그로 감싸게 하고 클래스 same을 넣음
    li.innerHTML = `${replaceText} ${e.line_num}`;
    $list.append(li);
  });
  if (inputValue == "") $list.textContent = null;
});

// ~
$input.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  if (e.keyCode == 40) {
    let $lis = document.querySelectorAll(".autocomplete>ul>li");
    $lis.forEach((e) => {
      e.classList.remove("active");
    });
    if (index == 10) index = 0;
    $lis[index].classList.add("active");
    $input.value = $lis[index].textContent;
    index++;
  }
});
// ~

$search_btn.addEventListener("click", () => {
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));
  $result.innerHTML = ""; // 계속 추가 되는 것을 막아줌
  if (inputValue === "") return;
  stlist.sort(function (a, b) {
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
