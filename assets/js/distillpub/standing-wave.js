/* Standing wave: u(x,t) = sin(kx) cos(ωt) */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  onReady(function () {
    const viz = mount("standing-wave", {
      title: "Standing wave",
      caption: "Nodes stay fixed while the envelope oscillates in place.",
      ariaLabel: "Animated standing wave on a fixed interval",
    });
    if (!viz) return;

    const k = 2;
    const omega = 2;

    viz.loop(function (t) {
      const colors = theme();
      viz.clear(colors);
      viz.drawAxes(colors, { x: "x", y: "u(x,t)" });

      const envelope = Math.cos(omega * t);
      viz.drawCurve(
        function (x) {
          return envelope * Math.sin(k * x);
        },
        0,
        Math.PI,
        colors.accent,
        2.5,
      );

      const r = viz.plotRect();
      const ctx = viz.state.ctx;
      ctx.strokeStyle = colors.muted;
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(r.x0, viz.mapY(1, -1.2, 1.2));
      ctx.lineTo(r.x0 + r.w, viz.mapY(1, -1.2, 1.2));
      ctx.moveTo(r.x0, viz.mapY(-1, -1.2, 1.2));
      ctx.lineTo(r.x0 + r.w, viz.mapY(-1, -1.2, 1.2));
      ctx.stroke();
      ctx.setLineDash([]);
    });
  });
})();
