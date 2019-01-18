const { shallow, mount } = require("../src");
const Welgo = require("welgo");
const h = Welgo.createElement;

test("shallow wrapper should have `findComponent` method", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await shallow(h("div", null, h(El1), " ", h(El1), h(El2)));

  expect(wrapper.find).toBeInstanceOf(Function);
});

test("shallow find should find a correct number of instances", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await shallow(h("div", null, h(El1), " ", h(El1), h(El2)));

  expect(wrapper.find(El1)).toHaveLength(2);
  expect(wrapper.find(El2)).toHaveLength(1);
});

test("shallow find should find a DOM node", async () => {
  const El1 = function Component() {
    return h("div", { title: "some" }, "text");
  };

  const wrapper = await shallow(h(El1));

  expect(wrapper.find("[title=some]")[0].getAttribute("title")).toBe("some");
});

test("shallow does not render more than one level", async () => {
  const El1 = function Component1() {
    return h("div", null, "some", h(El2));
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await shallow(h("div", null, h(El1), " ", h(El1)));

  expect(wrapper.find(El2)).toHaveLength(0);
});

test("mounted wrapper should have `findComponent` method", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await mount(h("div", null, h(El1), " ", h(El1), h(El2)));

  expect(wrapper.find).toBeInstanceOf(Function);
});

test("mounted find should find a correct number of instances", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await mount(h("div", null, h(El1), " ", h(El1), h(El2)));

  expect(wrapper.find(El1)).toHaveLength(2);
  expect(wrapper.find(El2)).toHaveLength(1);
});

test("mounted find should find a DOM node", async () => {
  const El1 = function Component() {
    return h("div", { title: "some" }, "text");
  };

  const wrapper = await mount(h(El1));

  expect(wrapper.find("[title=some]")[0].getAttribute("title")).toBe("some");
});
