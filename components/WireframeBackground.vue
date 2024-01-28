<template>
    <canvas id="bg-canvas" ref="canvas" />
</template>

<script lang="ts" setup>
import {
    Color,
    Euler,
    FogExp2,
    InstancedMesh,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Quaternion,
    Scene,
    Vector3,
    WebGLRenderer,
} from 'three';

const canvas = ref<HTMLCanvasElement | null>(null);

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let mounted = false;

function resizeRenderer() {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}

function render() {
    if (resizeRenderer()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    camera.position.lerp(
        new Vector3(0, 0, -2 * (window.scrollY / window.innerHeight)),
        0.1,
    );
    renderer.render(scene, camera);

    mounted && requestAnimationFrame(render);
}

onMounted(() => {
    if (!canvas.value) {
        return;
    }
    mounted = true;

    renderer = new WebGLRenderer({
        antialias: true,
        canvas: canvas.value,
        powerPreference: 'low-power',
        depth: false, // fucks up the rendering a bit, but I fw it
        precision: 'lowp',
    });
    camera = new PerspectiveCamera(60, 2, 0.1, 3);
    camera.position.z = 2;

    scene = new Scene();
    scene.background = new Color(0xffffff);
    scene.fog = new FogExp2(0xffffff, 1);

    const wireframe = new MeshBasicMaterial({
        color: 0,
        wireframe: true,
        wireframeLinewidth: 2,
    });

    {
        const mountainGeometry = new PlaneGeometry(1, 10, 10, 100);
        const b = mountainGeometry.attributes.position.array;

        for (let i = 2; i < b.length; i += 3) {
            const x = b[i - 2];
            const xx = 1.2 * (x + 0.5);
            b[i] =
                -Math.max(xx ** 2 - 0.6 * xx ** 3, 0) +
                ((Math.random() - 0.7) / 5) * (x + 0.5); // make it look like a mountain
        }

        const mountains = new InstancedMesh(mountainGeometry, wireframe, 2);

        const matrix = new Matrix4(); // cyka matrix
        const position = new Vector3(1, -0.3, -3);
        const rotation = new Quaternion().setFromEuler(
            new Euler(Math.PI / 2, 0, 0),
        );
        const scale = new Vector3(1, 1, 1);

        mountains.setMatrixAt(0, matrix.compose(position, rotation, scale));
        position.x = scale.x = -1; // flip x
        mountains.setMatrixAt(1, matrix.compose(position, rotation, scale));
        scene.add(mountains);
    }

    {
        const roadGeometry = new PlaneGeometry(1, 10, 5, 50); // tbh I should instance this too
        const road = new Mesh(roadGeometry, wireframe);
        road.position.z -= 3;
        road.rotateX(Math.PI / 2);
        road.position.y = -0.3;
        scene.add(road);
    }

    render();
});

onUnmounted(() => {
    mounted = false;
    renderer?.dispose();
});
</script>

<style></style>
