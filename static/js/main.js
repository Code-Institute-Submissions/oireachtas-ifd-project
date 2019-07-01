window.onload = function() {
    oireachtasPage();
    partyData();
}

function partyData () {
    //requires house no
    fetch("https://api.oireachtas.ie/v1/parties")
    .then(function(response) {
      return response.json();
    }).then(function(response) {
        console.log(response)
    }
    )
}

function oireachtasPage () {
    fetch("https://api.oireachtas.ie/v1/members?limit=6")
    .then(function(response) {
      return response.json();
    }).then(
        clearPage(),
        ).then(function(response) {
        var members = response.results;
        drawOireachtas(members);
    }
    )
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
                        sponsoredBills.forEach(sponsoredBill => {
                            drawSponsoredBill(sponsoredBill.bill);
                        }); 
                    
                    }                    
                )
            })
        }
    )
}

function drawOireachtas (members) {
    crumbs.home();
    crumbs.printCrumbs();
    var data = document.getElementById("data");
    data.innerHTML += `
    <h1>Oireachtas</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, corporis nam optio reiciendis libero soluta earum a alias! Voluptate cum eius, et laborum sed odit at repellat dolorem tempora. Maiores saepe impedit accusamus aspernatur hic assumenda, non amet cum esse aperiam vero molestiae quae fugiat possimus natus dolorem incidunt sit praesentium repellendus modi ratione excepturi quod nam minus. Dolor dignissimos magni blanditiis nisi eligendi voluptatem expedita, natus temporibus, libero sequi necessitatibus error atque perspiciatis eveniet earum amet, incidunt sint odit! Unde ratione, dolores illum esse nam ipsum obcaecati, ad, et praesentium quaerat tempore! Officiis ab et, iure explicabo voluptates saepe!</p>
    <div class="row">

        <div class="col-12 col-md-6 card text-center">
            <div class="inner">
                <h2>Dail</h2>
                <p>This is the dail breakdown</p>
                <div id="party-dail" class="box w-auto"></div>        
            </div>
        </div>
        <div class="col-12 col-md-6 card text-center">
            <div class="inner">
                <h2>Seanad</h2>
                <p>This is the seanad breakdown</p>
                <div id="party-seanad" class="box w-auto"></div>
            </div>
        </div>
    </div>

    <h2>Members</h2>
    <div id="members" class="list-group">
    </div>        
    `
    members.forEach(member => {
        drawMemberList(member.member);
    })
}

function drawMemberList (member) {
    var uri = member.uri;
    var name = member.fullName;
    var house = member.memberships[0].membership.house.showAs;
    var party = member.memberships[0].membership.parties[0].party.showAs;
    if (uri != null) {image = uri + "/image/large"};

    var data = document.getElementById("members");
    data.innerHTML += `
    <a onclick="memberPage('${uri}')" class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
        <div class="member-thumbnail mx-3">
        <img src="${image}" alt="" class="member-thumbnail">
    </div>

            <h3 class="mb-1">${name}</h3>
            <small>${house}</small>
        </div>
        <small>${party}</small>
    </a>
`
}

function legislationPage (uri) {

    fetch("https://api.oireachtas.ie/v1/legislation?bill_id="+uri)
    .then(function(response) {
      return response.json();
    }).then(
        clearPage()
    ).then(
        function(response){
            response.results.forEach(bill => {
                drawBill(bill.bill);
                var sponsors = bill.bill.sponsors;
                var sortedSponsors = [];

                sponsors.forEach(sponsor => {
                    if (sponsor.sponsor.isPrimary) {sortedSponsors.unshift(sponsor)}
                    else {sortedSponsors.push(sponsor)}
                })

                sortedSponsors.forEach(sponsor => {
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

function drawMember (member) {
    var name = member.fullName
    var uri = member.uri;
    crumbs.addMember(name, uri);
    crumbs.printCrumbs();

    var data = document.getElementById("data");
    data.innerHTML += `
    <h1>${name}</h1>
    <div class="row">
        <div class="col-3">
            <img src="${uri}/image/large" alt="" class="member-img rounded">
        </div>
        <div class="col-6">
            <h2>Memberships:</h2>
            <div id="memberships" class=""></div>
        </div>
    </div>
    <h2>Sponsored Bills:</h2>
    <div id="sponsored-bills" class="list-group"></div>

    `
}

function drawMembership (membership) {

    var house = membership.house.showAs;
    var party = membership.parties[0].party.showAs;
    var represent = membership.represents[0].represent.showAs;

    var data = document.getElementById("memberships");
    data.innerHTML += `
        <div>
            <div>House: ${house}</div>
            <div>Party: ${party}</div>
            <div>Constituency: ${represent}</div>
        </div>
    `;    
}

function drawSponsoredBill (sponsoredBill) {
    var uri = sponsoredBill.uri;
    var title = sponsoredBill.shortTitleEn;
    var house = sponsoredBill.originHouse.showAs;
    var status = sponsoredBill.status;

    var data = document.getElementById("sponsored-bills");
    data.innerHTML += `
    <a onclick="legislationPage('${uri}')" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${title}</h5>
            <small>${house}</small>
        </div>
        <small>Status: ${status}</small>
    </a>
    `
}

function drawBill(bill){

    var title = bill.shortTitleEn;
    var description = bill.longTitleEn;
    var mostRecent = `${bill.mostRecentStage.event.showAs} - ${bill.mostRecentStage.event.chamber.showAs}`;

    crumbs.addBill(title, bill.uri);
    crumbs.printCrumbs();


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

var crumbs = {
    breadcrumbs : [{"name": "Oireachtas", "call" : "oireachtasPage", "uri" : ""}],
    addMember : function (name, uri) {
        this.crumbsOrder();
        var crumb = {"name" : name, "call" : "memberPage", "uri" : uri};
        this.breadcrumbs.push(crumb);
    },
    addBill : function (name, uri) {
        this.crumbsOrder();
        var crumb = {"name" : name, "call" : "legislationPage", "uri" : uri};
        this.breadcrumbs.push(crumb);
    },
    home : function () {
        this.breadcrumbs = [{"name": "Oireachtas", "call" : oireachtasPage, "uri" : ""}];
    },
    call : function (index) {
        this.breadcrumbs[index].call(this.breadcrumbs[index].uri)
    },
    printCrumbs : function () {
        var data = document.getElementById("data")
        this.breadcrumbs.forEach(breadcrumb => {
            data.innerHTML += `
            <a onclick="${breadcrumb.call}('${breadcrumb.uri}')">${breadcrumb.name}</a> > 
        `    
        })
    },
    crumbsOrder : function () {
        if (this.breadcrumbs.length >= 3) {
            this.breadcrumbs[1] = this.breadcrumbs[2];
            this.breadcrumbs.pop();
        }
    }
}