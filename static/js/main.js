function oireachtasPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `<h1>Oireachtas</h1>`;
    return "oireachtas";
}

function memberPage (uri) {
    fetch("https://api.oireachtas.ie/v1/members?member_id="+uri)
    .then(function(response) {
      return response.json();
    }).then(
        clearPage()
    ).then(
        function(response){
            var members = response.results;
            members.forEach(member => {
                drawMember(member.member);

                var memberships = member.member.memberships;
                memberships.forEach(membership => {
                    drawMembership(membership.membership);
                }); 

                fetch("https://api.oireachtas.ie/v1/legislation?member_id="+member.member.uri)
                .then(function(response) {
                    return response.json();
                }).then(
                    function(response){
                        var sponsoredBills = response.results;
                        sponsoredBills.forEach(membership => {
                            drawSponsoredBill(membership.membership);
                        }); 
                    
                    }                    
                )
            })
        }
    )
}
function legislationPage (uri) {
    fetch(uri)
    .then(function(response) {
      return response.json();
    }).then(
        clearPage()
    ).then(
        function(response){
            response.results.forEach(bill => {
                drawBill(bill.bill);

                var sponsors = bill.bill.sponsors;
                sponsors.forEach(sponsor => {
                    drawSponsor(sponsor.sponsor);
                });

                var relatedDocs = bill.bill.relatedDocs;
                relatedDocs.forEach(relatedDoc => {
                    
                    drawRelatedDocs(relatedDoc.relatedDoc);
                });
 
            })
        }
    )
}


function drawMembera (member) {
    var name = member.fullName;
    var uri = member.uri;
    var memberships = member.memberships;
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

function drawMember (member) {
    console.log(member)

    var name = member.fullName
    var uri = member.uri;


    var data = document.getElementById("data");
    data.innerHTML = `
    <h1>${name}</h1>
    <div class="row">
        <div class="col-3">
            <img src="${uri}/image/large" alt="" class="member-img rounded">
        </div>
        <div class="col-6">
            <h2>Memberships:</h2>
            <div id="memberships" class="list-group"></div>
        </div>
    </div>
    <h2>Sponsored Bills:</h2>
    <div id="sponsored-bills" class="list-group"></div>

    `
}

function drawMembership (membership) {
    console.log(membership);
}

function drawSponsoredBill (sponsoredBill) {
    console.log(sponsoredBill);
}

function drawBill(bill){
    console.log(bill)

    var title = bill.shortTitleEn;
    var description = bill.longTitleEn;
    var mostRecent = `${bill.mostRecentStage.event.showAs} - ${bill.mostRecentStage.event.chamber.showAs}`;

    var data = document.getElementById("data");
    data.innerHTML += `
        <h1>${title}</h1>

        <p>${description}</p>
        <strong>Most Recent: </strong>${mostRecent}
        <h2>Sponsored By:</h2>
        <div id="sponsors" class="list-group"></div>
        <h2>Releated Docs:</h2>
        <div id="related-documents" class="list-group"></div>
    `
}

function drawSponsor (sponsor) {
    var uri = sponsor.by.uri;

    var as = sponsor.as.showAs;
    var by = sponsor.by.showAs;
    var asby = ``;
    if (as!=null&&by!=null) { asby=` - `};
    if (as==null) {as=``};
    if (by==null) {by=``};

    var primary = ``;
    var primaryText = ``;

    if (sponsor.isPrimary) {primary = ` primary`; primaryText = `<span>Primary Sponsor</span>`};
    if (uri != null) {image = uri + "/image/large"};    

    var spons = `
    <a onclick="memberPage('${uri}')" class="list-group-item${primary}">
        <div class="d-inline-block">
            <div class="row">
                <div class="member-thumbnail mx-3">
                    <img src="${image}" alt="" class="member-thumbnail">
                </div>
                <div>
                    <h3 class="mb-1">${as}${by}</h3>
                    ${primaryText}
                </div>
            </div>
        </div>
    </a>
    `

    var sponsorList = document.getElementById("sponsors")
    sponsorList.innerHTML += spons;
}

function drawRelatedDocs (relatedDoc) {
    var title = relatedDoc.showAs;
    var formats = relatedDoc.formats;
    var pdf = formats.pdf;
    var xml = formats.xml;
    var pdfText = "";
    var xmlText = "";

    if (pdf!=null) { pdfText="<small>PDF</small>"}
    if (xml!=null) { xmlText="<small>XML</small>"}

    var doc = `
            <a onclick="" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${title}</h5>
                    ${pdfText}
                    ${xmlText}
                </div>
            </a>    
            `

        var docList = document.getElementById("related-documents")
        docList.innerHTML += doc;
}

function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = "";
}
