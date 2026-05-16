/* Superposition of two traveling waves */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  onReady(function () {
    let phaseDeg = 0;
    const viz = mount("interference-wave", {
      title: "Wave interference",
      caption: "Adjust the phase difference to see constructive and destructive interference.",
      ariaLabel: "Two sine waves superposed with adjustable phase",
      controls: function (el, api) {
        api.addSlider(el, "Phase difference (°)", 0, 360, 1, 0, function (v) {
          phaseDeg = v;
        });
      },
    });
    if (!viz) return;

    const k = 3;
    const omega = 2;

    viz.loop(function (t) {
      const colors = theme();
      const phase = (phaseDeg * Math.PI) / 180;
      viz.clear(colors);
      viz.drawAxes(colors, { x: "x", y: "amplitude" });

      viz.drawCurve(
        function (x) {
          return 0.55 * Math.sin(k * x - omega * t);
        },
        0,
        2 * Math.PI,
        colors.muted,
        1.5,
      );
      viz.drawCurve(
        function (x) {
          return 0.55 * Math.sin(k * x - omega * t + phase);
        },
        0,
        2 * Math.PI,
        colors.muted,
        1.5,
      );
      viz.drawCurve(
        function (x) {
          const a = 0.55 * Math.sin(k * x - omega * t);
          const b = 0.55 * Math.sin(k * x - omega * t + phase);
          return a + b;
        },
        0,
        2 * Math.PI,
        colors.accent,
        2.5,
      );
    });
  });
})();
