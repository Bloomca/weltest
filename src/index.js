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
    findComponent: Component => findComponent(structure, Component),
    find: selector => {
      const str = renderer(structure);

      const dom = new JSDOM(str);
      const a = dom.window.document.querySelectorAll(selector);
      return a;
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
