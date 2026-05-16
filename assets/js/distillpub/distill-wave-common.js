/**
 * Shared canvas utilities for Fourier-series distill figures.
 */
(function (global) {
  function theme() {
    const s = getComputedStyle(document.documentElement);
    const v = (name, fallback) => s.getPropertyValue(name).trim() || fallback;
    return {
      text: v("--global-text-color", "#363636"),
      line: v("--global-divider-color", "#d0d0d0"),
      accent: v("--global-theme-color", "#b509ac"),
      bg: v("--global-bg-color", "#ffffff"),
      muted: v("--global-muted-color", "#828282"),
    };
  }

  function mount(containerId, options) {
    const host = document.getElementById(containerId);
    if (!host) return null;

    const opts = options || {};
    host.classList.add("wave-viz");
    host.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "wave-viz-inner";

    if (opts.title) {
      const h = document.createElement("div");
      h.className = "wave-title";
      h.textContent = opts.title;
      wrap.appendChild(h);
    }

    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute(
      "aria-label",
      opts.ariaLabel || opts.title || "Interactive wave visualization",
    );
    wrap.appendChild(canvas);

    if (opts.caption) {
      const cap = document.createElement("p");
      cap.className = "wave-caption l-text";
      cap.textContent = opts.caption;
      wrap.appendChild(cap);
    }

    host.appendChild(wrap);

    const ctx = canvas.getContext("2d");
    const state = {
      host,
      canvas,
      ctx,
      controlsEl,
      width: 0,
      height: 0,
      padding: opts.padding || { top: 24, right: 20, bottom: 36, left: 48 },
      t: 0,
      running: true,
      raf: null,
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = host.clientWidth || 640;
      const h = opts.height || 280;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.width = w;
      state.height = h;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    function plotRect() {
      const p = state.padding;
      return {
        x0: p.left,
        y0: p.top,
        w: state.width - p.left - p.right,
        h: state.height - p.top - p.bottom,
      };
    }

    function clear(colors) {
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, state.width, state.height);
    }

    function drawAxes(colors, labels) {
      const r = plotRect();
      const c = colors;
      ctx.strokeStyle = c.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(r.x0, r.y0 + r.h / 2);
      ctx.lineTo(r.x0 + r.w, r.y0 + r.h / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(r.x0, r.y0);
      ctx.lineTo(r.x0, r.y0 + r.h);
      ctx.stroke();

      ctx.fillStyle = c.muted;
      ctx.font = "12px system-ui, sans-serif";
      if (labels && labels.x) {
        ctx.textAlign = "center";
        ctx.fillText(labels.x, r.x0 + r.w / 2, state.height - 8);
      }
      if (labels && labels.y) {
        ctx.save();
        ctx.translate(14, r.y0 + r.h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText(labels.y, 0, 0);
        ctx.restore();
      }
    }

    function mapX(x, xMin, xMax) {
      const r = plotRect();
      return r.x0 + ((x - xMin) / (xMax - xMin)) * r.w;
    }

    function mapY(y, yMin, yMax) {
      const r = plotRect();
      return r.y0 + r.h / 2 - ((y - yMin) / (yMax - yMin)) * r.h;
    }

    function drawCurve(fn, xMin, xMax, color, lineWidth) {
      const r = plotRect();
      const n = Math.max(200, Math.floor(r.w));
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth || 2;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const x = xMin + (i / n) * (xMax - xMin);
        const y = fn(x);
        const px = mapX(x, xMin, xMax);
        const py = mapY(y, -1.2, 1.2);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    function addSlider(parent, label, min, max, step, value, onInput) {
      const row = document.createElement("div");
      row.className = "wave-control";
      const span = document.createElement("label");
      span.textContent = label;
      const input = document.createElement("input");
      input.type = "range";
      input.min = min;
      input.max = max;
      input.step = step;
      input.value = value;
      const val = document.createElement("output");
      val.textContent = value;
      input.addEventListener("input", () => {
        val.textContent = input.value;
        onInput(Number(input.value), input);
      });
      row.appendChild(span);
      row.appendChild(input);
      row.appendChild(val);
      parent.appendChild(row);
      return input;
    }

    function loop(draw) {
      function frame() {
        if (state.running) {
          draw(state.t);
          state.t += 0.04;
        }
        state.raf = requestAnimationFrame(frame);
      }
      state.raf = requestAnimationFrame(frame);
    }

    let drawFn = null;

    function redraw(draw) {
      if (draw) drawFn = draw;
      if (drawFn) drawFn(state.t);
    }

    function destroy() {
      state.running = false;
      if (state.raf) cancelAnimationFrame(state.raf);
      ro.disconnect();
    }

    const api = {
      state,
      theme,
      plotRect,
      clear,
      drawAxes,
      mapX,
      mapY,
      drawCurve,
      addSlider,
      loop,
      redraw,
      destroy,
    };

    if (opts.controls) {
      controlsEl = document.createElement("div");
      controlsEl.className = "wave-controls";
      if (typeof opts.controls === "function") {
        opts.controls(controlsEl, api);
      } else {
        controlsEl.innerHTML = opts.controls;
      }
      wrap.appendChild(controlsEl);
    }

    return api;
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  global.DistillWave = { mount, onReady, theme };
})(window);
