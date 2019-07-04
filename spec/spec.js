describe("clearPage()", function () {
    it("should clear data.innerHTML", function () {
        clearPage();
        expect(document.getElementById("data").innerHTML).toBe('');
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
        });
    });
});

describe("Breadcrumbs", function () {
    describe("printing with crumbs.print()", function () {
        it("should show printed breadcrumbs", function () {
            document.getElementById("data").innerHTML = '';
            crumbs.print();
            expect(document.getElementById("data").innerHTML).not.toBe('');
        });
    });
});

