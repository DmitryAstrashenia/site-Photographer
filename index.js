window.addEventListener("scroll", onScroll);

function sendMessage() {
  let form = document.querySelector(".section-form");
  let input = form.querySelectorAll("input");
  let name = input[0];
  let phone = input[1];
  let email = input[2];
  let text = form.querySelector("textarea");
  let data = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    text: text.value,
  };

  if (validAll(name, phone, email)) {
    fetch("../mail/mail.php", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(function (res) {
      if (res) {
        alert("Сообщение отправлено");
      } else {
        alert("Ошибка отправления сообщения!");
      }
    });
    name.value = "";
    phone.value = "";
    email.value = "";
    text.value = "";
  }
}

function validName(event, name) {
  let data = event.target || name;
  if (data.value.length > 1) {
    data.classList.remove("err");
    return true;
  } else {
    data.classList.add("err");
    return false;
  }
}

function validPhone(event, phone) {
  const rex = /\d/g;
  const rex375 = /^375\d{9}$/;
  let data = event.target || phone;
  if (data.value.match(rex)) {
    const result = data.value.match(rex).join("");
    if (result.match(rex375)) {
      data.classList.remove("err");
      return true;
    }
  } else {
    data.classList.add("err");
    return false;
  }
}

function validEmail(event, email) {
  const rex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  let data = event.target || email;
  if (data.value.match(rex)) {
    data.classList.remove("err");
    return true;
  } else {
    data.classList.add("err");
    return false;
  }
}

function validAll(name, phone, email) {
  let count = 0;
  let validArr = [
    validName(false, name),
    validPhone(false, phone),
    validEmail(false, email),
  ];
  validArr.forEach((item) => {
    if (!item) {
      count++;
    }
  });

  return !count;
}

function onScroll() {
  let sectionAbout = document.querySelector(".section-about");
  let indicator = document.querySelectorAll(".indicator");
  let indicatorPS = indicator[0];
  let indicatorIndesign = indicator[1];
  let indicatorXD = indicator[2];
  let digitPS = document.querySelector(".digit-ps");
  let digitIndesign = document.querySelector(".digit-indesign");
  let digitXD = document.querySelector(".digit-xd");
  let startPS = 0;
  let endPS = 100;
  let startIndesign = 0;
  let endIndesign = 70;
  let startXD = 0;
  let endXD = 80;

  if (
    window.pageYOffset >
    sectionAbout.getBoundingClientRect().top - window.innerHeight / 2
  ) {
    setTimeout(() => {
      let progressPS = setInterval(() => {
        indicatorPS.style.width = `${++startPS}%`;
        digitPS.innerHTML = `${startPS}%`;

        indicatorIndesign.style.width = `${
          startIndesign < endIndesign
            ? (startIndesign += endIndesign / endPS)
            : startIndesign
        }%`;
        digitIndesign.innerHTML = `${Math.round(startIndesign)}%`;

        indicatorXD.style.width = `${
          startXD < endXD ? (startXD += endXD / endPS) : startXD
        }%`;
        digitXD.innerHTML = `${Math.round(startXD)}%`;

        if (startPS == endPS) {
          clearInterval(progressPS);
        }
      }, 12);
    }, 1000);

    this.removeEventListener("scroll", onScroll);
  }
}
