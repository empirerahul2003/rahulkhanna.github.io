/******************************************************************************
 * Traveling Wave Visualization
 *
 * Distill-style interactive figure for Fourier blog
 * Compatible with GitHub Pages + Jekyll
 * Uses D3 v7 only (no React)
 ******************************************************************************/

(function () {
  const container = document.getElementById("traveling-wave");

  // Stop if element does not exist on page
  if (!container) return;

  if (typeof d3 === "undefined") {
    console.error("traveling-wave.js requires D3 v7 to be loaded first.");
    return;
  }

  /***************************************************************************
   * Layout settings
   ***************************************************************************/
  const width = 900;
  const height = 420;
  const margin = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 50,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  /***************************************************************************
   * Wave parameters
   ***************************************************************************/
  let amplitude = 1;
  let wavelength = 2;
  let speed = 1;
  let playing = true;
  let time = 0;

  /***************************************************************************
   * Create figure wrapper
   ***************************************************************************/
  container.innerHTML = `
    <div class="wave-header">
      <div class="wave-kicker">
        Interactive visualization
      </div>

      <h3 class="wave-title">
        Traveling Wave
      </h3>

      <p class="wave-subtitle">
        A traveling wave preserves its shape while moving
        through space.
      </p>
    </div>

    <div class="wave-equation">
      $$u(x,t)=A\\sin(kx-\\omega t)$$
    </div>

    <div id="traveling-wave-svg"></div>

    <div class="wave-controls">

      <div class="wave-control">
        <label>
          Amplitude:
          <span id="amp-label">1.0</span>
        </label>

        <input
          id="amp-slider"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value="1"
        />
      </div>

      <div class="wave-control">
        <label>
          Wavelength:
          <span id="wave-label">2.0</span>
        </label>

        <input
          id="wave-slider"
          type="range"
          min="1"
          max="5"
          step="0.1"
          value="2"
        />
      </div>

      <div class="wave-control">
        <label>
          Speed:
          <span id="speed-label">1.0</span>
        </label>

        <input
          id="speed-slider"
          type="range"
          min="0.2"
          max="3"
          step="0.1"
          value="1"
        />
      </div>
    </div>

    <div class="wave-play-controls">
      <button class="wave-btn" id="play-btn">
        Pause
      </button>

      <button class="wave-btn" id="reset-btn">
        Reset
      </button>
    </div>

    <div class="wave-note">
      Observe how the wave profile remains unchanged.
      Only its position changes with time.
    </div>
  `;

  /***************************************************************************
   * Create SVG
   ***************************************************************************/
  const svg = d3
    .select("#traveling-wave-svg")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("class", "wave-svg");

  const g = svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left},${margin.top})`,
    );

  /***************************************************************************
   * Scales
   ***************************************************************************/
  const xScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([-2.5, 2.5])
    .range([innerHeight, 0]);

  /***************************************************************************
   * Background grid
   ***************************************************************************/
  const xGrid = d3
    .axisBottom(xScale)
    .ticks(10)
    .tickSize(-innerHeight)
    .tickFormat("");

  const yGrid = d3
    .axisLeft(yScale)
    .ticks(6)
    .tickSize(-innerWidth)
    .tickFormat("");

  g.append("g")
    .attr("opacity", 0.08)
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xGrid);

  g.append("g").attr("opacity", 0.08).call(yGrid);

  /***************************************************************************
   * Axes
   ***************************************************************************/
  g.append("g")
    .attr("transform", `translate(0,${innerHeight / 2})`)
    .call(d3.axisBottom(xScale));

  g.append("g").attr("transform", `translate(0,0)`).call(d3.axisLeft(yScale));

  /***************************************************************************
   * Axis labels
   ***************************************************************************/
  g.append("text")
    .attr("x", innerWidth - 20)
    .attr("y", innerHeight / 2 - 10)
    .text("x");

  g.append("text").attr("x", 10).attr("y", 20).text("u(x,t)");

  /***************************************************************************
   * Wave line
   ***************************************************************************/
  const wavePath = g
    .append("path")
    .attr("fill", "none")
    .attr("stroke-width", 4)
    .attr("stroke", "#4f46e5")
    .attr("stroke-linecap", "round");

  /***************************************************************************
   * Wave calculation
   ***************************************************************************/
  function generateWaveData() {
    const points = [];

    for (let x = 0; x <= 10; x += 0.02) {
      const k = (2 * Math.PI) / wavelength;

      const y = amplitude * Math.sin(k * x - speed * time);

      points.push({
        x,
        y,
      });
    }

    return points;
  }

  /***************************************************************************
   * Draw wave
   ***************************************************************************/
  function drawWave() {
    const data = generateWaveData();

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveBasis);

    wavePath.datum(data).attr("d", line);
  }

  /***************************************************************************
   * Animation loop
   ***************************************************************************/
  function animate() {
    if (playing) {
      time += 0.03;
      drawWave();
    }

    requestAnimationFrame(animate);
  }

  /***************************************************************************
   * Slider logic
   ***************************************************************************/
  const ampSlider = document.getElementById("amp-slider");

  ampSlider.addEventListener("input", function () {
    amplitude = parseFloat(this.value);

    document.getElementById("amp-label").textContent =
      amplitude.toFixed(1);
  });

  const waveSlider = document.getElementById("wave-slider");

  waveSlider.addEventListener("input", function () {
    wavelength = parseFloat(this.value);

    document.getElementById("wave-label").textContent =
      wavelength.toFixed(1);
  });

  const speedSlider = document.getElementById("speed-slider");

  speedSlider.addEventListener("input", function () {
    speed = parseFloat(this.value);

    document.getElementById("speed-label").textContent =
      speed.toFixed(1);
  });

  /***************************************************************************
   * Play / Pause button
   ***************************************************************************/
  document.getElementById("play-btn").addEventListener("click", function () {
    playing = !playing;

    this.textContent = playing ? "Pause" : "Play";
  });

  /***************************************************************************
   * Reset button
   ***************************************************************************/
  document.getElementById("reset-btn").addEventListener("click", function () {
    time = 0;

    amplitude = 1;
    wavelength = 2;
    speed = 1;

    ampSlider.value = 1;
    waveSlider.value = 2;
    speedSlider.value = 1;

    document.getElementById("amp-label").textContent = "1.0";

    document.getElementById("wave-label").textContent = "2.0";

    document.getElementById("speed-label").textContent = "1.0";

    drawWave();
  });

  /***************************************************************************
   * Initial render
   ***************************************************************************/
  drawWave();
  animate();

  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([container.querySelector(".wave-equation")]);
  }
})();
