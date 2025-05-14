## Dependencies

An important and early decision in any software project are foundational dependencies. They are present for so long that they tend to leak abstractions into the rest of the code, and in practice I've found it's easier to lean INTO this rather than try to add extra layers of indirection.
## Webserver Implementation

The python server uses only two dependencies for technical protocol implementations with minimal abstraction:
- `pyserial`
- `websockets`
## Framework Implementation

In order to avoid including too many dependencies I built a quick frontend framework (whoops!)

1. State management using signals - 300loc
2. Components using webcomponents - 500loc

It has been very productive, though in a professional setting I would tend towards using codebases with existing documentation and support rather than writing myself.

The basic theory is:

1. Signals are a function that can be called to retrieve the value, and a function to set the value
2. Effects call these functions to get the signal values, and perform side effects
3. When an effect is created it tracks which signals it calls
4. When a signal is updated it invokes all relevant effects

The component system is similar:

1. Each component has a tag that defines where it is placed
2. Each component has a template that is rendered inside the tag
3. Each component has an effect that produces a map of css selector to desired state
4. When the effect is called:
5. Each key in this map is looked up in the template and matched to a list of elements
6. The attributes, properties, and events of each matched element are updated

This is the core loop of Functional Reactive Programming, the foundational theory behind modern browser based frontend frameworks. It is surprising how little code it actually takes to implement, and in this exercise I've learned quite a bit of 

## Dependencies

A major pain point when working on javascript projects is the dependency management ecosystem. There are so many people creating so many tools that the goal seems to be missed. I don't want to spend my time building code, I want to spend it writing my logic!

From this principle I decided not to have *any* build system, and not to use any `npm`.

### Types are Good

The lack of a build system meant that the browser has to directly execute the code I write, which eliminated typescript. Luckily typescript can still be run during development! I installed `tsc` directly into the development environment, and wrote types into `jsdoc` comments. This allowed the computer to catch a large class of errors

```
/**
 * @implements {RobotInterface}
 */
export class RobotPreview {
  /**
   *
   * @param {RobotControl} control
   * @param {RobotState} initialState
   */
  constructor(control, initialState) {
    this.control = control;
    /** @type readonly [() => RobotState, (newState: RobotState) => void] */
    const [state, setState] = createSignal(initialState);
    this.state = state;
    this.setState = setState;
    this.name = "preview";
  }
  ...
```

### Dependencies are Still Useful

I recently went through the process of writing a 3d renderer for the browser directly, and it was not worth the effort. Instead I decided to use `three.js` which presents an issue because it is distributed as many interdependent files.

Modern browsers have a solution for this, the `importmap` lets us map names to paths that the browser can use to look up source files.

```html
<script type="importmap">
  {
	"imports": {
	  "three": "/js/vendor/three/three.js",
	  "three/": "/js/vendor/three/",
	  "urdf-loader/": "/vendor/js/urdf-loader/",
	  "closed-chain-ik-js": "/vendor/js/closed-chain-ik-js.js",
	  "gl-matrix": "/vendor/js/gl-matrix.esm.js",
	  "linear-solve": "/vendor/js/linear-solve.esm.js",
	  "svd-js": "/vendor/js/svd-js.esm.js"
	}
  }
</script>
```

In code I control it is possible to use relative imports, but this allows me to vendor (include in my source control) dependencies directly:

`staubli/html/vendor/js/urdf-loader/URDFLoader.js`
```
import * as THREE from 'three';

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
```

Causes the browser to fetch http://domain.tld/js/vendor/three/examples/jsm/loaders/STLLoader.js

So as long as I can put the files in the right places it is simple to find.

I'm concerned with ensuring that these files have a known providence and can be recreated or updated, so I added a shell script to re-download them:

```sh
...
curl "https://cdn.jsdelivr.net/npm/linear-solve@1.2.1/+esm"  --output "$VENDOR_DIR/js/linear-solve.esm.js"
curl "https://cdn.jsdelivr.net/npm/gl-matrix@3.4.3/+esm" --output "$VENDOR_DIR/js/gl-matrix.esm.js"
...
```
### URDF?

The **U**nified **R**obot **D**escription **F**ormat is a standard way to describe the kinematics of robots, including joints, constraints, collisions, and visualization. Two projects really helped me out, the [URDFLoader](https://github.com/gkjohnson/urdf-loaders) which takes the path to a urdf file and loads it into a three.js scene, and [closed-chain-ik-js](https://github.com/gkjohnson/closed-chain-ik-js) which uses the same structure to perform inverse kinematics (determine joint angles in order to position the end effector in a certain place)

The publicly available [Staubli TX90](https://github.com/Daniella1/urdf_files_dataset/tree/main/urdf_files/ros-industrial/xacro_generated/staubli/staubli_tx90_support) URDF definition is close enough to be useful, but isn't exactly the same. A few hours in FreeCAD and some reference to the manual allowed me to update it to an exact geometric match and an approximate visual match
## Result

With a predictable way to include a very small and stable set of dependencies I am free to write code knowing that no matter what happens to any of those projects my code will not break. In the future it doesn't matter if the ecosystem has moved from `webpack` to `vite` to `esbuild`, and it doesn't matter if the author of `left-pad` removes their repository and causes a cascading chain of dependencies to fail to resolve.