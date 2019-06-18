function retrieveMember () {
    queue()
    .defer(d3.json, "https://api.oireachtas.ie/v1/debates")
    .await(drawMember);
}

function drawMember (error, data) {
    return true;

}