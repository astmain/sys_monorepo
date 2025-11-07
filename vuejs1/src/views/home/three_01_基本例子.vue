<template>
  <input ref="ref_file_input" class="file_input" type="file" @change="get_input_file" accept=".stl,.obj" />

  <!-- <canvas id="canvas_three_parse" ref="ref_canvas" style="width: 1000px; height: 500px; border: 1px solid red; box-sizing: border-box" /> -->

  <div id="id_canvas"></div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"

// three.js
import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { ArcballControls } from "three/examples/jsm/Addons.js"

// 变量
let ref_canvas = ref()
let blobURL = ref("blob:http://127.0.0.1:8080/a12b3d6d-a8ba-4ea3-b240-ad746ba69294")

async function get_input_file(event: any) {
  const file = event.target.files[0]

  blobURL.value = URL.createObjectURL(file)

  // 绘制three解析
  const result = await three_view({ canvas: ref_canvas, blobURL: blobURL.value })
  console.log(`get_input_file---result:`, result)

  event.target.value = ""
  console.log("完成---get_input_file")
}

async function three_view({ canvas, blobURL }: { canvas: any; blobURL?: string }) {
  if (!blobURL) return ElMessage.error("没有-blobURL")
  console.log(`three_view---blobURL:`, blobURL)

  // 场景
  let scene = new THREE.Scene()

  // 相机-透视相机
  let camera = new THREE.PerspectiveCamera(45, 1000 / 500, 0.1, 1000)
  camera.position.z = 3
  camera.position.x = 2
  camera.position.y = 0
  camera.lookAt(0, 0, 0)

  scene.add(camera)

  // 物体
  let cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial())
  scene.add(cube)
  console.log(`111---cube:`, cube)

  // 渲染器
  let renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(1000, 500) //设置宽高
  document.getElementById("id_canvas")?.appendChild(renderer.domElement) //添加到dom上
  renderer.render(scene, camera) //渲染
  function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    cube.rotation.y += 0.01 //旋转
    renderer.render(scene, camera)
  }
  animate()
}
onMounted(() => {
  three_view({ canvas: ref_canvas, blobURL: blobURL.value })
})
</script>
