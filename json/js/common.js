const $container = document.querySelector(".container");
const $blur = document.querySelector(".blur");
const $popup = document.querySelector(".popup");
const $popupTitle = $popup.querySelector(".popupTitle");
const $popupContent = $popup.querySelector(".popupContent");
const $popupDate = $popup.querySelector(".popupDate");
const $popupName = $popup.querySelector(".popupName");

const state = {
  currentIndex: 0,
  maxIndex: 0,
  limit: 20,
};

window.addEventListener("scroll", function () {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.body;
  if (scrollY + innerHeight >= scrollHeight - 100) {
    $main();
  }
});

async function $main() {
  let posts = await fetch("./json/posts.json").then((res) => res.json());
  let members = await fetch("./json/members.json").then((res) => res.json());
  let categorys = await fetch("./json/categorys.json").then((res) =>
    res.json()
  );
  console.log(categorys);

  const sortDate = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  state.maxIndex = Math.ceil(posts.lenght / state.limit);

  const { currentIndex, maxIndex, limit } = state;
  if (currentIndex + 1 > maxIndex) return;
  const startIndex = currentIndex * limit;
  const endIndex = startIndex + limit;
  posts = posts.slice(startIndex, endIndex);

  posts.forEach((Arr) => {
    const $box = document.createElement("div");
    const $imgBox = document.createElement("div");
    const $title = document.createElement("h4");
    const $content = document.createElement("h5");
    const $date = document.createElement("h5");
    const $name = document.createElement("h5");
    const memberIndex = Arr.memberIndex;
    const $memberName = members[memberIndex].name;

    $box.addEventListener("click", function () {
      $blur.style.display = "block";
      $popup.style.display = "block";
      $popupTitle.textContent = Arr.title;
      $popupContent.textContent = Arr.contents;
      $popupDate.textContent = Arr.date;
      $popupName.innerHTML = `by <span>${$memberName}</span>`;
    });

    $blur.addEventListener("click", function () {
      $blur.style.display = "none";
      $popup.style.display = "none";
    });

    $box.classList.add("box");
    $imgBox.classList.add("imgBox");
    $title.classList.add("title");
    $content.classList.add("content");
    $date.classList.add("date");
    $name.classList.add("name");

    $title.innerText = `${Arr.title}`;
    $content.innerText = `${Arr.contents}`;
    $date.innerText = `${Arr.date}`;
    $name.innerHTML = `by <span>${$memberName}</span>`;

    $container.append($box);
    $box.append($imgBox);
    $box.append($title);
    $box.append($content);
    $box.append($date);
    $box.append($name);
  });
  state.currentIndex++;
}

$main();
