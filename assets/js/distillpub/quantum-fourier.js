/* Position vs momentum wavepackets (Fourier duality) */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  function gaussian(x, sigma) {
    return Math.exp(-(x * x) / (2 * sigma * sigma));
  }

  onReady(function () {
    let sigma = 0.45;
    const viz = mount("quantum-fourier", {
      title: "Position–momentum duality",
      caption: "A narrow wavepacket in position space spreads in momentum space, and vice versa.",
      ariaLabel: "Gaussian wavepacket in position and momentum representations",
      height: 300,
      controls: function (el, api) {
        api.addSlider(el, "Position width σ", 0.2, 1.2, 0.05, 0.45, function (v) {
          sigma = v;
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

      const half = r.w / 2 - 16;
      const top = r.y0 + 10;
      const leftX = r.x0;
      const leftP = r.x0 + half + 32;
      const sigmaP = 1 / (2 * sigma);

      ctx.fillStyle = colors.muted;
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ψ(x)  position space", leftX + half / 2, top - 2);
      ctx.fillText("ψ(p)  momentum space", leftP + half / 2, top - 2);

      function drawPanel(left, fn, color) {
        ctx.strokeStyle = colors.line;
        ctx.strokeRect(left, top, half, r.h - 40);
        const midY = top + (r.h - 40) / 2;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const n = 200;
        for (let i = 0; i <= n; i++) {
          const u = -3 + (i / n) * 6;
          const y = fn(u);
          const px = left + ((u + 3) / 6) * half;
          const py = midY - y * (r.h - 40) * 0.38;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
      }

      drawPanel(leftX, function (x) {
        return gaussian(x, sigma);
      }, colors.accent);
      drawPanel(leftP, function (p) {
        return gaussian(p, sigmaP);
      }, colors.accent);

      ctx.fillStyle = colors.text;
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("Narrow in x  ↔  broad in p", r.x0, r.y0 + r.h + 8);
    });
  });
})();
