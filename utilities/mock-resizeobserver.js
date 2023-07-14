// see: https://github.com/radix-ui/primitives/issues/420

global.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb;
  }

  observe() {
    this.cb([{borderBoxSize: {inlineSize: 0, blockSize: 0}}]);
  }

  unobserve() {
    // do nothing
  }
};

global.DOMRect = {
  fromRect: () => ({top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0}),
};
