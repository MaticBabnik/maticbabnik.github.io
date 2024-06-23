---
title: remimo
tech:
    - js
    - ts
links:
    Repository: https://github.com/MaticBabnik/remimo
images:
    - desc: Logisim evolution screenshot
      src: /img/remimo.avif
---

Toy architecture based on Warren Toomey's hardwired CPU.

It's a 16-bit architecutre with 4 registers (r0-r3) and 64k words addres space.
It support both signed and unsigned arithmetic (add,sub,or,and) and has 4 flags (Carry, Negative, oVerflow, Zero)
for conditional branching.

## Implementations

It currently has two implementations:

-   remimo - made in Logisim Evolution
-   rem - written in TypeScript

## MIA - MImo Assembler

I also wrote an assembler for it. It's syntax looks like this:

```mia [badapple.mia]
$FB_BASE 0x4000
.at 0
    mov r1, BAD_APPLE
LOOP1:
    mov r2, 12
    mov r0, FB_BASE
    add r0, 11
LOOP2:
    ldr   r3, r1
    str   r3, r0
    add   r1, 1
    sub   r0, 1
    sub.s r2, 1
    b.ne LOOP2

    b LOOP1

A: b A

.at 128
BAD_APPLE:
.bin_include "./ba.bin"
```
