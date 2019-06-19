xdescribe("Member Page", function () {
    describe("retrieveMember", function () {
        it("should return nothing", function () {
            expect(retrieveMember()).toBe();
        });
    });
    describe("drawMember", function () {
        it("should return true", function () {
            expect().toBe(50);
        })
    })
});

describe("Oireachtas Page", function () {
    describe("open page", function () {
        it("should return 'oireachtas' string", function () {
            expect(oireachtasPage()).toBe('oireachtas');
        })
    })

})

describe("Member Page", function () {
    describe("open page", function () {
        it("should return 'member' string", function () {
            expect(memberPage()).toBe('member');
        })
    })

})

describe("Legislation Page", function () {
    describe("open page", function () {
        it("should return 'legislation' string", function () {
            expect(legislationPage()).toBe('legislation');
        })
    })

})

describe("clearPage()", function () {
    it("should clear data.innerHTML", function () {
        clearPage();
        expect(document.getElementById("data").innerHTML).toBe('');
    })
})
