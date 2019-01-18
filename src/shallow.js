const { irender } = require("welgo");

module.exports = async function shallow(tree, resolver) {
  const structure = await irender(tree, resolver, { depth: 1 });

  return createWrapper(structure);
};

function createWrapper(structure) {
  return {
    findComponent: Component => findComponent(structure, Component)
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
