/* Signal reconstruction with few vs many Fourier coefficients */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  function target(x) {
    return 0.6 * Math.sin(x) + 0.25 * Math.sin(3 * x) + 0.15 * Math.sin(5 * x) + 0.1 * Math.sin(11 * x);
  }

  function compress(x, keep) {
    const modes = [
      [1, 0.6],
      [3, 0.25],
      [5, 0.15],
      [11, 0.1],
    ];
    let s = 0;
    modes.forEach(function (pair, i) {
      if (i < keep) s += pair[1] * Math.sin(pair[0] * x);
    });
    return s;
  }

  onReady(function () {
    let keep = 2;
    const viz = mount("compression-wave", {
      title: "Compression via sparse frequencies",
      caption: "Keeping only the largest harmonic coefficients still reconstructs the main shape.",
      ariaLabel: "Original signal compared to a sparse Fourier reconstruction",
      controls: function (el, api) {
        api.addSlider(el, "Coefficients kept", 1, 4, 1, 2, function (v) {
          keep = v;
          api.redraw();
        });
      },
    });
    if (!viz) return;

    viz.redraw(function () {
      const colors = theme();
      viz.clear(colors);
      viz.drawAxes(colors, { x: "x", y: "amplitude" });
      viz.drawCurve(target, 0, 2 * Math.PI, colors.muted, 1.5);
      viz.drawCurve(
        function (x) {
          return compress(x, keep);
        },
        0,
        2 * Math.PI,
        colors.accent,
        2.5,
      );
    });
  });
})();
