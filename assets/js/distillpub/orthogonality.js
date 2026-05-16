/* Orthogonality of sine modes on [-π, π] */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  onReady(function () {
    let m = 2;
    let n = 3;
    const viz = mount("orthogonality", {
      title: "Orthogonal sine modes",
      caption: "When m ≠ n, the product sin(mx)sin(nx) oscillates symmetrically and averages to zero.",
      ariaLabel: "Product of two sine modes illustrating orthogonality",
      controls: function (el, api) {
        api.addSlider(el, "m", 1, 6, 1, 2, function (v) {
          m = v;
          api.redraw();
        });
        api.addSlider(el, "n", 1, 6, 1, 3, function (v) {
          n = v;
          api.redraw();
        });
      },
    });
    if (!viz) return;

    viz.redraw(function () {
      const colors = theme();
      const r = viz.plotRect();
      const ctx = viz.state.ctx;
      viz.clear(colors);
      viz.drawAxes(colors, { x: "x", y: "sin(mx)·sin(nx)" });

      viz.drawCurve(
        function (x) {
          return Math.sin(m * x) * Math.sin(n * x);
        },
        -Math.PI,
        Math.PI,
        colors.accent,
        2.5,
      );

      const samples = 400;
      let sum = 0;
      for (let i = 0; i < samples; i++) {
        const x = -Math.PI + (i / (samples - 1)) * (2 * Math.PI);
        sum += Math.sin(m * x) * Math.sin(n * x);
      }
      const integral = (sum / samples) * (2 * Math.PI);
      const orthogonal = m !== n;

      ctx.fillStyle = colors.text;
      ctx.font = "13px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        orthogonal
          ? "m ≠ n  →  ∫ sin(mx)sin(nx) dx ≈ 0 (orthogonal)"
          : "m = n  →  modes are not orthogonal to themselves",
        r.x0,
        r.y0 - 8,
      );
      ctx.fillStyle = colors.muted;
      ctx.fillText("Riemann sum ≈ " + integral.toFixed(3), r.x0, r.y0 + r.h + 22);
    });
  });
})();
