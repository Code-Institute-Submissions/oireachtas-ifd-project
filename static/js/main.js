window.onload = function() {
    // memberData();
    oireachtasPage();
}




//------------------ Working Here ----------------------

function memberData () {
    //requires house no
    fetch("https://api.oireachtas.ie/v1/members?chamber=dail&house_no=32")
    .then(function(response) {
      return response.json();
    }).then(function(response) {
        var dailLength = response.head.counts.memberCount;
        pagination.setDailLength(dailLength);
    }
    )
    fetch("https://api.oireachtas.ie/v1/members?chamber=dail&house_no=25")
    .then(function(response) {
      return response.json();
    }).then(function(response) {
        var seanadLength = response.head.counts.memberCount;
        pagination.setDailLength(seanadLength);
    }
    )
}

function oireachtasPage () {
    clearPage();
    drawOireachtas();
    drawMembers();
}

var pagination = {
    skip : 0,
    limit : 10,
    house : "dail",
    dailLength : 158,
    seanadLength : 166,
    setHouse : function (house) {
        this.house = house;
    },
    getHouse : function () {
        return this.house;
    },
    getLimit : function () {
        return this.limit;
    },
    setSkip : function (skip) {
        this.skip = skip;
    },
    getSkip : function () {
        return this.skip;
    },
    setDailLength : function (dailLength) {
        this.dailLength = dailLength;
    },
    setSeanadLength : function (seanadLength) {
        this.seanadLength = seanadLength;
    },
    nextPage : function () {
        
    },
    prevPage : function () {

    },
    check : function () {

    },
    print : function () {
        var element = document.getElementById("pagination");
        element.innerHTML = `TDs from ${this.skip} to ${this.skip+this.limit} of ${this.dailLength}`
    }
}

//------------------ Working Here ----------------------




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

function drawOireachtas () {
    crumbs.home();
    crumbs.printCrumbs();
    var data = document.getElementById("data");
    data.innerHTML += `
    <h1>Oireachtas</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, corporis nam optio reiciendis libero soluta earum a alias! Voluptate cum eius, et laborum sed odit at repellat dolorem tempora. Maiores saepe impedit accusamus aspernatur hic assumenda, non amet cum esse aperiam vero molestiae quae fugiat possimus natus dolorem incidunt sit praesentium repellendus modi ratione excepturi quod nam minus. Dolor dignissimos magni blanditiis nisi eligendi voluptatem expedita, natus temporibus, libero sequi necessitatibus error atque perspiciatis eveniet earum amet, incidunt sint odit! Unde ratione, dolores illum esse nam ipsum obcaecati, ad, et praesentium quaerat tempore! Officiis ab et, iure explicabo voluptates saepe!</p>
    <div class="row">

        <div class="col-12 col-md-6 text-center">
            <div class="inner card">
                <h2>Dail</h2>
                <p>The Dáil is the Lower House of the Oireachtas. Members are known as Teachta Dála (TDs) meaning 'Deputy of the Dail'.</p>
                <div id="party-dail" class="box w-auto"></div>        
                <p class="text-justify">TDs provide a link between their constituents and the Government and Oireachtas. For example, when a constituent brings an issue to the attention of a TD, the TD may raise it in the Dáil as a Topical Issue or put down a parliamentary question, PQ, regarding it.</p>
            </div>
        </div>
        <div class="col-12 col-md-6 text-center">
            <div class="inner card">
                <h2>Seanad</h2>
                <p>The Seanad is the Upper House of the Oireachtas. Members of this house are known as Senators.</p>
                <div id="party-seanad" class="box w-auto"></div>
                <p class="text-justify">The main function of the Seanad is to debate legislation proposed by the Government. The Seanad can amend a Bill that has been passed by the Dáil and delay, but not stop, it becoming law. Senators can also introduce their own Bills, which are debated in the Seanad and, if passed, are then debated in the Dáil. </p>
            </div>
        </div>
    </div>  
    `
    // members.forEach(member => {
    //     drawMemberList(member.member);
    // })
}

function drawMembers () {
    var house = pagination.getHouse();
    var skip = pagination.getSkip();
    var limit = pagination.getLimit();
    var data = document.getElementById("member-list");
    data.innerHTML += `
    <h2 class="part">Members</h2>
    `
    if (house === "dail") {
        fetch(`https://api.oireachtas.ie/v1/members?chamber=dail&house_no=32&skip=${skip}&limit=${limit}`)
        .then(function(response) {
          return response.json();
        }).then(function(response) {
            var dailLength = response.head.counts.memberCount;
            var members = response.results;
            pagination.setDailLength(dailLength);
            members.forEach(member => {
                drawMemberList(member.member);
            })
        }
        )    
    }
    if (house === "seanad") {
        fetch(`https://api.oireachtas.ie/v1/members?chamber=seanad&house_no=25&skip=${skip}&limit=${limit}`)
        .then(function(response) {
          return response.json();
        }).then(function(response) {
            var seanadLength = response.head.counts.memberCount;
            var members = response.results;
            pagination.setSeanadLength(seanadLength);
            members.forEach(member => {
                drawMemberList(member.member);
            })
        }
        )    
    }
    pagination.print();
}

function drawMemberList (member) {
    var uri = member.uri;
    var name = member.fullName;
    var house = member.memberships[0].membership.house.showAs;
    var party = member.memberships[0].membership.parties[0].party.showAs;
    if (uri != null) {image = uri + "/image/large"};

    var data = document.getElementById("member-list");
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
    var data = document.getElementById("container");
    data.innerHTML = `
        <div id="data"></div>
        <div id="member-list"></div>
        <div id="pagination">
            <div id="prev"></div>
            <div id="current"></div>
            <div id="next"></div>
        </div>
    `;
}

var crumbs = {
    breadcrumbs : [{"name": "Oireachtas", "call" : "oireachtasPage", "uri" : ""}],
    addMember : function (name, uri) {
        this.crumbsOrder();
        var crumb = {"name" : name, "call" : "memberPage", "uri" : uri};
        this.breadcrumbs.push(crumb);
        this.crumbsPrene();
    },
    addBill : function (name, uri) {
        this.crumbsOrder();
        var crumb = {"name" : name, "call" : "legislationPage", "uri" : uri};
        this.breadcrumbs.push(crumb);
        this.crumbsPrene();
    },
    home : function () {
        this.breadcrumbs = [{"name": "Oireachtas", "call" : "oireachtasPage", "uri" : ""}];
    },
    call : function (index) {
        
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
    },
    crumbsPrene : function () {
        if (this.breadcrumbs.length >= 3) {
            if (this.breadcrumbs[1].uri === this.breadcrumbs[2].uri) {
                this.breadcrumbs.pop();
            }
        }
    }
}
