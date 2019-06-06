let data = [];
let arrayAux = [];
let pro={};

/*
* Esta funcion se encarga de ejecutar la llamada al servicio. EL resolve es la funcion que ejecutara al momento de que funcione la llamada
*
* */
let llamarServicioSenate= (resolve) =>  {
    fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
        method: 'GET',
        headers: {
            "X-API-Key":'6hMlTP46xKmaTcOlqLaWFMAvgVcGLIvvmrvGVkuI'
        }
    }).then((respuesta)=> respuesta.json())
        .then(resolve);
};

/*
* Init senate data se ejecutara al momento de dibujarse el html
*
* */
let initSenateData = () => {
    llamarServicioSenate((responseData) => {
        var tbody= document.createElement("tbody")
        pro = document.getElementById("senate-data")
        data = responseData.results[0].members;
        dibujarTablaRepresentantes(data);
    });
};

function dibujarTablaRepresentantes (members) {
    var tabla="<thead class='thead-dark'><tr>" +
        "<th>Full Name</th>" +
        "<th>Party</th>" +
        "<th>State</th>" +
        "<th>Senority</th>" +
        "<th>Percentage of votes</th>" +
        "</tr>" +
        "</thead>";
    for (let i=0;i<members.length;i++) {
        tabla +="<tr>";
        //console.log(array[i].last_name+array[i].first_name+array[i].middle_name)
        if(members[i].last_name!=null && members[i].first_name!=null && members[i].middle_name!=null)
        {
            tabla+="<td><a href='"+members[i].url+"'>"+members[i].last_name+" "+members[i].first_name+" "+members[i].middle_name+"</a></td>"
        }
        else if(members[i].middle_name==null)
        {
            tabla+="<td><a href='"+members[i].url+"'>"+members[i].last_name+" "+members[i].first_name+" "+"..."+"</a></td>"
        }
        tabla+="<td>"+" "+members[i].party+" "+"</td>";
        tabla+="<td>"+" "+members[i].state+" "+"</td>";
        tabla+="<td>"+" "+members[i].seniority+" "+"</td>";
        tabla+="<td>"+" "+members[i].votes_with_party_pct+"%"+" "+"</td></tr>";
    }
    pro.innerHTML=tabla
}
//  tbody.appendChild(tabla)
//  pro.appendChild(tbody)

function filtrarTablaCheckbox () {
    arrayAux=[];
    let checkboxDemocrata = document.getElementById('democrata-checkbox');
    let checkboxIndependiente = document.getElementById('independiente-checkbox');
    let checkboxRepublicanos = document.getElementById('republicano-checkbox');
    console.log("Democrata: " + checkboxDemocrata.checked);
    console.log("Independiente: " + checkboxIndependiente.checked);
    console.log("Republicanos: " + checkboxRepublicanos.checked);
    if(checkboxDemocrata.checked) {
        arrayAux.push('D');
    }
    if(checkboxIndependiente.checked) {
        arrayAux.push('I');
    }
    if(checkboxRepublicanos.checked) {
        arrayAux.push('R');
    }
    return filtrarMiembrosPorPartido(arrayAux);
}

function filtrarMiembrosPorPartido(arrayAux) {
    let arregloFiltrado = [];
    for(let i = 0; i<data.length; i++) {
        let elemento = data[i];
        if(comprobarSiEstaAdentro(elemento)){
            arregloFiltrado.push(elemento);
        }
    }
    return arregloFiltrado;
    //return arreglo.filter(comprobarSiEstaAdentro);
}

function comprobarSiEstaAdentro(elemento) {
    for(let i = 0; i < arrayAux.length; i++) {
        if(arrayAux[i] == elemento.party) {
            return true;
        }

    }
    return false;
}
