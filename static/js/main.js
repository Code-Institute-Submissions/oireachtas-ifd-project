//  A data repository for displaying data gathered from oireachtas API.
//    Copyright (C) <2019>  <John O' Sullivan

//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.

//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <https://www.gnu.org/licenses. 


// Pagination Object - Used for paging through members and bills on front page
class Pagination {
    constructor(tag) {
        this.tag = tag;
        this.limit = 10; //Limit the member list to 10 entries
        this.house = 0;
        this.houses = [{ "name": "Dail", "members" : "TDs", "number": 32, "length": 158, "skip": 0 }, { "name": "Seanad", "members" : "Senators", "number": 25, "length": 166, "skip": 0 }],
        this.setHouse = function (house) {
                this.house = house;
                drawMembers();
                this.print();
            };
        this.getHouse = function () { //returns an int 0=Dail, 1=Seanad
            return this.house;
        };
        this.getLimit = function () {   //returns amount of list entries to create
            return this.limit; 
        };
        this.getName = function () {    //Get name of the house
            return this.houses[this.house].name;
        };
        this.getMembers = function () { //Get name of members - TDs or Senators
            return this.houses[this.house].members;
        };
        this.getNumber = function () {  //Latest houses are 32nd Dail and 25th Seanad
            return this.houses[this.house].number;
        };
        this.setSkip = function (skip) {    //How many entries for API to skip returning 
            this.houses[this.house].skip = skip;
        };
        this.getSkip = function () {        
            return this.houses[this.house].skip;
        };
        this.setLength = function (length) {    //Number of entries accessible by API
            this.houses[this.house].length = length;
        };
        this.getLength = function () {          
            return this.houses[this.house].length;
        };
        this.nextPage = function () {           //Next [limit] entries
            var last = this.getSkip() + this.limit;
            if (last < this.getLength()) {
                var skip = this.getSkip() + this.limit;
                this.setSkip(skip);
                if (tag == "b") {drawBills()}
                if (tag == "m") {drawMembers()}
                this.print();
            }
        };
        this.prevPage = function () {           //Previous [limit] entries
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
    var data = document.getElementById("data");
    data.innerHTML += `
    <div class="bigger-text part">
    <h1>Oireachtas</h1>
    <p>Oireachtas is made up of the two houses of the Irish Government as well as the Irish president. iReachtas connects you to the latest information from these houses. The latest bills and current house members. Click on the houses below to switch to those house members. Click on the members to view their information. Click on the latest bills to view their details.</p>
    <div class="row">

        <a onclick="mPagination.setHouse(0)" class="col-12 col-md-6 text-center house">
            <div class="inner card">
                <h2>Dail</h2>
                <p>The Dáil is the Lower House of the Oireachtas. Members are known as Teachta Dála (TDs) meaning 'Deputy of the Dail'.</p>
                <div id="party-dail" class="box w-auto">
                    <img class="house-image" src="images/dail.png" alt="Interior of the Dail house showing seats and benches"/>
                </div>        
                <p class="text-justify">TDs provide a link between their constituents and the Government and Oireachtas. For example, when a constituent brings an issue to the attention of a TD, the TD may raise it in the Dáil as a Topical Issue or put down a parliamentary question, PQ, regarding it.</p>
            </div>
        </a>
        <a onclick="mPagination.setHouse(1)" class="col-12 col-md-6 text-center house">
            <div class="inner card">
                <h2>Seanad</h2>
                <p>The Seanad is the Upper House of the Oireachtas. Members of this house are known as Senators.</p>
                <div id="party-seanad" class="box w-auto">
                    <img class="house-image" src="images/seanad.jpg" alt="Interior of the Seanad house showing rows of seats"/>
                </div>
                <p class="text-justify">The Seanad debates legislation proposed by the Government. The Seanad can amend a Bill that has been passed by the Dáil. Senators can also introduce their own Bills, which if passed by the Seanad and, are then debated in the Dáil. </p>
            </div>
        </a>
    </div>  
    </div>
    <div id="member-list"></div>
    <div id="m-pagination"></div>
    <div id="bill-list"></div>
    <div id="b-pagination"></div>

    `
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
        ).then(function() {
            bPagination.print();
        })    
}
//END: Functions for building the oireachtas page


//Listing Functions
// Add the member to the list
function drawMemberList (member) {
    var pHouse = mPagination.getName().toLowerCase();
    var uri = member.uri;
    var name = member.fullName;
    var image = "https://data.oireachtas.ie/ie/oireachtas/member/id/Robert-Childers-Barton.D.1919-01-21/image/large"
    var house = member.memberships[0].membership.house.showAs;
    var party = member.memberships[0].membership.parties[0].party.showAs;
    if (uri != null) {image = uri + "/image/large"};

    var data = document.getElementById("member-list");
    data.innerHTML += `
    <a onclick="memberPage('${uri}')" class="list-group-item mb-1 ${pHouse}">
        <div class="d-flex w-100 justify-content-between">
        <div class="member-thumbnail mx-3">
        <img src="${image}" alt="Profile image for ${name}" class="member-thumbnail">
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
    <a onclick="billPage('${uri}')" class="list-group-item mb-1">
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
    //Request member with uri
    fetch("https://api.oireachtas.ie/v1/members?member_id=" + uri)
    .then(function(response) {
      return response.json();
    }).then(
        //Clear the page
        clearPage()
    ).then(
        function(response){
            //Draw member
            var members = response.results;
            members.forEach(member => {
                drawMember(member.member);

                var memberships = member.member.memberships;
                memberships.forEach(membership => {
                    drawMembership(membership.membership);
                }); 

                //For each sponsored bill draw bill
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
    var data = document.getElementById("data");
    data.innerHTML += `
    <div class="bigger-text part">
        <h1>${name}</h1>
        <div class="row">
            <div class="col-3">
                <img src="${uri}/image/large" alt="Profile image for ${name}" class="member-img rounded">
            </div>
            <div class="col-6">
                <h2>Memberships:</h2>
                <div id="memberships" class=""></div>
            </div>
        </div>
    </div>
    <h2 class="part">Sponsored Bills:</h2>
    <div id="bill-list" class="list-group"></div>

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
//END: Functions for building the member page


// Functions for building the billPage page
// Retrieve data for the bill
function billPage (uri) {
    // Request bill with uri
    fetch("https://api.oireachtas.ie/v1/legislation?bill_id=" + uri)
    .then(function(response) {
      return response.json();
    }).then(
        clearPage() //Clear the page
    ).then(
        function(response){
            response.results.forEach(bill => {
                // console.log(bill.bill.relatedDocs)
                //Draw the bill
                drawBill(bill.bill);
                var sponsors = bill.bill.sponsors;
                var sortedSponsors = [];

                //For each sponsor of the bill draw entry to sponsor list
                sponsors.forEach(sponsor => {
                    if (sponsor.sponsor.isPrimary) {sortedSponsors.unshift(sponsor)}
                    else {sortedSponsors.push(sponsor)}
                })

                sortedSponsors.forEach(sponsor => {
                    //If statement solves a bug of missing API data
                    if (sponsor.sponsor.as.showAs!=null||sponsor.sponsor.by.showAs!=null) { 
                        drawSponsor(sponsor.sponsor);
                    }
                });

                //For each related doc draw entry to related doc list
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
    var image = "https://data.oireachtas.ie/ie/oireachtas/member/id/Robert-Childers-Barton.D.1919-01-21/image/large";
    var call = "memberPage";
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
                    <img src="${image}" alt="Profile image of ${as}${by}" class="member-thumbnail">
                </div>
                <div>
                    <h3 class="mb-1">${as}${asby}${by}</h3>
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
    var data = document.getElementById("data");
    data.innerHTML = ``;
}

function missingPage() {    //When data is not recieved display this page. Used for pages with missing uris.
    var data = document.getElementById("data");
    data.innerHTML = `
        <h1>Data Not found</h1>
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
        var data = document.getElementById("data")
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

