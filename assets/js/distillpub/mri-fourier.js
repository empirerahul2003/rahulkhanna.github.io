/* Simplified k-space / image domain picture for MRI */
(function () {
  const { mount, onReady, theme } = window.DistillWave;

  onReady(function () {
    let fill = 0.35;
    const viz = mount("mri-fourier", {
      title: "MRI and k-space sampling",
      caption: "More samples in frequency space (k-space) yield a sharper spatial image.",
      ariaLabel: "Schematic of k-space sampling and reconstructed image",
      height: 300,
      controls: function (el, api) {
        api.addSlider(el, "k-space coverage", 0.15, 1, 0.05, 0.35, function (v) {
          fill = v;
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

      const half = r.w / 2 - 12;
      const top = r.y0;
      const leftK = r.x0;
      const leftI = r.x0 + half + 24;

      ctx.fillStyle = colors.muted;
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("k-space (Fourier domain)", leftK + half / 2, top - 4);
      ctx.fillText("Image (spatial domain)", leftI + half / 2, top - 4);

      ctx.strokeStyle = colors.line;
      ctx.strokeRect(leftK, top, half, half);
      ctx.strokeRect(leftI, top, half, half);

      const grid = Math.max(4, Math.floor(6 + fill * 10));
      const step = half / grid;
      for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
          const cx = leftK + (i + 0.5) * step;
          const cy = top + (j + 0.5) * step;
          const dist = Math.hypot(i - grid / 2, j - grid / 2) / (grid / 2);
          if (dist <= fill) {
            ctx.fillStyle = colors.accent;
            ctx.globalAlpha = 0.35 + 0.5 * (1 - dist);
            ctx.beginPath();
            ctx.arc(cx, cy, step * 0.22, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }

      const cx = leftI + half / 2;
      const cy = top + half / 2;
      const radius = (half * 0.22 * fill) / 0.35;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius + half * 0.15);
      grd.addColorStop(0, colors.accent);
      grd.addColorStop(1, colors.bg);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, half * 0.42, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius, radius * 0.75, 0, 0, 2 * Math.PI);
      ctx.stroke();
    });
  });
})();
