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

test("shallow does render children defined in the first component", async () => {
  const El3 = function Component3() {
    return h("div");
  };
  const El1 = function Component1() {
    return h("div", null, "some", h(El2, null, "div", h(El3)));
  };

  const El2 = function Component2() {
    return h("div", null, "some2");
  };

  const wrapper = await shallow(h(El1));

  expect(wrapper.find(El3)).toHaveLength(1);
});

test("shallow does render children defined in the first component x2", async () => {
  const El4 = function Component3() {
    return h("span");
  };
  const El3 = function Component3() {
    return h("div");
  };
  const El2 = function Component2() {
    return h("div", null, "some2");
  };
  const El1 = function Component1() {
    return h(El2, null, "some", h(El3, null, "div", h(El4)));
  };

  const wrapper = await shallow(h(El1));

  expect(wrapper.find(El4)).toHaveLength(1);
});

test("shallow wrapper can find children defined in the first component", async () => {
  const El4 = function Component4() {
    return h("span");
  };
  const El3 = function Component3() {
    return h("div");
  };
  const El2 = function Component2() {
    return h("div", null, "some2");
  };
  const El1 = function Component1() {
    return h(
      El2,
      null,
      "some",
      h(El3, null, "div", h(El4, null, h("a", { href: "/" })))
    );
  };

  const wrapper = await shallow(h(El1));

  const link = wrapper.find("a")[0];

  expect(link).toBeTruthy();

  expect(link.getAttribute("href")).toBe("/");
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

test("mount should work with several nested components", async () => {
  const El1 = function Component1() {
    return h("div", null, "some");
  };

  const El2 = function Component2() {
    return h("div", null, h(El1));
  };

  const wrapper = await mount(h("div", null, h(El2)));

  expect(wrapper.find(El1)).toHaveLength(1);
});
