export default function tableHistory() {

    let dataLocal = localStorage.getItem("TimeRecord"),
        tbody = document.querySelector("#tableHistory tbody"),
        history = [];

    dataLocal == null ?
        history = [] :
        history = JSON.parse(dataLocal);


    let currentPage = 1,
        rows = 8;

    function displayList(items, rows_per_page, page) {
        tbody.innerHTML = "";
        page--;

        let star = rows_per_page * page,
            end = star + rows_per_page,
            paginatedItems = items.slice(star, end);

        paginatedItems.forEach(item => {
            let tr = document.createElement("tr"),
                tdName = document.createElement("td"),
                tdTemp = document.createElement("td"),
                tdTempMax = document.createElement("td"),
                tdTempMin = document.createElement("td");

            tdName.innerHTML = item.Nombre;
            tdTemp.innerHTML = item.Tem;
            tdTempMax.innerHTML = item.TemMax;
            tdTempMin.innerHTML = item.TemMin;

            tr.appendChild(tdName);
            tr.appendChild(tdTemp);
            tr.appendChild(tdTempMax);
            tr.appendChild(tdTempMin);

            tbody.appendChild(tr);

        });
    }

    displayList(history, rows, currentPage);

    let tableHistory = document.getElementById("tableHistory"),
        clear = document.getElementById("clear"),
        next = document.getElementById("next"),
        previus = document.getElementById("previus");

    history.length > 0 ? tableHistory.classList.remove("hidden") || clear.classList.remove("hidden") : ""

    rows < history.length ? next.classList.remove("hidden") || previus.classList.remove("hidden") : ""


    document.addEventListener("click", (e) => {
        let pageCount = Math.ceil(history.length / rows);

        if (e.target.matches("#next")) {
            pageCount > currentPage ? currentPage++ && displayList(history, rows, currentPage) : ""
        }

        if (e.target.matches("#previus")) {
            currentPage > 1 ? currentPage-- && displayList(history, rows, currentPage) : ""
        }

        if (e.target.matches("#clear")) localStorage.removeItem("TimeRecord") || location.reload()

    });
}