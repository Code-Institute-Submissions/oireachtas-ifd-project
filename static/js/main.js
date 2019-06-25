function oireachtasPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>Oireachtas</h1>`;
    return "oireachtas";
}

function memberPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>Member</h1><div style="height:100px; width:100px; background-color:red"`;
    return "member";
}

function legislationPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>legislation</h1>`;
    return "legislation";
}

function retrieveMember () {
    queue()
    .defer(d3.json, "https://api.oireachtas.ie/v1/members")
    .await(drawMember);
}

function drawMember (error, data) {
    console.log(data);
}

function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = "";
}
