let films = [
    { title: "Inception", year: 2010, genre: "Sci-fi, Akció", rating: 8.8 },
    { title: "Interstellar", year: 2014, genre: "Sci-fi, Kaland", rating: 8.6 },
    { title: "Shutter Island", year: 2010, genre: "Thriller", rating: 8.2 },
    { title: "Tenet", year: 2020, genre: "Sci-fi, Akció", rating: 7.3},
    { title: "The Silence Of The Lambs", year: 1991, genre: "Horror, Krimi", rating: 8.5},
    { title: "Zodiac", year: 2007, genre: "Thriller, Krimi", rating: 7.7}
];

document.getElementById("filmForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let year = document.getElementById("year").value;
    let genre = document.getElementById("genre").value.trim();
    let rating = document.getElementById("rating").value;

    if (title.length < 2 || genre.length < 3 || rating < 0 || rating > 10 || year < 1900 || year > 2025) {
        alert("Hibás adatok! Kérlek ellenőrizd a mezőket.");
        return;
    }

    let film = { title, year, genre, rating };
    films.push(film);
    updateTable();
});

function updateTable() {
    let tableBody = document.querySelector("#filmTable tbody");
    tableBody.innerHTML = "";

    films.forEach((film, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.genre}</td>
            <td>${film.rating}</td>
            <td>
                <button onclick="editFilm(${index})">Szerkesztés</button>
                <button onclick="deleteFilm(${index})">Törlés</button>
            </td>
        `;
    });
}

function editFilm(index) {
    let film = films[index];
    document.getElementById("title").value = film.title;
    document.getElementById("year").value = film.year;
    document.getElementById("genre").value = film.genre;
    document.getElementById("rating").value = film.rating;

    films.splice(index, 1);  // Az aktuális filmet eltávolítjuk, hogy újként lehessen menteni
    updateTable();
}

function deleteFilm(index) {
    films.splice(index, 1);
    updateTable();
}

updateTable();

function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let table = document.getElementById("filmTable");
    let rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let match = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerHTML.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}
let sortDirections = [true, true, true, true];

function sortTable(columnIndex) {
    let table = document.getElementById("filmTable");
    let rows = Array.from(table.rows).slice(1);
    let ascending = sortDirections[columnIndex];

    let sortedRows = rows.sort((a, b) => {
        let valA = a.cells[columnIndex].innerHTML;
        let valB = b.cells[columnIndex].innerHTML;
        
        if (!isNaN(valA) && !isNaN(valB)) {
            return ascending ? valA - valB : valB - valA;
        } else {
            return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });

    sortedRows.forEach(row => table.appendChild(row));
    sortDirections[columnIndex] = !ascending;
}