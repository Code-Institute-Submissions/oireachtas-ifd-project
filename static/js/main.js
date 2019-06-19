function retrieveMember () {
    queue()
    .defer(d3.json, "https://api.oireachtas.ie/v1/members")
    .await(drawMember);
}

function drawMember (error, data) {
    console.log(data);
}

