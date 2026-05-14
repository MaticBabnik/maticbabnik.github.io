---
title: WebGPU / gamedev
feature: 3
tech:
    - ts
    - webgpu
links:
    Favela: https://github.com/favelagame/favela
    tinrlike: https://github.com/MaticBabnik/tinrlike
images:
    - src: /img/mgla.webp
      desc: Post process fog
    - src: /img/ibl.webp
      desc: Image based lighting (cubemaps)
    - src: /img/lights.webp
      desc: Punctual lights
    - src: /img/normalmaps.webp
      desc: Normal maps
    - src: /img/overdraw.webp
      desc: Overdraw visualization (it's fine it's deferred)
    - src: /img/pcf.webp
      desc: PCF shadows
    - src: /img/ssao.webp
      desc: Screen space ambient occlusion
    - src: /img/toonf.webp
      desc: New Forward Toon RP
---

Game development targeting the new WebGPU API.

## Favela

Favela was a FPS game project for the computer graphics course made by me and two teammates. I handled most of the engine/rendering code, while the others worked on the game logic and content. The engine featured a deferred renderer with support for image-based lighting, normal maps, screen-space ambient occlusion, and more.

## Tinrlike

Tinrlike (temp name) is made for the TINR course, where I am the sole developer. It inherits the engine, but has a new render pipeline
focused on stylized toon shading and support for transparent objects.

## Honda

Honda is the name of the ECS based engine powering both projects. As of writing it has:

- ECS with systems for rendering, physics, sound, and more.
- Swappable GPU implementations (WebGPU and no-op for now)
- A mostly complete glTF loader with support for a few extensions
- Vue UI layer for menus and HUDs

## Honda/wg

The WebGPU gpu layer. The render pipeline implementation controls almost all of the WebGPU API usage. It's designed to be a thin wrapper over some WebGPU objects, providing auto-resizing viewports and typed GPU buffers.

### `def1` RP

The deferred rendering pipeline used in favela. It's a PBR implementation (GGX+Smith) and has the following features/effects:

- Normal maps
- Mesh skinning
- Image-based lighting (using cubemaps)
- Shadows with PCF filtering
- Screen-space ambient occlusion (SSAO)
- Bloom (hierarchical blur)
- AGX tonemapping

### `toonf` RP

The forward rendering pipeline used in tinrlike. It prioritizes a cartoonish look over physical correctness.

- Alpha blend transparency
- Mesh skinning
- Hard shadows
- Multisampling
- Bloom
- Vignete
- Chromatic aberration
- AGX tonemapping


## WebGL

I occasionally write some WebGL (like the background you're looking at).


