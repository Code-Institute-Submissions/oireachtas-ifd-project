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
    fetch('https://api.oireachtas.ie/v1/legislation')
    .then(function(response) {
      return response.json();
    }).then(
        clearPage()
    ).then(
        function(response){
            drawBill(response.results[6]);
        }
    )
}


function drawMember (member) {
    var name = member.member.fullName;
    var uri = member.member.uri;
    var memberships = member.member.memberships;
    var membershipEntries = "";

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

function drawBill(bill){
    console.log(bill)

    var title = bill.bill.shortTitleEn;
    var description = bill.bill.longTitleEn;
    var mostRecent = `${bill.bill.mostRecentStage.event.showAs} - ${bill.bill.mostRecentStage.event.chamber.showAs}`;
    var sponsors = bill.bill.sponsors;
    var sponsorList = `<ul>`;

    sponsors.forEach(sponsor => {
        var as = sponsor.sponsor.as.showAs;
        var by = sponsor.sponsor.by.showAs;
        var primary = sponsor.sponsor.isPrimary;
        var spons = `<li>`;
        if (primary=true) {
            spons = `<li class="primary">`;
        }
        if (as!=null) {
            spons += as;
        }
        if (by!=null) {
            spons += by;
        }
        if (primary=true) {
            spons += ` <span class="primary">(Primary)</span>`;
        }
        
        spons += `</li>`;
        sponsorList += spons;
    })


    var data = document.getElementById("data");
    data.innerHTML = `
        <h1>${title}</h1>

        <p>${description}</p>
        <strong>Most Recent: </strong>${mostRecent}

        <h2>Sponsored By:</h2>
        <div class="list-group">
        ${sponsorList}
            <a onclick="memberPage()" href="#" class="list-group-item">
                <div class="d-inline-block">
                    <div class="row">
                    <div class="member-thumbnail mx-3">
                        <img src="https://data.oireachtas.ie/ie/oireachtas/member/id/Se%C3%A1n-%C3%93-Feargha%C3%ADl.S.2000-06-09/image/large" alt="" class="member-thumbnail">
                    </div>
                    <div>
                        <h3 class="mb-1">Micahel Ahern</h3>
                        <span>Sinn Fein</span>
                    </div>
                    </div>
                </div>
                <span class="d-inline-block float-right" >Dail</span>
            </a>
    
            <a onclick="memberPage()" href="#" class="list-group-item">
                    <div class="d-inline-block">
                        <div class="row">
                        <div class="member-thumbnail mx-3">
                            <img src="https://data.oireachtas.ie/ie/oireachtas/member/id/Se%C3%A1n-%C3%93-Feargha%C3%ADl.S.2000-06-09/image/large" alt="" class="member-thumbnail">
                        </div>
                        <div>
                            <h3 class="mb-1">Micahel Ahern</h3>
                            <span>Sinn Fein</span>
                        </div>
                        </div>
                    </div>
                <span class="d-inline-block float-right" >Dail</span>
            </a>
        
            </div>        

        <h2>Related Documents:</h2>
        <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Description</h5>
                    <small>PDF</small>
                </div>
            </a>    
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Adendum</h5>
                    <small>PDF</small>
                </div>
            </a>    
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Explanation</h5>
                    <small>PDF</small>
                </div>
            </a>    
        </div>` 


}

function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = "";
}
