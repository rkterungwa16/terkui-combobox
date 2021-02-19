import * as FilterUtils from "./filter-utils"

describe("Filter Utils: Navigate items", function() {
  const data = [
    { id: 1, fullName: 'Jimmy' },
    { id: 2, fullName: 'jim' },
    { id: 3, fullName: 'James' },
    { id: 4, fullName: 'Jamie' },
    { id: 5, fullName: 'Jamal' },
    { id: 6, fullName: 'Jason' },
    { id: 7, fullName: 'John' },
  ]
  it("should be able to navigate to the previous item from the current item", function() {
    expect(FilterUtils.prev(data[3], data)).toEqual(data[2]);
  })

  it("should be able to navigate to the next item from the current item", function() {
    expect(FilterUtils.next(data[3], data)).toEqual(data[4]);
  })

  it("should be able to navigate to the last item from the first item", function() {
    expect(FilterUtils.prev(data[0], data)).toEqual(data[6]);
  })

  it("should be able to navigate to the first item from the last item", function() {
    expect(FilterUtils.next(data[6], data)).toEqual(data[0]);
  })
})
