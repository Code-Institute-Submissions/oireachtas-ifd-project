// When the document has loaded call oireachtasPage
window.onload = function() {
    oireachtasPage();
}

// Functions for building the oireachtas page
// Clear then draw
function oireachtasPage () {
    clearPage();
    drawOireachtas();
}

// Draw structural elements
function drawOireachtas () {
    crumbs.home();
    crumbs.print();
    var data = document.getElementById("data");
    data.innerHTML += `
    <div class="bigger-text part">
    <h1>Oireachtas</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, corporis nam optio reiciendis libero soluta earum a alias! Voluptate cum eius, et laborum sed odit at repellat dolorem tempora. Maiores saepe impedit accusamus aspernatur hic assumenda, non amet cum esse aperiam vero molestiae quae fugiat possimus natus dolorem incidunt sit praesentium repellendus modi ratione excepturi quod nam minus. Dolor dignissimos magni blanditiis nisi eligendi voluptatem expedita, natus temporibus, libero sequi necessitatibus error atque perspiciatis eveniet earum amet, incidunt sint odit! Unde ratione, dolores illum esse nam ipsum obcaecati, ad, et praesentium quaerat tempore! Officiis ab et, iure explicabo voluptates saepe!</p>
    <div class="row">

        <a onclick="pagination.setHouse(0)" class="col-12 col-md-6 text-center house">
            <div class="inner card">
                <h2>Dail</h2>
                <p>The Dáil is the Lower House of the Oireachtas. Members are known as Teachta Dála (TDs) meaning 'Deputy of the Dail'.</p>
                <div id="party-dail" class="box w-auto"></div>        
                <p class="text-justify">TDs provide a link between their constituents and the Government and Oireachtas. For example, when a constituent brings an issue to the attention of a TD, the TD may raise it in the Dáil as a Topical Issue or put down a parliamentary question, PQ, regarding it.</p>
            </div>
        </a>
        <a onclick="pagination.setHouse(1)" class="col-12 col-md-6 text-center house">
            <div class="inner card">
                <h2>Seanad</h2>
                <p>The Seanad is the Upper House of the Oireachtas. Members of this house are known as Senators.</p>
                <div id="party-seanad" class="box w-auto"></div>
                <p class="text-justify">The main function of the Seanad is to debate legislation proposed by the Government. The Seanad can amend a Bill that has been passed by the Dáil and delay, but not stop, it becoming law. Senators can also introduce their own Bills, which are debated in the Seanad and, if passed, are then debated in the Dáil. </p>
            </div>
        </a>
    </div>  
    </div>
    <h2 class="part">Members</h2>
    <div id="member-list"></div>
    <div id="pagination"></div>

    `
    drawMembers();
}

// Retrieve the members of the house in focus
function drawMembers () {
    var name = pagination.getName();
    var number = pagination.getNumber();
    var skip = pagination.getSkip();
    var limit = pagination.getLimit();
    var data = document.getElementById("member-list");
    data.innerHTML = ``    
        fetch(`https://api.oireachtas.ie/v1/members?chamber=${name}&house_no=${number}&skip=${skip}&limit=${limit}`)
        .then(function(response) {
          return response.json();
        }).then(function(response) {
            var length = response.head.counts.memberCount;
            var members = response.results;
            pagination.setLength(length);
            members.forEach(member => {
                drawMemberList(member.member);
            })
        }
        )    
    pagination.print();
}

// Add the member to the list
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
//END: Functions for building the oireachtas page


// Functions for building the member page
// Retrieve the member data then retrieve any sponsored bill data
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

// Draw strucutral elements and add specific members data
function drawMember (member) {
    var name = member.fullName
    var uri = member.uri;
    crumbs.addMember(name, uri);
    crumbs.print();

    var data = document.getElementById("data");
    data.innerHTML += `
    <div class="bigger-text part">
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
    </div>
    <h2 class="part">Sponsored Bills:</h2>
    <div id="sponsored-bills" class="list-group"></div>

    `
}

// Add details of any memberships such as party affiliations
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

// Add any bills sponsored by member
function drawSponsoredBill (sponsoredBill) {
    var uri = sponsoredBill.uri;
    var title = sponsoredBill.shortTitleEn;
    var house = sponsoredBill.originHouse.showAs;
    var status = sponsoredBill.status;

    var data = document.getElementById("sponsored-bills");
    data.innerHTML += `
    <a onclick="billPage('${uri}')" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${title}</h5>
            <small>${house}</small>
        </div>
        <small>Status: ${status}</small>
    </a>
    `
}
//END: Functions for building the memebr page


// Functions for building the billPage page
// Retrieve data for the bill
function billPage (uri) {

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

// Draw structural elements of the bills page and add specific bill data
function drawBill(bill){
    var title = bill.shortTitleEn;
    var description = bill.longTitleEn;
    var chamber = "";
    if (bill.mostRecentStage.event.chamber!=null) {chamber = " - "+bill.mostRecentStage.event.chamber.showAs}
    var mostRecent = `${bill.mostRecentStage.event.showAs}${chamber}`;
    var origin = bill.originHouse.showAs;
    var year = bill.billYear;
    var number = bill.billNo;
    crumbs.addBill(title, bill.uri);
    crumbs.print();


    var data = document.getElementById("data");
    data.innerHTML += `
    <div class="bigger-text part">

        <h1>${title}</h1>

        <p>${description}</p>
        <strong>Most Recent: </strong>${mostRecent} </br>
        <strong>Origin House: </strong>${origin}    </br>
        <strong>Origin Year: </strong>${year}    </br>
        <strong>Bill Number: </strong>${number}    </br>
    </div>
        <h2 class="part">Sponsored By:</h2>
        <div id="sponsors" class="list-group part"></div>
        <h2 class="part">Releated Docs:</h2>
        <div id="related-documents" class="list-group"></div>
    `
}

// Details of any bills sponsors added here
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

// Related docs information added here
function drawRelatedDocs (relatedDoc) {
    var title = relatedDoc.showAs;
    var formats = relatedDoc.formats;
    var pdf = formats.pdf;
    var xml = formats.xml;
    var docList = document.getElementById("related-documents")

    if (pdf!=null) { 
        docList.innerHTML += `
            <a href="${pdf.uri}" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${title}</h5>
                    <small>PDF</small>
                </div>
            </a>    
        `
    }

    if (xml!=null) {
        docList.innerHTML += `
            <a href="${xml.uri}" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${title}</h5>
                    <small>XML</small>
                </div>
            </a>    
        `
    }

    
}
//END: Functions for building the oireachtas page

// Utility functions and objects
// Clear Page
function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = ``;
}

// Breadcrumbs Object - Used for navigation
var crumbs = {
    breadcrumbs : [{"name": "Oireachtas", "call" : "oireachtasPage", "uri" : ""}],
    addMember : function (name, uri) {
        this.crumbsOrder();
        var crumb = {"name" : name, "call" : "memberPage", "uri" : uri};
        this.breadcrumbs.push(crumb);
        this.prene();
    },
    addBill : function (name, uri) {
        this.crumbsOrder();
        var crumb = {"name" : name, "call" : "billPage", "uri" : uri};
        this.breadcrumbs.push(crumb);
        this.prene();
    },
    home : function () { //Reset to oireachtas page
        this.breadcrumbs = [{"name": "Oireachtas", "call" : "oireachtasPage", "uri" : ""}];
    },
    print : function () { //Draw on page
        var data = document.getElementById("data")
        this.breadcrumbs.forEach(breadcrumb => {
            data.innerHTML += `
            <a onclick="${breadcrumb.call}('${breadcrumb.uri}')">${breadcrumb.name}</a> > 
        `    
        })
    },
    crumbsOrder : function () { //Move entry [3] to [2]
        if (this.breadcrumbs.length >= 3) {
            this.breadcrumbs[1] = this.breadcrumbs[2];
            this.breadcrumbs.pop();
        }
    },
    prene : function () { //Keep to three entries or less
        if (this.breadcrumbs.length >= 3) {
            if (this.breadcrumbs[1].uri === this.breadcrumbs[2].uri) {
                this.breadcrumbs.pop();
            }
        }
    }
}

// Pagination Object - Used for paging through members on front page
var pagination = {
    limit : 10,
    house : 0,
    houses : [ {"name" : "dail", "number" : 32, "length" : 158, "skip" : 0}, {"name" : "seanad", "number" : 25, "length" : 166, "skip" : 0} ],
    setHouse : function (house) { //called when switching house focus between dail and seanad
        this.house = house;
        drawMembers();
        this.print();
    },
    getHouse : function () {
        return this.house;
    },
    getLimit : function () {
        return this.limit;
    },
    getName : function () {
        return this.houses[this.house].name;
    },
    getNumber : function () {
        return this.houses[this.house].number;
    },
    setSkip : function (skip) {
        this.houses[this.house].skip = skip;
    },
    getSkip : function () {
        return this.houses[this.house].skip;
    },
    setLength : function (length) {
        this.houses[this.house].length = length;
    },
    getLength : function () {
        return this.houses[this.house].length;
    },
    nextPage : function () { //Goes to next set of pages making sure there is a next set of pages
        var last = this.getSkip()+this.limit;
        if (last < this.getLength()) {
            var skip = this.getSkip() + this.limit;
            this.setSkip(skip);
            drawMembers();
            this.print();
            }
    },
    prevPage : function () {
        if (this.getSkip() > 0) {
            var skip = this.getSkip() - this.limit;
            this.setSkip(skip);
            drawMembers();
            this.print();
            }
    },
    print : function () {
        var first = this.getSkip()+1;
        var last = this.getSkip()+this.limit;
        var length = this.getLength();

        if (last > length) { //Making sure it "to" number is accurate
            last = length;
        }
    
        var element = document.getElementById("pagination"); //Drawing info to the page
        element.innerHTML = `
        <a onclick="pagination.prevPage()"><< Previous</a>
        - <strong>TDs from ${first} to ${last} of ${length}</strong> -
        <a onclick="pagination.nextPage()">Next >></a>        
        `
    }
}

