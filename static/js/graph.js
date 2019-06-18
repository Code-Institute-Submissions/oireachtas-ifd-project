retrieveDebates();
retrieveMembers();

function retrieveDebates () {

queue()
    .defer(d3.json, "https://api.oireachtas.ie/v1/debates")
    .await(testDebates);

}

function retrieveMembers () {

queue()
    .defer(d3.json, "https://api.oireachtas.ie/v1/members")
    .await(testMembers);

}

function testDebates (error, debData) {
    console.log("Function: testDebates");
    console.log(debData);    
    return true;
}

function testMembers (error, memData) {
    console.log("Function: testMembers");
    console.log(memData);
    return true;
}


// // ----------------------------------------------------
//                 Chart Code

// var dail = 0;
// var seanad = 0;

// function makeGraphs(error, salaryData) {


//     salaryData.results.forEach(data => {
//         console.log(data.debateRecord.house.houseCode)

//     })

//     console.log(dail)

//     var ndx = crossfilter(salaryData.results);

//     show_gender_balance(ndx);

//     dc.renderAll();
// }

// function show_gender_balance(ndx) {
//     var dim = ndx.dimension(dc.pluck('houseCode', function (houseCode, i) {
//         return this.debateRecord.house.houseCode;
//     }));
//     var group = dim.group();

//     dc.barChart("#chart")
//         .width(400)
//         .height(300)
//         .margins({
//             top: 10,
//             right: 50,
//             bottom: 30,
//             left: 50
//         })
//         .dimension(dim)
//         .group(group)
//         .transitionDuration(500)
//         .x(d3.scale.ordinal())
//         .xUnits(dc.units.ordinal)
//         .elasticY(true)
//         .xAxisLabel("Gender")
//         .yAxis().ticks(20);
// }

// ---------------------------------------------

// d3.json('https://api.oireachtas.ie/v1/debates').then(function(debatesData) {

//     var debates = debatesData.results;
//     // console.log(debates);

//     var debateCollection = [];

//     debates.forEach(debate => {
//         var house = {
//             "houseCode" : debate.debateRecord.house.houseCode
//         }
//         debateCollection.push(house);
//     });

//     var cf = crossfilter(debateCollection);
//     var byHouse = cf.dimension(dc.pluck('houseCode'));
//     var group = byHouse.group();    


//     dc.barChart("#chart")
//         .width(400)
//         .height(300)
//         .margins({top: 10, right: 50, bottom: 30, left: 50})
//         .dimension(byHouse)
//         .group(group)
//         .transitionDuration(500)
//         .x(d3.scale.ordinal())
//         .xUnits(dc.units.ordinal)
//         .elasticY(true)
//         .xAxisLabel("Gender")
//         .yAxis().ticks(20);

//         dc.renderAll();
//   });