var current;


function oireachtasPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>Oireachtas</h1>`;
    return "oireachtas";
}

function memberPage () {
    fetch('https://api.oireachtas.ie/v1/members')
    .then(function(response) {
      return response.json();
    }).then(
        clearPage()
    ).then(
        function(response){
            drawMember(response.results[3]);
        }
    )
}

function legislationPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>legislation</h1>`;
    return "legislation";
}


function drawMember (member) {
    console.log(member);
    var name = member.member.fullName;
    var uri = member.member.uri;
    var memberships = member.member.memberships;
    var membershipEntries = "";
    console.log(memberships[0].membership)

    memberships.forEach(membership => {
        var root = membership.membership;
        var partyRoot = root.parties;
        var representingRoot = root.represents;
        var memship = `<li>House: ${root.house.showAs}
        <ul>
        Party: 
        `
        partyRoot.forEach(party => {
            memship += `<li>${party.party.showAs}</li>`
        });
        memship += `</ul>
        <ul>
        Representing: `
        representingRoot.forEach(represents => {
            memship += `<li>${represents.represent.showAs}</li>`
        });
        memship += `</ul></li></br>`
        membershipEntries += memship;
    });

    var data = document.getElementById("data");
    data.innerHTML = `
    <h1>${name}</h1>
    <div class="row">
        <div class="col-3">
            <img src="${uri}/image/large" alt="" class="member-img rounded">
        </div>
        <div class="col-6">
            <h2>Memberships:</h2>
            ${membershipEntries}
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
}

function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = "";
}
