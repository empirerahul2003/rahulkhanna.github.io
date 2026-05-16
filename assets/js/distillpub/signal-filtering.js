/* Time-domain signal vs frequency-domain filtering */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  function noisySignal(x, t) {
    return Math.sin(2 * x - 1.5 * t) + 0.35 * Math.sin(7 * x - 0.4 * t) + 0.25 * Math.sin(19 * x);
  }

  onReady(function () {
    let cutoff = 5;
    const viz = mount("signal-filtering", {
      title: "Filtering in frequency space",
      caption: "Low-pass filtering attenuates high-frequency noise while preserving the main tone.",
      ariaLabel: "Noisy signal and filtered spectrum",
      height: 320,
      controls: function (el, api) {
        api.addSlider(el, "Low-pass cutoff (mode)", 2, 12, 1, 5, function (v) {
          cutoff = v;
        });
      },
    });
    if (!viz) return;

    viz.loop(function (t) {
      const colors = theme();
      const r = viz.plotRect();
      const ctx = viz.state.ctx;
      viz.clear(colors);

      ctx.fillStyle = colors.muted;
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Time domain", r.x0, r.y0 - 6);

      viz.drawAxes(colors, { x: "x", y: "signal" });
      viz.drawCurve(
        function (x) {
          return noisySignal(x, t);
        },
        0,
        2 * Math.PI,
        colors.muted,
        1.5,
      );
      viz.drawCurve(
        function (x) {
          let s = Math.sin(2 * x - 1.5 * t);
          if (cutoff >= 7) s += 0.35 * Math.sin(7 * x - 0.4 * t);
          return s;
        },
        0,
        2 * Math.PI,
        colors.accent,
        2.5,
      );

      const modes = [2, 7, 19];
      const amps = [1, 0.35, 0.25];
      const specTop = r.y0 + r.h * 0.55;
      const specH = r.h * 0.35;
      ctx.fillText("Frequency magnitudes", r.x0, specTop - 8);
      const bw = r.w / (modes.length + 2);
      modes.forEach(function (m, i) {
        const atten = m <= cutoff ? 1 : 0.12;
        const h = amps[i] * specH * atten;
        const x = r.x0 + (i + 1.5) * bw;
        ctx.fillStyle = m <= cutoff ? colors.accent : colors.line;
        ctx.fillRect(x - bw * 0.3, specTop + specH - h, bw * 0.6, h);
        ctx.fillStyle = colors.muted;
        ctx.textAlign = "center";
        ctx.fillText(String(m), x, specTop + specH + 14);
      });
    });
  });
})();
