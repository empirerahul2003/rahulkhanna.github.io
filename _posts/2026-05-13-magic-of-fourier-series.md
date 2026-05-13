# Google × Distill Style Rewrite for Fourier Article

I rewrote the structure for a **Google-blog visual storytelling style** with **Distill-like interactive figures**.

Your current article is mathematically strong, but it reads like a textbook. The new structure removes long exposition and shifts to:

**idea → visual → insight → interaction**

Based on your uploaded draft fileciteturn0file0L1-L118, the dense sections should be replaced with the following flow.

```md
---
layout: distill
title: The magic of Fourier series
description: >
  How waves, interference, and harmonics combine to explain
  the mathematics of Fourier series.
tags: fourier-analysis signal-processing physics math
date: 2026-05-13
featured: true
giscus_comments: false
related_posts: false
---

# The magic of Fourier series

## How waves, interference, and harmonics explain complicated motion.

Suppose you pluck a guitar string.

Something strange happens.

A messy shape appears.
It vibrates.
It changes.

Yet beneath the complexity, nature is doing something surprisingly simple:

> every complicated vibration can be built from simpler waves.

This is the central idea behind Fourier series.

<div class="hero-note">
Move the sliders. Break the wave. Rebuild it.
The mathematics emerges visually.
</div>

<TravelingWaveFigure />

---

## A wave that travels

A traveling wave moves.

Its shape survives.
Only its position changes.

Instead of thinking:

> “the wave changes shape”

think:

> “the same shape is moving through space.”

<TravelingWaveFigure />

$$
u(x,t)=A\sin(kx-\omega t)$$

Try changing:

- amplitude
- wavelength
- oscillation speed

Notice what stays constant:

> the profile itself.

This idea seems simple.

But it sets up one of the deepest ideas in mathematical physics.

What happens when waves move in opposite directions?

---

## When motion freezes

Now fix both ends of the string.

Waves reflect.
They collide.

Something unexpected appears.

The pattern stops moving.

Instead:

> it oscillates in place.

Some points never move at all.

These are called **nodes**.

<StandingWaveFigure />

$$
u(x,t)=A\sin(kx)\cos(\omega t)$$

Notice something subtle.

The equation separates naturally:

- one part describes **shape in space**
- one part describes **motion in time**

That separation becomes enormously important later in physics.

But standing waves are not fundamental.

They emerge from something simpler.

---

## The hidden mechanism: interference

A standing wave looks mysterious.

Why should a wave stay frozen?

The answer is surprisingly beautiful.

Take:

- one wave moving right
- one wave moving left

Add them together.

<InterferenceFigure />

Suddenly the mystery disappears.

A standing wave is simply:

> interference.

$$
\sin(kx-\omega t)+\sin(kx+\omega t)
=
2\sin(kx)\cos(\omega t)
$$

Nodes appear because destructive interference permanently cancels motion at fixed points.

This is why:

- guitar strings resonate
- violin harmonics emerge
- resonant cavities work

But real vibrations are messy.

A plucked string does not look like a clean sine wave.

So how does nature describe arbitrary shapes?

---

## Fourier’s astonishing insight

Imagine plucking a string into an ugly shape.

Sharp edges.
Asymmetry.
Irregular motion.

Fourier’s radical proposal was:

> even complicated shapes can be written as sums of simple standing waves.

<FourierDecompositionFigure />

Each harmonic vibrates independently.

Together:

> they reconstruct complexity.

$$
f(x)=\sum_{n=1}^{\infty}
b_n\sin\left(\frac{n\pi x}{L}\right)
$$

This idea changed science.

Fourier discovered it while studying **heat flow**.

Today it powers:

- signal processing
- quantum mechanics
- MRI reconstruction
- acoustics
- numerical simulation
- AI spectral methods

---

## One final idea

Fourier analysis teaches us something profound.

Complicated motion is often only:

> simple motion layered together.

Once you begin seeing waves as combinations of frequencies,

complexity starts to feel composable.
```

The main change is:

**remove textbook-style paragraphs** and let the **coded figures carry the intuition**.
