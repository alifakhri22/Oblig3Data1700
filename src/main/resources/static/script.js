function formSubmit() {
    const billett = {
        antall: $("#antall").val(),
        etternavn: $("#etternavn").val(),
        fornavn: $("#fornavn").val(),
        film: $("#film").val(),
        tlf: $("#tlf").val(),
        epost: $("#epost").val(),
    };
//billett
    //if setningene
    //viss godkjent
    //post lagre
    const tlfRegex = /^\d{8}$/;
    if (!tlfRegex.test(billett.tlf)) {
        alert("Trenger gyldig tlfnr (8 siffer)");
        return;
    }

    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!epostRegex.test(billett.epost)) {
        alert("Skriv gyldig epostadresse");
        return;
    }
    $.post("/lagre", billett, function () {
        hentAlle();
    });

}

    function hentAlle() {
        $.get("/hentAlle", function (data) {
            formaterData(data);
        });
    }

    function formaterData(billetter) {
        let ut = `
        <table class="table-striped">
            <tr>
                <th>Etternavn</th>
                <th>Fornavn</th>
                <th>Film</th>
                <th>Antall</th>
                <th>TLF</th>
                <th>Epost</th>
            </tr>`;
        for (const billett of billetter) {
            ut += `
            <tr>
                 <td>${billett.fornavn}</td>
                <td>${billett.etternavn}</td>
                <td>${billett.film}</td>
                <td>${billett.antall}</td>
                <td>${billett.tlf}</td>
                <td>${billett.epost}</td>   
            </tr>`;
        }

        ut += "</table>";
        $("#tabell").html(ut);
    }

function slettAlt() {
    $.get("/slettAlt", function () {
        hentAlle();
    });
}
