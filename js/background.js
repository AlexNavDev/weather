export default function background() {
    const $container = document.querySelector(".container"),
        date = new Date();

    let hour = date.getHours();

    function fondo(imagen) {
        $container.style.background = `url(img/${imagen}.jpg)`;
        $container.style.backgroundSize = "cover";
        $container.style.backgroungRepeat = "no-repeat";
        $container.style.backgroundPosition = "70%";

    }

    hour >= 7 && hour <= 18 ?
        fondo("earthSunny") :
        hour >= 19 && hour <= 23 ?
        fondo("earthNight") :
        fondo("earthNight")

}