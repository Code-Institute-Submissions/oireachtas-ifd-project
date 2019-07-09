// A data repository for displaying data gathered from oireachtas API.
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
            expect(pagination.getName()).toBe("Dail");
            expect(pagination.getNumber()).toBe(32);
        });
        it("should return seanad details", function () {
            pagination.house = 1;
            expect(pagination.getName()).toBe("Seanad");
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

