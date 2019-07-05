// Pagination Object - Used for paging through members and bills on front page
class Pagination {
    constructor(tag) {
        this.tag = tag;
        this.limit = 10;
        this.house = 0;
        this.houses = [{ "name": "Dail", "members" : "TDs", "number": 32, "length": 158, "skip": 0 }, { "name": "Seanad", "members" : "Senators", "number": 25, "length": 166, "skip": 0 }],
        this.setHouse = function (house) {
                this.house = house;
                drawMembers();
                this.print();
            };
        this.getHouse = function () {
            return this.house;
        };
        this.getLimit = function () {
            return this.limit;
        };
        this.getName = function () {
            return this.houses[this.house].name;
        };
        this.getMembers = function () {
            return this.houses[this.house].members;
        };
        this.getNumber = function () {
            return this.houses[this.house].number;
        };
        this.setSkip = function (skip) {
            this.houses[this.house].skip = skip;
        };
        this.getSkip = function () {
            return this.houses[this.house].skip;
        };
        this.setLength = function (length) {
            this.houses[this.house].length = length;
        };
        this.getLength = function () {
            return this.houses[this.house].length;
        };
        this.nextPage = function () {
            var last = this.getSkip() + this.limit;
            if (last < this.getLength()) {
                var skip = this.getSkip() + this.limit;
                this.setSkip(skip);
                if (tag == "b") {drawBills()}
                if (tag == "m") {drawMembers()}
                this.print();
            }
        };
        this.prevPage = function () {
            if (this.getSkip() > 0) {
                var skip = this.getSkip() - this.limit;
                this.setSkip(skip);
                if (tag == "b") {drawBills()}
                if (tag == "m") {drawMembers()}
                this.print();
            }
        };
        this.print = function () {
            var first = this.getSkip() + 1;
            var last = this.getSkip() + this.limit;
            var length = this.getLength();
            var item = "";
            if (tag == "b") {item = "Bills"}
            if (tag == "m") {item = this.getMembers()}
            if (last > length) { //Making sure the "to" number is accurate
                last = length;
            }
            var element = document.getElementById(tag+"-pagination"); //Drawing info to the page
            element.innerHTML = `
            <div class = "pagination">
                <a class="paging-link" onclick="${tag}Pagination.prevPage()"><< Previous   </a>
                &nbsp&nbsp<strong>${item} from ${first} to ${last} of ${length}</strong>&nbsp&nbsp
                <a class="paging-link" onclick="${tag}Pagination.nextPage()">   Next >></a>
            </div>        
        `;
        };
    }
}

var bPagination = new Pagination("b");
var mPagination = new Pagination("m");

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
    var data = document.getElementById("oireachtas");
    data.classList.remove("d-none")
    drawMembers();
    drawBills();
}

// Retrieve the members of the house in focus
function drawMembers () {
    var name = mPagination.getName().toLowerCase();
    var number = mPagination.getNumber();
    var house = mPagination.getName();
    var skip = mPagination.getSkip();
    var limit = mPagination.getLimit();
    var data = document.getElementById("member-list");
    data.innerHTML = `<h2 class="part">${house} Members:</h2>`    
        fetch(`https://api.oireachtas.ie/v1/members?chamber=${name}&house_no=${number}&skip=${skip}&limit=${limit}`)
        .then(function(response) {
          return response.json();
        }).then(function(response) {
            var length = response.head.counts.memberCount;
            var members = response.results;
            mPagination.setLength(length);
            members.forEach(member => {
                drawMemberList(member.member);
            })
        }
        )    
    mPagination.print();
}

// Retrieve the bills of the house in focus
function drawBills () {
    var skip = bPagination.getSkip();
    var limit = bPagination.getLimit();
    var data = document.getElementById("bill-list");
    data.innerHTML = `<h2 class="part">Bills:</h2>`    

        fetch(`https://api.oireachtas.ie/v1/legislation?skip=${skip}&limit=${limit}`)
        .then(function(response) {
          return response.json();
        }).then(function(response) {
            var length = response.head.counts.billCount;
            var bills = response.results;
            bPagination.setLength(length);
            bills.forEach(bill => {
                drawBillsList(bill.bill);
            })
        }
        )    
    bPagination.print();
}
//END: Functions for building the oireachtas page


//Listing Functions
// Add the member to the list
function drawMemberList (member) {
    var pHouse = mPagination.getName().toLowerCase();
    var uri = member.uri;
    var name = member.fullName;
    var house = member.memberships[0].membership.house.showAs;
    var party = member.memberships[0].membership.parties[0].party.showAs;
    if (uri != null) {image = uri + "/image/large"};

    var data = document.getElementById("member-list");
    data.innerHTML += `
    <a onclick="memberPage('${uri}')" class="list-group-item mb-1 ${pHouse}">
        <div class="d-flex w-100 justify-content-between">
        <div class="member-thumbnail mx-3">
        <img src="${image}" alt="" class="member-thumbnail">
    </div>

            <h3 class="mb-1">${name}</h3>
            <small>${house}</small>
        </div>
        <strong>${party}</strong>
    </a>
`
}

// Add any bills sponsored by member
function drawBillsList (bill) {
    var uri = bill.uri;
    var title = bill.shortTitleEn;
    var house = bill.originHouse.showAs;
    var status = bill.status;
    
    var data = document.getElementById("bill-list");
    data.innerHTML += `
    <a class="list-group-item mb-1">
    <div class="d-flex w-100 justify-content-between">
        <h3 class="mb-1">${title}</h5>
            <small>${house}</small>
    </div>
    <strong>Status: ${status}</strong>
</a>

    `
}
//END: Listing Functions


// Functions for building the member page
// Retrieve the member data then retrieve any sponsored bill data
function memberPage (uri) {
    fetch("https://api.oireachtas.ie/v1/members?member_id=" + uri)
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

                fetch("https://api.oireachtas.ie/v1/legislation?member_id=" + member.member.uri)
                .then(function(response) {
                    return response.json();
                }).then(
                    function(response){
                        var sponsoredBills = response.results;
                        sponsoredBills.forEach(sponsoredBill => {
                            drawBillsList(sponsoredBill.bill);
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
    var dmember = document.getElementById("member");
    var dname = document.getElementById("member-name");
    var dprofile = document.getElementById("member-profile");
    dmember.classList.remove("d-none");
    dname.innerHTML = name;
    dprofile.src = uri+"/image/large";
}

// Add details of any memberships such as party affiliations
function drawMembership (membership) {

    var house = membership.house.showAs;
    var party = membership.parties[0].party.showAs;
    var represent = membership.represents[0].represent.showAs;

    var data = document.getElementById("memberships");
    data.innerHTML += `
    `;    
}
//END: Functions for building the memebr page


// Functions for building the billPage page
// Retrieve data for the bill
function billPage (uri) {

    fetch("https://api.oireachtas.ie/v1/legislation?bill_id=" + uri)
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
    if (bill.mostRecentStage.event.chamber != null) {chamber = " - " + bill.mostRecentStage.event.chamber.showAs}
    var mostRecent = `${bill.mostRecentStage.event.showAs}${chamber}`;
    var origin = bill.originHouse.showAs;
    var year = bill.billYear;
    var number = bill.billNo;
    crumbs.addBill(title, bill.uri);
    crumbs.print();


    var data = document.getElementById("bill");
    data.classList.remove("d-none");
}

// Details of any bills sponsors added here
function drawSponsor (sponsor) {
    var uri = sponsor.by.uri;
    var call = memberPage;
    if (uri === null) {call = "missingPage"}
    var as = sponsor.as.showAs;
    var by = sponsor.by.showAs;
    var asby = ``;
    if (as != null && by != null) { asby = ` - `};
    if (as == null) {as = ``};
    if (by == null) {by = ``};

    var primary = ``;
    var primaryText = ``;

    if (sponsor.isPrimary) {primary = ` primary`; primaryText = `<span>Primary Sponsor</span>`};
    if (uri != null) {image = uri + "/image/large"};

    var spons = `
    <a onclick="${call}('${uri}')" class="list-group-item${primary}">
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

    if (pdf != null) { 
        docList.innerHTML += `
            <a href="${pdf.uri}" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${title}</h5>
                    <small>PDF</small>
                </div>
            </a>    
        `
    }

    if (xml != null) {
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
    var elements = ["oireachtas", "member", "bill"];
    elements.forEach(element => {
        var data = document.getElementById(element);
        data.classList.add("d-none");    
    })
}

function missingPage() {
    var data = document.getElementById("data");
    data.innerHTML = `
        <h1>404 Not found</h1>
        <div class="bigger-text">
        <p>The data to populate this page is missing.</p>
        <p>We can blame that on the API rather than the front-end developer ;)</p>
        <p>The API developers have been notified of the issue.</p>
        <a class="crumb" onclick="oireachtasPage()">Return to oireachtas page</a>
        </div>
    `;
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
        var data = document.getElementById("breadcrumbs")
        this.breadcrumbs.forEach(breadcrumb => {
            data.innerHTML += `
            <a class="crumb" onclick="${breadcrumb.call}('${breadcrumb.uri}')">${breadcrumb.name}</a> > 
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

