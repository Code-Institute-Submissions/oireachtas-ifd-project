var current;


function oireachtasPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>Oireachtas</h1>`;
    return "oireachtas";
}

function memberPage () {
    retrieveMember();
    clearPage();
    var data = document.getElementById("data");
<<<<<<< Updated upstream
    data.innerHTML = `<h1>Member</h1>`;
=======
    data.innerHTML = `
    <h1>Michael Ahern</h1>
    <p>${current}</p>
    <div class="row">
        <div class="col-3">
            <img src="https://data.oireachtas.ie/ie/oireachtas/member/id/Se%C3%A1n-%C3%93-Feargha%C3%ADl.S.2000-06-09/image/large" alt="" class="member-img rounded">
        </div>
        <div class="col-6">
            <p>TD in the Dail</p>
            <p>Representing Cork</p>
            <p>Since 21/05/14</p>
        </div>
    </div>

    <h2>Sponsored Bills</h2>
    <div class="list-group">
        <a onclick="legislationPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Health (Pricing and Supply of Medical Goods) (Amendment) Bill 2018: First Stage</h5>
                <small>Dail</small>
            </div>
            <small>Status: Current</small>
        </a>
        <a onclick="legislationPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Health (Pricing and Supply of Medical Goods) (Amendment) Bill 2018: First Stage</h5>
                    <small>Dail</small>
                </div>
                <small>Status: Current</small>
        </a>
        <a onclick="legislationPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Health (Pricing and Supply of Medical Goods) (Amendment) Bill 2018: First Stage</h5>
                <small>Dail</small>
            </div>
            <small>Status: Current</small>
        </a>
    </div>
    

    `;
>>>>>>> Stashed changes
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
    current = data;
}

function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = "";
}
