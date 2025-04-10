const apiUrl = "http://gamf.nhely.hu/ajax2/";
const userCode = "BBBBBBefg456";

async function readData() {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${userCode}&op=read`,
    });

    const data = await response.json();

    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.list.forEach(record => {
        const row = `
            <tr>
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.height}</td>
                <td>${record.weight}</td>
                <td>${record.code}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    const heights = data.list.map(record => parseFloat(record.height));
    const sum = heights.reduce((a, b) => a + b, 0);
    const avg = (sum / heights.length).toFixed(2);
    const max = Math.max(...heights);

    console.log(`Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`);
}
readData();

document.querySelector("#createForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim().substring(0, 30);
    const height = document.querySelector("#height").value.trim();
    const weight = document.querySelector("#weight").value.trim();

    if (!name || !height || !weight) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${userCode}&op=create&name=${name}&height=${height}&weight=${weight}`,
    });

    const result = await response.text();
    console.log(result);

    alert("Sikeresen hozzáadva!");
    readData();
});

document.querySelector("#updateForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.querySelector("#updateId").value.trim();
    const name = document.querySelector("#updateName").value.trim().substring(0, 30);
    const height = document.querySelector("#updateHeight").value.trim();
    const weight = document.querySelector("#updateWeight").value.trim();

    if (!id || !name || !height || !weight) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${userCode}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`,
    });

    const result = await response.text();
    console.log(result);

    alert("Sikeres frissítés!");
    readData();
});

document.querySelector("#getDataForId").addEventListener("click", async () => {
    const id = document.querySelector("#updateId").value.trim();

    if (!id) {
        alert("Az ID mező nem lehet üres!");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `code=${userCode}&op=read`,
        });

        const data = await response.json();
        const record = data.list.find(item => item.id == id);

        if (record) {
            document.querySelector("#updateName").value = record.name;
            document.querySelector("#updateHeight").value = record.height;
            document.querySelector("#updateWeight").value = record.weight;
            alert("Az adatok betöltve!");
        } else {
            alert("Nem található ilyen ID!");
        }

    } catch (error) {
        console.error("Hiba történt:", error);
        alert("Hiba történt az adatok betöltésekor.");
        document.querySelector("#updateId").value = "";
        document.querySelector("#updateName").value = "";
        document.querySelector("#updateHeight").value = "";
        document.querySelector("#updateWeight").value = "";
    }
});


document.querySelector("#deleteForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.querySelector("#deleteId").value.trim();

    if (!id) {
        alert("Az ID mezőt ki kell tölteni!");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${userCode}&op=delete&id=${id}`,
    });

    const result = await response.text();
    console.log(result);

    alert("Sikeres törlés!");
    readData();
});


