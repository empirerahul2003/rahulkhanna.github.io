/* Musical tone as fundamental + harmonics */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  const weights = [1, 0.55, 0.3, 0.18, 0.1, 0.06];

  onReady(function () {
    let active = 3;
    const viz = mount("music-harmonics", {
      title: "Harmonics of a musical tone",
      caption: "A note is a fundamental frequency plus weaker overtones at integer multiples.",
      ariaLabel: "Spectrum and waveform of a tone built from harmonics",
      height: 320,
      controls: function (el, api) {
        api.addSlider(el, "Harmonics shown", 1, 6, 1, 3, function (v) {
          active = v;
        });
      },
    });
    if (!viz) return;

    viz.loop(function (t) {
      const colors = theme();
      const r = viz.plotRect();
      const ctx = viz.state.ctx;
      viz.clear(colors);

      const fund = 2;
      const omega = 4;

      viz.drawAxes(colors, { x: "time", y: "pressure" });
      viz.drawCurve(
        function (x) {
          let s = 0;
          for (let n = 1; n <= active; n++) {
            s += weights[n - 1] * Math.sin(n * fund * x - n * omega * t * 0.25);
          }
          return s / active;
        },
        0,
        2 * Math.PI,
        colors.accent,
        2.5,
      );

      const barW = r.w / (weights.length + 1);
      const baseY = r.y0 + r.h + 8;
      ctx.fillStyle = colors.muted;
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "center";
      for (let i = 0; i < weights.length; i++) {
        const h = weights[i] * (r.h * 0.35);
        const x = r.x0 + (i + 1) * barW;
        ctx.fillStyle = i < active ? colors.accent : colors.line;
        ctx.fillRect(x - barW * 0.25, baseY - h, barW * 0.5, h);
        ctx.fillStyle = colors.muted;
        ctx.fillText(i + 1, x, baseY + 14);
      }
      ctx.fillText("harmonic number", r.x0 + r.w / 2, baseY + 28);
    });
  });
})();
