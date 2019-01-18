const { irender, renderer } = require("welgo");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports.shallow = async function shallow(tree, resolver) {
  const structure = await irender(tree, resolver, { depth: 1 });

  return createWrapper(structure);
};

module.exports.mount = async function mount(tree, resolver) {
  const structure = await irender(tree, resolver);

  return createWrapper(structure);
};

function createWrapper(structure) {
  return {
    find: selector => {
      if (typeof selector === "string") {
        const str = renderer(structure);

        const dom = new JSDOM(str);
        return dom.window.document.querySelectorAll(selector);
      }

      if (typeof selector === "function") {
        return findComponent(structure, selector);
      }

      throw new Error("Only strings and functions are supported");
    }
  };
}

function findComponent(tree, Component) {
  const components = [];
  traverse(tree);
  function traverse(tree) {
    if (tree) {
      if (tree.component && tree.component === Component) {
        components.push(createWrapper(tree));
        return;
      }

      if (Array.isArray(tree)) {
        tree.forEach(traverse);
      }

      if (typeof tree === "object" && tree.children) {
        traverse(tree.children);
      }
    }
  }

  return components;
}
