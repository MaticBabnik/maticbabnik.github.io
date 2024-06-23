---
title: MUHI implementations
tech:
    - cpp
    - js
links:
    'JS repository': https://github.com/MaticBabnik/1b.js
    'C++ repository': https://github.com/MaticBabnik/lastBit
images:
    - desc: Rule 101 output @ 30 MiB/s
      src: /img/lastbit-pv.avif
---

[MUHI](https://ass.si/MUHI.html) is an experimental 1bit architecture designed by Adrian Siska.

My adventures with MUHI started when I [forked](https://github.com/MaticBabnik/1bitvm.c-simd/tree/master)
when I forked an existing C implementation and doubled its speed using SIMD intrinsics, making it the fastest for a short period.

Later I implemented a Javascript version just to spite the author 🙃.

Both the author and I theorized that performance could be improved by caching entire blocks of instructions and their output.
This optimization allowed the JavaScript version to achieve performance parity with early C implementations.
Rewriting it in C++ resulted in the current fastest implementation (as of 23. 06. 2024), running approximately 30 times
faster than JavaScript and about 5 times faster than other low-level implementations.
