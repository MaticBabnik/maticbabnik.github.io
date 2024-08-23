<template>
    <canvas id="bg-canvas" ref="canvas" />
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import { mat4 } from 'gl-matrix';
import {
    err,
    GlArrayBuffer,
    LineGeometry,
    Program,
    buildGridData,
    lerp,
} from './gl';

const canvas = ref<HTMLCanvasElement | null>(null);

let mounted = false;
let geometry: LineGeometry[];
let gl: WebGL2RenderingContext;

useResizeObserver(
    canvas,
    ([
        {
            contentRect: { width, height },
        },
    ]) => {
        canvas.value!.width = width;
        canvas.value!.height = height;
    },
);

let z = 0;

function render() {
    const cam = mat4.create();
    mat4.perspective(
        cam,
        (75 * Math.PI) / 180,
        gl.canvas.width / gl.canvas.height,
        0.1,
        100.0,
    );
    // mat4.rotateX(cam, cam, 0.15);

    const targetZ = (window.scrollY / document.body.scrollHeight) * 50;
    mat4.translate(cam, cam, [0, 0, (z = lerp(z, targetZ, 0.1))]);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    geometry.forEach((x) => x.draw(gl, cam));

    mounted && requestAnimationFrame(render);
}

onMounted(() => {
    mounted = true;
    const p = new Program(
        /* glsl */ `
    precision lowp float;

    attribute vec4 position;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    varying float vDistance;

    void main(void) {
        vec4 mvPosition = projectionMatrix * modelViewMatrix * position;
        vDistance = mvPosition.z; // pass the distance to frag shader
        gl_Position = mvPosition;
    }
    `,
        /* glsl */ `
    precision lowp float;

    varying float vDistance;

    void main(void) {
        gl_FragColor = vec4(vec3(pow(vDistance / 15.0, 1.5)), 1.0); // fog
    }
    `,
    );

    function buildGeometry(gl: WebGL2RenderingContext) {
        function noise(x: number, y: number) {
            return Math.sin(x * y + x + y);
        }

        const roadBuf = new GlArrayBuffer(buildGridData(5, 50));
        const sideBuf = new GlArrayBuffer(
            buildGridData(10, 50, (x, y) => {
                return x / 10 + (x / 5) * (noise(x, y) / 3 + 0.1 + y / 50);
            }),
        );

        const roadMtx = mat4.create();
        mat4.fromTranslation(roadMtx, [-2.5, -3, 0]);
        mat4.rotateX(roadMtx, roadMtx, -Math.PI / 2);

        const sideMtx = mat4.create();
        mat4.fromTranslation(sideMtx, [2.5, -3, 0]);
        mat4.rotateX(sideMtx, sideMtx, -Math.PI / 2);

        const sideMtx2 = mat4.create();
        mat4.fromTranslation(sideMtx2, [-2.5, -3, 0]);
        mat4.rotateX(sideMtx2, sideMtx2, -Math.PI / 2);
        mat4.scale(sideMtx2, sideMtx2, [-1, 1, 1]);

        roadBuf.push(gl);
        sideBuf.push(gl);

        return [
            new LineGeometry(roadMtx, roadBuf, p, 2),
            new LineGeometry(sideMtx, sideBuf, p, 1),
            new LineGeometry(sideMtx2, sideBuf, p, 1),
        ];
    }

    const c = canvas.value!;
    c.width = c.clientWidth;
    c.height = c.clientHeight;

    gl = c.getContext('webgl2') ?? err('No WebGL');
    p.compile(gl);

    geometry = buildGeometry(gl);

    requestAnimationFrame(render);
});

onUnmounted(() => {
    mounted = false;
});
</script>

<style></style>
