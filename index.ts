let currentOffset:number=0;
$(document).ready( function(){
    $('#infos').hide();
    (async function() {
        switchPage(0);//show first page
    })();
});

async function switchPage(i:number) {
    if(!(currentOffset+i<0)){
        currentOffset=currentOffset+i;
    }
    
    const pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset='+currentOffset);

    //HTML String mit Pokemon Liste
    let html = '<table class="table table-striped">';
    for(const pokemon of pokelist.results) {
        html += `<tr><td>${pokemon.name}</td>`;
        html += `<td><button id="btnDetails" onclick="details('${pokemon.url}')" href="info.html">Details</button></td>`;
        html += `</tr>`;
    }
    html += `</table>`;

    $('#pokemons')[0].innerHTML = html;
}

async function details(pokemonUrl:string) {
    const pokemon = await $.get(pokemonUrl);
    const abilityList:any[] = pokemon.abilities;
    let i:number=0;

    let html = '';
    html += `<table class="table table-striped"><tr><td>${pokemon.name}</td>`;
    html += `<td><img src='${pokemon.sprites.front_default}'></td></tr>`;
    html += `<tr><td>Gewicht:</td><td>${pokemon.weight}kg</td></tr><tr>`;
    html += `<td>Attacken:</td><td>`
    for(i=0;i<abilityList.length;i++){
        html += ''+abilityList[i].ability.name+'</br>';
    }
    html += `</td></tr><tr><button id="goBack" onclick="goBack()" class="btn btn-primary">Go back</button>`
    html += `</tr></table>`;

    $('#infos')[0].innerHTML = html;

    $('#pokemons').hide();
    $('#previousPage').hide();
    $('#nextPage').hide();
    $('#infos').show();
}

async function goBack() {
    $('#infos').hide();
    $('#pokemons').show();
    $('#previousPage').show();
    $('#nextPage').show();
}