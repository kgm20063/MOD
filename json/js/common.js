const $container = document.querySelector(".container");

async function $main() {
  let posts = await fetch("./json/posts.json").then((res) => res.json());
  let members = await fetch("./json/members.json").then((res) => res.json());
  let categorys = await fetch("./json/categorys.json").then((res) => res.json());
  console.log(posts);
  console.log(members);

  posts.forEach((Arr) => {
    const $box = document.createElement("div");
    const $imgBox = document.createElement("div");
    const $title = document.createElement("h4");
    const $contents = document.createElement("h5");
    const $name = document.createElement("p");
    const $date = document.createElement("p");
    const memberIndex = Arr.memberIndex;
    const $memberName = members[memberIndex].name;

    $box.classList.add("box");
    $imgBox.classList.add("imgBox");
    $title.classList.add("title");
    $contents.classList.add("contents");
    $name.classList.add("name");
    $date.classList.add("date");

    $title.innerText = `${Arr.title}`;
    $contents.innerText = `${Arr.contents}`;
    $name.innerHTML = `by ${$memberName}`;
    $date.innerText = `${Arr.date}`;
    $box.innerHTML = `<hr>`;

    $container.append($box);
    $box.append($imgBox);
    $box.append($title);
    $box.append($contents);
    $box.append($name);
    $box.append($date);
  });
}
$main();
