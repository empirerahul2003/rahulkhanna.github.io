/* Gibbs phenomenon near a square-wave jump */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  function square(x) {
    return x < Math.PI / 2 ? 1 : -1;
  }

  function partialSum(x, nMax) {
    let s = 0;
    for (let n = 1; n <= nMax; n += 2) {
      s += (4 / (n * Math.PI)) * Math.sin(n * x);
    }
    return s;
  }

  onReady(function () {
    let nMax = 5;
    const viz = mount("gibbs-wave", {
      title: "Gibbs phenomenon",
      caption: "Near the jump, overshoot persists even as more harmonics are added.",
      ariaLabel: "Zoomed view of Gibbs overshoot on a square wave",
      height: 300,
      controls: function (el, api) {
        api.addSlider(el, "Odd harmonics", 1, 51, 2, 5, function (v) {
          nMax = v;
          api.redraw();
        });
      },
    });
    if (!viz) return;

    viz.redraw(function () {
      const colors = theme();
      viz.clear(colors);
      viz.drawAxes(colors, { x: "x (near discontinuity)", y: "f(x)" });

      const xMin = 0.4;
      const xMax = 1.2;
      viz.drawCurve(square, xMin, xMax, colors.muted, 1.5);
      viz.drawCurve(
        function (x) {
          return partialSum(x, nMax);
        },
        xMin,
        xMax,
        colors.accent,
        2.5,
      );
    });
  });
})();
