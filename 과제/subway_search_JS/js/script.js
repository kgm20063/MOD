const $input = document.querySelector("input");
const $search_btn = document.querySelector("button");
const $list = document.querySelector(".autocomplete > ul");
const $result = document.querySelector(".result");

// async function getData() {
//   await stationList.data.forEach((e) => {
//     const keys = Object.values(e);

//   });
// }
// getData();

// input
$input.addEventListener("input", () => {
  $list.textContent = null; // 계속 추가 되는것을 막아줌
  const inputValue = $input.value;
  const stList = stationList.data.filter((e) => e.station_nm.includes(inputValue));

  stList.slice(0, 10).forEach((e) => {
    const li = document.createElement("li");
    li.textContent = `${e.station_nm} ${e.line_num}`;
    $list.append(li);
  });
  if (inputValue == "") $list.textContent = null;
});

// button
$search_btn.addEventListener("click", () => {
  const inputValue = $input.value;
  const stlist = stationList.data.filter((e) => e.station_nm.includes(inputValue));
  // stlist.forEach((e) => {
  //   e.station_cd;
  // });
  // timeList.data.forEach((e) => console.log(e.station_cd));

  stlist.forEach((list) => {
    list.textContent = null;
    const div = document.createElement("div");
    timeList.data.forEach((e) => {
      if (list.station_cd === e.station_cd) {
        div.textContent = `${list.station_nm} ${list.line_num} ${e.first_time} ${e.last_time}`;
        $result.append(div);
      }
    });
  });
});
