/* Parseval: energy in time vs sum of harmonic energies */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  const coeffs = [
    { label: "a₀/2", energy: 0.08 },
    { label: "a₁,c₁", energy: 0.22 },
    { label: "a₂,b₂", energy: 0.18 },
    { label: "a₃,b₃", energy: 0.14 },
    { label: "a₄,b₄", energy: 0.11 },
    { label: "a₅,b₅", energy: 0.09 },
    { label: "…", energy: 0.18 },
  ];

  onReady(function () {
    const viz = mount("parseval", {
      title: "Parseval's identity",
      caption: "Total energy equals the sum of energies stored in each harmonic component.",
      ariaLabel: "Bar chart comparing total signal energy and harmonic energies",
      height: 300,
    });
    if (!viz) return;

    viz.redraw(function () {
      const colors = theme();
      const r = viz.plotRect();
      const ctx = viz.state.ctx;
      viz.clear(colors);

      const total = coeffs.reduce(function (s, c) {
        return s + c.energy;
      }, 0);

      ctx.fillStyle = colors.muted;
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "center";

      const groups = [
        { title: "Time-domain\nenergy", value: total, x: r.x0 + r.w * 0.18 },
        { title: "Harmonic\nenergies", value: total, x: r.x0 + r.w * 0.62 },
      ];

      groups.forEach(function (g) {
        ctx.fillStyle = colors.text;
        g.title.split("\n").forEach(function (line, i) {
          ctx.fillText(line, g.x, r.y0 + 16 + i * 14);
        });
        const barH = (g.value / total) * (r.h - 50);
        ctx.fillStyle = colors.accent;
        ctx.fillRect(g.x - 28, r.y0 + r.h - barH, 56, barH);
        ctx.fillStyle = colors.muted;
        ctx.fillText("∝ energy", g.x, r.y0 + r.h + 18);
      });

      const startX = r.x0 + r.w * 0.46;
      const bw = (r.w * 0.48) / coeffs.length;
      coeffs.forEach(function (c, i) {
        const x = startX + i * bw + bw / 2;
        const h = (c.energy / total) * (r.h - 50);
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = 0.55 + 0.45 * (c.energy / 0.22);
        ctx.fillRect(x - bw * 0.32, r.y0 + r.h - h, bw * 0.64, h);
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.muted;
        ctx.font = "10px system-ui, sans-serif";
        ctx.fillText(c.label, x, r.y0 + r.h + 14);
      });

      ctx.fillStyle = colors.text;
      ctx.font = "13px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("∫|f|² dx  =  a₀²/2 + Σ(aₙ² + bₙ²)", r.x0, r.y0 - 6);
    });
  });
})();
