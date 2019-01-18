## Weltest

Library to test [welgo library](https://github.com/Bloomca/welgo) code.

## API

Shallow rendering:

```js
const { createElement } = require('welgo');
const htm = require('htm');
const { shallow } = require('weltest');

const html = htm.bind(createElement);

test('<MyComponent /> renders three <Foo /> components', () => {
  const wrapper = shallow(html`<${MyComponent} />`);
  expect(wrapper.find(Foo)).to.have.lengthOf(3);
});

it('<MyComponent /> renders an `.icon-star`', () => {
  const wrapper = shallow(html`<${MyComponent} />`);
  expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
});
```

Instead of using `shallow`, you can use `mount` method:

```js
const { mount } = require('weltest');
```

The idea of shallow/full-rendering is taken from [enzyme](https://airbnb.io/enzyme/docs/api/shallow.html).

Right now wrapper offers only one method – `find`. If you pass a selector (for [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)), it will return a list of DOM nodes. If you pass an actual component, it will return an array of wrappers, on which you can `find` again.

## Run

If you want to run tests in this repository, you'll need Node v10+.

```sh
npm i
npm t
```

## License

MIT