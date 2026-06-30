---
layout: distill
title: FTQC complier co-design
description: >
  Fault-Tolerant Compiling of Classically Hard Instantaneous Quantum
  Polynomial Circuits on Hypercubes
tags: IQP quantum architecrure physics math
date: 2026-05-13
featured: true
giscus_comments: false
related_posts: false
distill_wave_viz: true
---


Quantum computers promise something extraordinary. For certain problems, they may eventually outperform even the best classical supercomputers. At first sight, this sounds simple:

**build more qubits.**

The real challenge, however, is not the number of qubits. It is **noise**.

Quantum systems are fragile. Imperfect gates, unwanted interactions, and decoherence slowly destroy computation. In an ideal world, a quantum state evolves as

$$
|\psi\rangle \rightarrow U|\psi\rangle
$$

where $U$ represents the intended evolution. Reality is less forgiving:

$$
|\psi\rangle \rightarrow \mathcal{E}(U|\psi\rangle),
$$

where $\mathcal{E}$ represents unwanted noise.

Small imperfections accumulate quickly as circuits become deeper. Current quantum processors typically operate near error rates of $10^{-3}$, roughly one faulty operation in every thousand. By contrast, scalable fault-tolerant quantum computing may require effective error rates closer to $10^{-10}$. The gap is enormous:

$$
\frac{10^{-3}}{10^{-10}} = 10^7.
$$

In other words, we are still millions of times away from large-scale fault-tolerant quantum computing.

This raises a natural question: if universal fault-tolerant quantum computing remains so difficult, can meaningful quantum advantage still be achieved before reaching that stage?

This question lies at the heart of recent work by Dominik Hangleiter and collaborators. Instead of pursuing arbitrary quantum computation, the paper asks a different question:

**What kinds of computationally hard quantum tasks naturally survive realistic hardware constraints?**

The answer combines restricted quantum circuits, fault-tolerant codes, hypercube geometries, and reconfigurable neutral-atom hardware into a surprisingly coherent framework. Before seeing why this approach works, we first need to understand why fault-tolerant quantum computing is considered so expensive.


# Why Universal Fault-Tolerant Quantum Computing Is So Expensive

If noise is the central problem, an obvious solution immediately appears.

 Why not simply correct the errors?

This idea lies behind **quantum error correction (QEC)**, one of the most important ideas in modern quantum computing. The central goal is simple: instead of storing information inside one fragile physical qubit, distribute it across many qubits so that errors can be detected and corrected.

Ordinary quantum information is stored directly in physical states:

$$
|0\rangle,
\qquad
|1\rangle.
$$

Fault-tolerant quantum computing works differently. Information is encoded into **logical qubits**:

$$
|0\rangle
\rightarrow
|0_L\rangle,
\qquad
|1\rangle
\rightarrow
|1_L\rangle.
$$

The subscript $L$ stands for *logical*.

This seemingly small change transforms how information is stored. A logical qubit no longer belongs to a single atom or circuit element. Instead, information becomes distributed collectively across many physical qubits. This spreading provides protection.

If one physical qubit suffers an error, information is not immediately lost because it is encoded globally rather than locally.
At first sight, this sounds ideal. Unfortunately, there is a price. Quantum error correction is expensive. Very expensive.
A useful logical qubit may require hundreds or thousands of physical qubits, depending on error rates and computational requirements. In practice, this means that a machine with

$$
100
$$

logical qubits might eventually require something closer to

$$
100,000
$$

or more physical qubits.

The challenge becomes even harder when we consider quantum gates.
Some operations are relatively easy to implement fault tolerantly. Others are not.
This is one of the reasons universal quantum computation becomes expensive.

Certain operations needed for universal quantum algorithms introduce enormous overhead, increasing both hardware requirements and circuit depth. More gates mean more opportunities for noise, which pushes error correction requirements even further.

The road toward universal fault-tolerant quantum computing therefore becomes extraordinarily costly.
This naturally raises another question.

Do we really need a fully universal quantum computer to demonstrate quantum advantage?

Or could a more restricted form of quantum computation already outperform classical machines while remaining dramatically cheaper to implement?

This question leads directly to one of the central ideas of the paper.
Instead of pursuing the most powerful possible quantum computer, what if we searched for the *simplest kind of quantum computation that still remains classically hard*?


# A Surprising Shortcut: IQP Circuits

At this point, quantum computing seems trapped in a difficult situation.

On one hand, quantum advantage appears exciting. Certain quantum systems may eventually outperform classical computers on problems that seem computationally impossible to solve efficiently.

On the other hand, fully universal fault-tolerant quantum computing remains enormously expensive. The cost of quantum error correction, together with the overhead required for complex operations, makes the road toward scalable quantum computing extremely long.

This naturally raises an important question.

Do we really need a fully universal quantum computer in order to achieve quantum advantage?

Surprisingly, the answer may be:

 No.

This is one of the central conceptual ideas behind the paper.

Instead of building the most powerful possible quantum computer, one may instead search for a restricted type of quantum computation that remains difficult for classical computers to simulate.
{% include figure.liquid
  path="assets/img/ftqccompiler/fig 1 a.jpg"
  title="Figure 1(a)"
  caption="Figure 1(a). Overview of the fault-tolerant architecture proposed by Hangleiter et al. Logical operations are implemented through transversal gates and atom rearrangements on neutral-atom hardware."
  class="img-fluid rounded z-depth-1"
  zoomable=true %}
This is where **IQP circuits** enter the story.

IQP stands for:

$$
\text{Instantaneous Quantum Polynomial}
$$

The name sounds intimidating, but the basic idea is surprisingly simple.

Ordinary quantum circuits consist of gates applied sequentially:

$$
U_1
\rightarrow
U_2
\rightarrow
U_3
\rightarrow
\cdots
$$

In general, order matters. Two quantum operations usually do not commute:

$$
U_1U_2
\neq
U_2U_1.
$$

IQP circuits behave differently.

Their gates commute:

$$
U_iU_j
=
U_jU_i.
$$

Equivalently,

$$
[U_i,U_j]
=
0.
$$

This means the order of operations no longer matters. In a sense, the computation can be viewed as happening “all at once,” which explains the word *instantaneous*.
At first sight, this may sound disappointing. If everything commutes, should simulation not become easy? Surprisingly, the answer appears to be no.
Even though IQP circuits are highly restricted, they still generate probability distributions that seem difficult for classical computers to reproduce.

To understand why, it helps to distinguish between two very different computational tasks.

A **decision problem** asks for a specific answer. For example:

 Is this number prime? The output is ultimately:  yes or no.

Quantum sampling works differently.

A quantum circuit prepares a state

$$
|\psi\rangle
=
\sum_x
\alpha_x |x\rangle,
$$

and measurement produces outcomes with probabilities

$$
P(x)
=
|\langle x|\psi\rangle|^2.
$$

The task is no longer to compute one correct answer.

Instead, the challenge becomes

$$
x \sim P(x),
$$

meaning:

**sample correctly from the probability distribution generated by the circuit.**

This distinction is subtle but important.

Imagine rolling a fair die. There is no single correct outcome. Instead, correctness means reproducing the expected probabilities:

$$
P(1)
=
P(2)
=
\cdots
=
P(6)
=
\frac16.
$$

Quantum sampling works similarly. A quantum processor repeatedly generates bitstrings, and the goal is to reproduce the correct distribution.

Even though IQP gates commute, the resulting probability landscape can become highly structured due to quantum interference. Some outcomes become enhanced, while others are strongly suppressed.

Simple-looking gates can therefore still generate surprisingly complicated behavior.

This is precisely why IQP circuits became attractive candidates for quantum advantage.

They are restricted enough to be experimentally realistic, yet still appear difficult for classical computers to simulate.

{% include figure.liquid
  path="assets/img/ftqccompiler/fig 3 a.jpg"
  title="Figure 3(a)"
  caption="Figure 3(a). Example of a hypercube IQP (hIQP) circuit. Logical in-block operations combine with transversal interblock interactions to realize fault-tolerant sampling circuits."
  class="img-fluid rounded z-depth-1"
  zoomable=true %}

For the authors of this paper, IQP circuits represent an attractive middle ground.

Instead of pursuing fully universal quantum computation, the question becomes:

**Can we design a restricted quantum computation that remains classically hard, while also fitting naturally into realistic fault-tolerant hardware?**

As we will soon see, this question leads to one of the most elegant ideas in the paper:

designing the algorithm, the code, and the hardware together from the start.


# Fault-Tolerant Compiling: A Different Way to Think About Quantum Computing

At this point, the strategy behind the paper begins to take shape. IQP circuits appear attractive because they occupy a useful middle ground. They are far more structured than fully universal quantum computation, yet still appear difficult for classical computers to simulate. However, an important challenge remains: even restricted quantum circuits must still survive noise. This raises the central question of the paper:

**How can computationally hard quantum circuits be realized without paying the enormous cost of universal fault tolerance?**

The traditional approach to quantum computing usually follows a simple logic. First, design an abstract quantum algorithm. Then, attempt to force real hardware to implement it. In practice, this often becomes painful. Real quantum processors have limited connectivity, certain operations are expensive, and quantum error correction introduces substantial overhead. Elegant theoretical circuits and realistic hardware often end up speaking very different languages.

The central idea of this paper is surprisingly different. Instead of treating the algorithm, hardware, and error correction separately, the authors design them together from the start. They call this idea **fault-tolerant compiling**. Rather than asking how hardware can imitate arbitrary computation, the paper asks a more practical question:

**What kinds of computationally hard quantum circuits naturally fit realistic hardware?**

The answer combines three ingredients that work unusually well together: **IQP circuits**, which remain classically hard despite their restricted structure; **hypercube quantum codes**, chosen because they naturally support the required operations; and **neutral atom hardware**, where atoms can physically move and interactions become reconfigurable.

What makes the proposal elegant is not any one ingredient alone, but how they fit together. The structure of the computation matches the structure of the code, and the code naturally fits the geometry of the hardware. Instead of forcing hardware to imitate idealized computation, the proposal turns hardware constraints into design principles:

$$
\text{the computation fits the architecture}
$$

This shift in perspective becomes one of the deepest ideas in the paper.

One unusual choice immediately stands out.

Why a hypercube?


# Why a Hypercube? The Geometry Behind the Code

At first sight, the choice of a hypercube may seem strangely specific. Why a hypercube? Why not a square grid, a chain, or simply connect every qubit to every other qubit? To understand this choice, we first need to appreciate an uncomfortable fact about real quantum hardware: **connectivity matters**.

In idealized quantum circuits, any qubit can interact with any other qubit whenever needed. Reality is far less generous. Most quantum processors only allow local interactions, meaning distant qubits cannot directly communicate. If two far-away qubits must interact, information often has to move indirectly through intermediate qubits. This quickly becomes expensive because every additional operation introduces more opportunities for noise, and deeper circuits accumulate errors more rapidly. Fault-tolerant quantum computing therefore faces a difficult tradeoff: sparse connectivity is easier to build but slows communication, while dense connectivity enables fast communication but becomes physically unrealistic.

The hypercube turns out to sit in a useful middle ground. A $D$-dimensional hypercube contains

$$
N = 2^D
$$

vertices, with each vertex connected to exactly $D$ neighbors. At first sight, this may not seem particularly remarkable. The important feature appears when we ask how quickly information can move across the system. Surprisingly, communication distances scale only as

$$
\sim \log N.
$$

This makes the geometry unusually efficient. Instead of information spreading slowly across long chains of local interactions, the hypercube allows information to move rapidly while still maintaining realistic connectivity. In practice, this means complex interactions can emerge without requiring physically unrealistic all-to-all communication.

{% include figure.liquid
  path="assets/img/ftqccompiler/fig 1 d.png"
  title="Figure 1(d)"
  caption="Figure 1(d). Visualization of the $[[8,3,2]]$ hypercube code represented geometrically as a cube. Adapted from Hangleiter et al. (2025)."
  class="img-fluid rounded z-depth-1"
  zoomable=true %}

The geometry becomes even more interesting once combined with quantum error correction. The paper studies a family of quantum codes written as

$$
[[2^D, D, 2]].
$$

The notation is simpler than it first appears. The first number, $2^D$, represents the number of physical qubits. The second number, $D$, represents the number of logical qubits encoded. The final number, $2$, represents the code distance, meaning the code can detect errors.

For example,

$$
[[8,3,2]]
$$

naturally corresponds to a cube because

$$
2^3 = 8.
$$

Eight physical qubits arranged at the vertices of a cube encode three logical qubits. At this point, something elegant begins to happen. The geometry of the computation starts aligning with the geometry of the code itself. IQP circuits naturally involve degree-$D$ interactions, the hypercube naturally provides $D$ connections per node, and the code naturally supports the required operations. For perhaps the first time in the story, the algorithm, the code, and the hardware begin speaking the same language.

This alignment turns out to be one of the key ideas behind the proposal. However, one important challenge still remains: even with elegant geometry, quantum errors can spread, and spreading errors are dangerous.

# Keeping Errors Under Control: Transversal Gates

Even elegant geometry does not solve everything.

Quantum errors spread, and in fault-tolerant quantum computing, spreading errors are dangerous.

Suppose one physical qubit experiences an unwanted error. Ideally, the mistake should remain local and manageable. Unfortunately, ordinary quantum gates often behave badly. A single faulty qubit can infect many others through entangling operations, turning one small error into a much larger problem. What begins as a local imperfection may quickly propagate through the system, overwhelming the ability of an error-correcting code to protect information.

This raises a natural question:

**Can useful quantum gates be implemented without allowing errors to spread uncontrollably?**

The paper relies on an elegant idea known as **transversal logic**. Rather than mixing many physical qubits together in a complicated way, a transversal operation acts locally across encoded blocks. Mathematically, a logical operation takes the form

$$
U
=
U_1
\otimes
U_2
\otimes
U_3
\otimes
\cdots
$$

meaning each part of the operation acts independently on corresponding physical qubits.

At first sight, this may seem like a technical detail. In practice, however, it becomes one of the central ingredients of fault tolerance.

The reason is simple:

**locality protects the code.**

Instead of one error spreading catastrophically through the processor, transversal operations help keep errors contained. Schematically, the difference looks something like this.

Ordinary operation:

$$
1 \rightarrow 100
$$

Transversal operation:

$$
1 \rightarrow 1
$$

The picture is intentionally simplified, but the basic intuition is important. A local error remains local. Since quantum error-correcting codes are designed to tolerate a limited number of local errors, preventing uncontrolled propagation becomes essential.

<div class="row justify-content-sm-center">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/ftqccompiler/fig 2 e.png"
      title="Figure 2(e)"
      caption="Figure 2(e). Example of a transversal logical operation where interactions remain localized across encoded qubits. Adapted from Hangleiter et al. (2025)."
      class="img-fluid rounded z-depth-1"
      zoomable=true %}
  </div>
</div>

This is one of the reasons the hypercube code becomes attractive in the first place. The restricted operations needed for IQP circuits naturally fit the transversal and permutation gate structure supported by the code. Instead of fighting against fault tolerance, the computation becomes aligned with it.

At this point, however, one practical problem still remains.

Even if operations are fault tolerant, qubits still need to interact efficiently. In realistic hardware, distant interactions often become expensive.

The authors solve this problem in a surprisingly physical way:

**Instead of moving information,**
**they move the atoms themselves.**

# Moving Atoms Instead of Fighting Hardware

At this point, the paper has assembled several ideas that fit together naturally. IQP circuits provide a restricted but classically hard computational model, hypercube codes support fault-tolerant operations, and transversal gates help keep errors local. Yet one practical challenge still remains:

**How can distant qubits interact efficiently?**

In many quantum architectures, this quickly becomes expensive. If two far-away qubits must interact, information often travels indirectly through intermediate qubits, increasing circuit depth and noise. More operations mean more opportunities for errors, which is precisely the problem fault tolerance is trying to control.

The authors take a surprisingly different approach. Instead of moving information through the processor, they exploit a unique feature of **neutral atom hardware**:

**atoms can physically move.**

Rather than forcing distant qubits to communicate indirectly, the processor rearranges atoms so that desired interactions become local. In effect, geometry itself becomes programmable.

<div class="row justify-content-sm-center">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/ftqccompiler/fig 2 c.jpg"
      title="Figure 2(c)"
      caption="Figure 2(c). Permutation operations implemented through atom rearrangement. Adapted from Hangleiter et al. (2025)."
      class="img-fluid rounded z-depth-1"
      zoomable=true %}
  </div>
</div>

This idea appears through **permutations**, which simply rearrange positions. For example,

$$
(1,2,3,4)
\rightarrow
(4,2,1,3).
$$

The key idea is straightforward. Instead of inventing entirely new fault-tolerant operations for every required interaction, the architecture repeatedly reuses the same native operations while rearranging atoms whenever necessary. A desired interaction is created simply by bringing the relevant atoms close together, applying the available fault-tolerant operation, and then rearranging the geometry again if needed.

This flexibility turns out to be surprisingly powerful. By combining atom rearrangement with native transversal operations, the architecture can realize arbitrary degree-$D$ IQP circuits while remaining compatible with fault tolerance. Rather than forcing hardware to imitate abstract mathematical circuits, the computation adapts itself to the natural strengths of the hardware.

At this point, however, an important question naturally appears: if the geometry, operations, and hardware are all carefully engineered to work together, does the resulting computation remain genuinely hard for classical computers to simulate?


# Does Fault Tolerance Destroy Quantum Advantage?

At this point, the proposal may begin to sound almost too good to be true. The circuits are highly structured, the geometry is carefully chosen, and even the quantum error-correcting code has been designed to match the architecture. This raises an important concern:

**Has the computation become *too structured*?**

Quantum computing has taught an important lesson: not every quantum circuit is difficult for classical computers to simulate. Some surprisingly complicated circuits still turn out to be classically manageable. The challenge is therefore subtle. IQP circuits were already believed to be hard to simulate, but after introducing fault-tolerant encoding, hypercube geometry, transversal operations, and atom rearrangements, one might naturally wonder whether the problem has accidentally become easier.

To understand the concern, it helps to recall what the computational task actually is. The goal is not to compute one exact probability or produce a single correct answer. Instead, the challenge is to sample from the probability distribution generated by the quantum circuit. A quantum state takes the form

$$
|\psi\rangle
=
\sum_x
\alpha_x |x\rangle,
$$

and measurement produces outcomes with probabilities

$$
P(x)
=
|\langle x|\psi\rangle|^2.
$$

The task is therefore:

$$
x \sim P(x),
$$

meaning the classical computer must reproduce the same distribution of outcomes.

This turns out to be surprisingly difficult. Even relatively shallow IQP circuits can generate highly structured probability landscapes because of quantum interference. Some bitstrings appear frequently, while others become strongly suppressed. Reproducing this entire probability distribution classically may require tracking exponentially many interfering contributions.

The important question of the paper is therefore not whether IQP circuits are hard in isolation, but whether **hypercube IQP (hIQP)** circuits remain hard *after* fault-tolerant compilation.

The authors provide strong evidence that the answer is yes. Even after introducing fault-tolerant encoding, hypercube geometry, transversal gates, and permutation operations, the resulting sampling problem still appears computationally difficult for classical computers, even at relatively low circuit depths.

{% include figure.liquid
  path="assets/img/ftqccompiler/fig 6.png"
  title="Figure 6"
  caption="Figure 6. Evidence that hIQP circuits retain computational complexity even after fault-tolerant compilation. Adapted from Hangleiter et al. (2025)."
  class="img-fluid rounded z-depth-1"
  zoomable=true %}

This balance becomes one of the deepest achievements of the proposal. The circuits become easier for realistic hardware to implement without becoming easy for classical computers to imitate. In some sense, the paper is trying to balance two competing goals:

$$
\text{hardware efficiency}
\qquad
\text{vs}
\qquad
\text{computational hardness}.
$$

Too much structure risks simplifying the problem. Too little structure makes the experiment unrealistic. The success of the proposal lies in finding a middle ground where both survive.

The next challenge, however, is equally important.

How can one actually study whether these circuits are generating sufficiently complex quantum behavior?

Surprisingly, the answer involves an unexpected connection to **statistical mechanics**.


# From Quantum Circuits to Statistical Mechanics

One of the more interesting technical contributions of the paper appears through an unexpected connection:

**statistical mechanics.**

At first sight, IQP circuits may seem difficult to analyze directly. Even though their gates commute, the probability distributions they generate quickly become complicated. For a system with many qubits, the number of possible measurement outcomes grows exponentially, making direct analysis increasingly difficult.

Instead of studying every probability individually, the authors focus on **statistical properties** of the output distribution. In particular, they develop a theory of **second moments** for degree-$D$ IQP circuits. Roughly speaking, second moments describe how probabilities fluctuate across different measurement outcomes.

To understand the intuition, imagine two extreme situations. If every outcome appeared with roughly equal probability, the distribution would look relatively featureless:

$$
P(x)
\sim
\frac{1}{2^n}.
$$

Quantum interference changes this picture. Some outcomes become enhanced while others are strongly suppressed, producing a much more structured probability landscape:

$$
P(x)
\not\sim
\frac{1}{2^n}.
$$

The important question becomes:

**How structured is this probability distribution?**

Rather than studying each measurement outcome independently, the paper analyzes collective statistical behavior. Remarkably, these second-moment properties can be mapped onto a **statistical mechanics model**. This provides a way to study scrambling, complexity, and hardness using ideas that may feel familiar to many-body physics.

One particularly important concept here is **scrambling**, which describes how quickly information spreads through a quantum system. The hypercube geometry plays an important role because communication distances scale only as

$$
\sim \log N.
$$

As a result, information spreads efficiently, allowing even relatively shallow circuits to generate complicated interference patterns.

This matters for a practical reason.

Deep circuits accumulate noise.

Shallow circuits are experimentally realistic.

The challenge is therefore to create computationally hard quantum behavior *before noise dominates the computation*.

The statistical mechanics framework provides evidence that hypercube IQP circuits achieve precisely this balance. Even at relatively low circuit depth, the resulting probability distributions appear sufficiently structured to remain difficult for classical computers to reproduce.

The paper also studies **Bell sampling** for degree-4 IQP circuits and argues that this restricted setting remains classically intractable while still allowing efficient validation. This becomes important for scalability because it suggests that fault-tolerant quantum sampling may remain both computationally interesting and experimentally testable.

At this point, one final challenge remains.

If these circuits are genuinely hard to simulate classically, how can we verify that a quantum device is actually performing the intended computation?


# Verification and Scalability

Demonstrating quantum advantage is only part of the challenge.

An equally important question remains:

**How do we verify that a quantum device is actually performing the intended computation?**

This becomes difficult because once a quantum circuit is hard to simulate classically, direct verification also becomes hard. One cannot simply calculate the correct answer and compare outputs.

To study this problem, the paper analyzes **linear cross-entropy benchmarking (XEB)**, a method used to compare experimentally generated samples with the ideal quantum probability distribution. Interestingly, the authors find that the relationship between **XEB** and **average fidelity** depends strongly on the local noise rate. In some regimes, XEB closely tracks fidelity, while in others the relationship becomes more subtle.

The paper also looks beyond small demonstrations. The hypercube codes discussed earlier mainly detect errors, so the authors introduce larger **color-code families** of the form

$$
[[O(dD), D, d]],
$$

where increasing the distance $d$ improves error suppression while preserving transversal IQP sampling.

The important point is that the proposal is not merely a proof-of-principle experiment. It sketches a path toward scalable fault-tolerant quantum sampling where computational hardness and experimental realism continue to coexist.

Stepping back, the broader goal of the paper becomes clear: not simply protecting quantum systems from noise, but identifying computationally hard tasks that can realistically survive fault tolerance.


# Conclusion

The road toward useful quantum computing is often framed as a race toward universality: more qubits, lower error rates, and increasingly general algorithms. This paper suggests a somewhat different perspective.

Instead of forcing arbitrary computations onto imperfect hardware, the authors ask a more practical question:

**What kinds of computationally hard quantum tasks naturally fit realistic architectures?**

The answer explored here combines **IQP circuits**, **hypercube quantum codes**, and **reconfigurable neutral atom hardware** into a surprisingly coherent framework. The result is not a universal quantum computer, nor does it attempt to be. Instead, it represents something perhaps equally valuable: a realistic route toward **fault-tolerant quantum advantage**.

One of the most interesting lessons of the paper is that fault tolerance does not necessarily have to come at the cost of computational usefulness. By carefully co-designing the algorithm, the code, and the hardware, the proposal manages to preserve both experimental realism and classical hardness.

More broadly, the work hints at an important shift in thinking. The future of scalable quantum computing may depend not only on better hardware or stronger error correction, but also on learning how to design computations that naturally align with the strengths of physical devices.

In that sense, the deepest contribution of this work may not simply be a new sampling architecture.

It may be a new way of thinking about quantum computation itself.

---
## References

1. Hangleiter, D., et al. *Fault-Tolerant Compiling of Classically Hard Instantaneous Quantum Polynomial Circuits on Hypercubes*. **PRX Quantum** **6**, 020338 (2025).

   DOI: https://doi.org/10.1103/PRXQuantum.6.020338
