function oireachtasPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `
    <h1>Oireachtas</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, corporis nam optio reiciendis libero soluta earum a alias! Voluptate cum eius, et laborum sed odit at repellat dolorem tempora. Maiores saepe impedit accusamus aspernatur hic assumenda, non amet cum esse aperiam vero molestiae quae fugiat possimus natus dolorem incidunt sit praesentium repellendus modi ratione excepturi quod nam minus. Dolor dignissimos magni blanditiis nisi eligendi voluptatem expedita, natus temporibus, libero sequi necessitatibus error atque perspiciatis eveniet earum amet, incidunt sint odit! Unde ratione, dolores illum esse nam ipsum obcaecati, ad, et praesentium quaerat tempore! Officiis ab et, iure explicabo voluptates saepe!</p>
    <div class="row">

        <div class="col-6 card text-center">
            <div class="inner">
                <h2>Dail</h2>
                <p>This is the dail breakdown</p>
                <div class="box w-auto"></div>        
            </div>
        </div>
        <div class="col-6 card text-center">
            <div class="inner">
                <h2>Seanad</h2>
                <p>This is the seanad breakdown</p>
                <div class="box w-auto"></div>
            </div>
        </div>

    </div>

    <h2>Members</h2>
    <div class="list-group">
        <a onclick="memberPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Micahel Ahern</h5>
                <small>Dail</small>
            </div>
            <small>Sinn Fein</small>
        </a>

        <a onclick="memberPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Micahel Ahern</h5>
                <small>Dail</small>
            </div>
            <small>Sinn Fein</small>
        </a>

        <a onclick="memberPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Micahel Ahern</h5>
                <small>Dail</small>
            </div>
            <small>Sinn Fein</small>
        </a>

        <a onclick="memberPage()" href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Micahel Ahern</h5>
                <small>Dail</small>
            </div>
            <small>Sinn Fein</small>
        </a>

    </div>        

    `;
    return "oireachtas";
}

function memberPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `
    <h1>Michael Ahern</h1>
    <div class="row">
        <div class="col-3">
            <img src="https://data.oireachtas.ie/ie/oireachtas/member/id/Se%C3%A1n-%C3%93-Feargha%C3%ADl.S.2000-06-09/image/large" alt="" class="member-img rounded">
        </div>
        <div class="col-6">
            <p>TD in the Dail</p>
            <p>Representing Cork</p>
            <p>Since 21/05/14</p>
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
    return "member";
}

function legislationPage () {
    clearPage();
    var data = document.getElementById("data");
    data.innerHTML = `
    <h1>Health (Pricing and Supply of Medical Goods) (Amendment) Bill 2018: First Stage</h1>

        <p>Bill entitled an Act to amend the Health (Pricing and Supply of Medical Goods) Act 2013 to establish specific criteria applicable for orphan medicinal products for the purposes of the Health Service Executive making a relevant decision regarding adding an item to the Reimbursement List",</p>

        <h2>Sponsored By:</h2>
        <div class="list-group">
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
        </div>        

    `;
    return "legislation";
}

function retrieveMember () {
    queue()
    .defer(d3.json, "https://api.oireachtas.ie/v1/members")
    .await(drawMember);
}

function drawMember (error, data) {
    console.log(data);
}

function clearPage () {
    var data = document.getElementById("data");
    data.innerHTML = "";
}
