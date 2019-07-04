describe("clearPage()", function () {
    it("should clear data.innerHTML", function () {
        clearPage();
        expect(document.getElementById("data").innerHTML).toBe('');
    })
})

describe("drawMember()", function () {
    var member = {};
    beforeEach(function () {
        member = {"fullName" : "John", "uri" : "abc"}
    });
    it("should draw a member", function () {
        drawMember(member);
        expect(document.getElementById("data").innerHTML).not.toBe('');
    })
})

describe("Pagination", function () {
    describe("house details", function () {
        it("should return dail details", function () {
            pagination.house = 0;
            expect(pagination.getName()).toBe("dail");
            expect(pagination.getNumber()).toBe(32);
        });
        it("should return seanad details", function () {
            pagination.house = 1;
            expect(pagination.getName()).toBe("seanad");
            expect(pagination.getNumber()).toBe(25);
        });
    });
    describe("printing with pagination.print()", function () {
        it("should show printed details", function () {
            pagination.house = 0;
            document.getElementById("pagination").innerHTML = '';
            pagination.print();
            expect(document.getElementById("pagination").innerHTML).not.toBe('');
        });
    });
});

describe("Breadcrumbs", function () {
    describe("reset with crumbs.home()", function () {
        it("should reset breadcrumbs to oireachtas entry", function () {
            crumbs.breadcrumbs = [];
            crumbs.home();
            expect(crumbs.breadcrumbs.length).toBe(1);
        });
    });
    describe("printing with crumbs.print()", function () {
        it("should show printed breadcrumbs", function () {
            document.getElementById("data").innerHTML = '';
            crumbs.print();
            expect(document.getElementById("data").innerHTML).not.toBe('');
        });
    });
});

