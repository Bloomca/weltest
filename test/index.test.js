const shallow = require("../src/shallow");
const Welgo = require("welgo");
const h = Welgo.createElement;

test("wrapper should have `findComponent` method", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await shallow(h("div", null, h(El1), " ", h(El1), h(El2)));

  expect(wrapper.findComponent).toBeInstanceOf(Function);
});

test("findComponent should find a correct number of instances", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await shallow(h("div", null, h(El1), " ", h(El1), h(El2)));

  expect(wrapper.findComponent(El1)).toHaveLength(2);
  expect(wrapper.findComponent(El2)).toHaveLength(1);
});
