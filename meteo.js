






function recuperationVille() {


    // document.querySelector(".").innerHTML = meteo.timezone
    let btnValider = document.getElementById("btn-valider")

    btnValider.addEventListener("click", async function (event) {
        event.preventDefault();
        let input = document.getElementById("ville")
        if (input.value === "") {

            input.classList.add("error")
            alert("Oups! Vous avez oublié de renseigner une ville. Essayez à nouveau, capitaine!")

        } else {
            input.classList.remove("error")


            let baliseVille = document.getElementById("ville")
            const meteo = await appelApiMeteo(baliseVille.value);


            console.log(meteo.cod)
            if (meteo.cod.toString() === '404') {
                alert("Oh non! Cette ville semble perdue dans les limbes. Essayez une autre.")
                return
            }


            if (meteo.cod.toString() === "200") {
                integrationDonneMeteo(meteo, baliseVille.value);

            } else {
                alert("Aïe aïe aïe! Une erreur mystérieuse est survenue. Réessayons.")

            }












        }


    })


}




/*
    let input = document.getElementById("ville")
    let inputRegExp = new RegExp('/^[A-Za-z-]+$/g')
    */




recuperationVille();

function CalculDegres(degres) {
    let resulat
    if (0 <= degres && degres <= 45) {

        resulat = "Nord"

    }

    if (45 < degres && degres <= 135) {

        resulat = "Est"
    }

    if (135 < degres && degres <= 225) {

        resulat = "Sud"
    }

    if (225 < degres && degres <= 315) {

        resulat = "Ouest"
    }

    if (315 < degres && degres <= 360) {

        resulat = "Nord"
    }
    return resulat

}







async function appelApiMeteo(ville) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=b5bf35651d0ab1520f3682c9782a9b78&units=metric&lang=fr";
    const response = await fetch(url);
    const reponseJson = await response.json();
    return reponseJson


}

async function appelApiMeteoByCoord(lat, long) {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=b5bf35651d0ab1520f3682c9782a9b78&units=metric&lang=fr";
    const response = await fetch(url);
    const reponseJson = await response.json();
    console.log(reponseJson)
    return reponseJson


}

appelApiMeteoByCoord();

function ecouteurBtnVilles() {
    let btnFavorie = document.querySelectorAll("#button-fav")
    let tblVillesFav = ["Paris", "Lyon", "Marseille", "Rouen"]
    for (let i = 0; i < btnFavorie.length; i++) {
        btnFavorie[i].addEventListener("click", async function (event) {
            event.preventDefault;
            console.log("la ville conresspondante : " + tblVillesFav[i])
            document.querySelector(".Ville-rechercher").innerHTML = tblVillesFav[i]
            const meteo = await appelApiMeteo(tblVillesFav[i])
            integrationDonneMeteo(meteo, tblVillesFav[i]);


        }


        )
    }

}

ecouteurBtnVilles();

function integrationDonneMeteo(meteo, ville) {


    const temperature = Math.round(meteo.main.temp);
    const vent = Math.round(meteo.wind.speed * 3.6)
    const sunset = meteo.sys.sunset
    const direction = CalculDegres(meteo.wind.deg)
    const humidité = meteo.main.humidity
    const visibilité = meteo.visibility
    const leverSoleil = meteo.sys.sunrise

    document.querySelector(".temperature").innerHTML = temperature + " °C"
    document.querySelector(".vent").innerHTML = vent + " km/h " + direction
    document.querySelector(".sunset").innerHTML = new Date(sunset * 1000).toLocaleTimeString()
    document.querySelector(".Ville-rechercher").innerHTML = ville
    document.getElementById("Humidité-text").innerHTML = humidité + " %"
    document.getElementById("Visibilité-text").innerHTML = visibilité / 1000 + "km"
    document.getElementById("leverSoleil-text").innerHTML = new Date(leverSoleil * 1000).toLocaleTimeString()




}


function humidity(ville) {


}


async function getMeteoAutomatic() {
    navigator.geolocation.getCurrentPosition(async (success) => {
        let lat = success.coords.latitude;
        let long = success.coords.longitude;

        console.log(lat, long);
        const meteo = await appelApiMeteoByCoord(lat, long);
        const name = meteo.name
        integrationDonneMeteo(meteo, name)
    }, (error) => {
        console.error("Error obtaining location: ", error);
    });
}

getMeteoAutomatic();











/*
async function getMeteoAutomatic() {

    let lat
    let long
    navigator.geolocation.getCurrentPosition((succes) => {


        let lat = succes.coords.latitude;
        let long = succes.coords.longitude;






    })


    console.log(lat, long)

}
*/

getMeteoAutomatic();



















