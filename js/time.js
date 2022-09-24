const $date = document.querySelector(".date");
export function localTime() {
  let $clock = document.querySelector(".clock");

  function clock() {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function timeoutHandler() {
      await sleep(1)
      let clockHour = new Date().toLocaleTimeString();
      $clock.innerHTML = `<p>${clockHour}</p>`;
    }
    setInterval(timeoutHandler, 1000);

    $clock.classList.remove("hidden");
    $date.classList.remove("hidden");

  }

  function hiddenClock() {
    $clock.classList.add("hidden");
    $date.classList.add("hidden");

  }

  return {
    clock,
    hiddenClock
  }

}

export function weekday() {
  const date = new Date();

  let options = {
    weekday: "long",
    day: "2-digit",
    month: "long"
  },
    now = date.toLocaleString("es-MX", options);

  $date.innerHTML = `<p>${now}</p>`

}


