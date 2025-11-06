import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { ArcballControls } from "three/examples/jsm/Addons.js"





async function make_process(process_num: number) {
  console.log(console.log(`make_process---blobURL_process---进度:`, process_num))
}


export async function canvas_three_parse({ canvas, file }: { canvas: any, file: any }) {

  make_process(1)
  const blobURL = URL.createObjectURL(file)
  make_process(10)


  const loader_stl = new STLLoader()
  make_process(11)
  loader_stl.load(blobURL, (geometry) => {
    let my_geometry = geometry//几何
    console.log(`canvas_three_parse---blobURL:`, blobURL)
    make_process(12)
    URL.revokeObjectURL(blobURL)//用来释放通过 URL.createObjectURL临时创建的所占用的内存,防止内存泄漏
    make_process(13)




    // 渲染器
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    const device_pixel_ratio = Math.min(window.devicePixelRatio || 1, 1)//设备刷新率
    const w = canvas.clientWidth//渲染器宽度
    const h = canvas.clientHeight //渲染器高度
    renderer.setPixelRatio(device_pixel_ratio)//以提升画质同时控制性能开销
    renderer.setSize(w, h, false)
    renderer.setClearColor(0x8f8aff)
    renderer.autoClear = false // 关闭自动清屏，改为手动控制清屏顺序

    // 🟩场景
    const scene = new THREE.Scene()

    // 🟩材质
    //color基底颜色(灰色) //metalness0.2：金属度，范围 0~1。0 接近非金属（塑料/陶瓷），1 接近金属。0.2 表示略带金属感 //roughness粗糙度，范围 0~1。0 非常光滑镜面反射，1 非常粗糙漫反射。0.7 比较哑光。
    const material_option = { color: 0x888888, metalness: 0.2, roughness: 0.7 }
    const material = new THREE.MeshStandardMaterial(material_option)

    // 🟩网格
    const mesh = new THREE.Mesh(my_geometry, material)
    scene.add(mesh)//场景-添加-网格

    // 🟩灯光
    const light_hemisphere = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5) // (半球光)天空色为白色，地面色为灰色，强度为0.6
    light_hemisphere.position.set(0, 1, 0)//     半球光-光源位置
    const light_ambient = new THREE.AmbientLight(0xffffff, 0.5)//    (环境光)白色光，强度为0.5
    const light_direct = new THREE.DirectionalLight(0xffffff, 0.8)// (方向光)白色光，强度为0.8
    light_direct.position.set(105, 105, 105)//   方向光-光源位置
    light_direct.castShadow = true //            方向光-启用阴影
    light_direct.shadow.bias = -0.0001 //        方向光-解决阴影条纹问题
    light_direct.shadow.mapSize.width = 2048
    light_direct.shadow.mapSize.height = 2048
    light_direct.shadow.camera.near = 0.5
    light_direct.shadow.camera.far = 50
    scene.add(light_ambient)//    场景-添加-环境光
    scene.add(light_direct)//     场景-添加-方向光
    scene.add(light_hemisphere)// 场景-添加-半球光

    // 🟩盒子,居中并获取尺寸
    my_geometry.computeBoundingBox()
    const box = my_geometry.boundingBox!
    const size = new THREE.Vector3()//尺寸
    box.getSize(size)
    const center = new THREE.Vector3()//中心点
    box.getCenter(center)
    mesh.position.sub(center) // 网格-位置-减去-中心点
    const size_max = Math.max(size.x, size.y, size.z) || 1

    // 🟩相机-根据画布比例自适配-目前正交角度
    const aspect = w / h
    const half_h = size_max * 0.8
    const half_w = half_h * aspect
    const camera = new THREE.OrthographicCamera(-half_w, half_w, half_h, -half_h, 0.1, size_max * 10)
    camera.position.set(size_max * 2, size_max * 2, size_max * 2)
    camera.lookAt(0, 0, 0)



    // 🟩控制器controls_orbit
    // let controls_orbit = new OrbitControls(camera, renderer.domElement)
    // controls_orbit.enableDamping = true////动画阻尼
    // controls_orbit.dampingFactor = 0.2



    // 🟩控制器controls_arcball(托球式)
    let controls_arcball = new ArcballControls(camera, renderer.domElement, scene)
    controls_arcball.enableAnimations = false//动画阻尼
    controls_arcball.dampingFactor = 0.01
    controls_arcball.setGizmosVisible(false)

    make_process(14)
    // // 🟩坐标辅助
    // const axes_helper = new THREE.AxesHelper(100)
    // scene.add(axes_helper)

    // 我希望如何左下角 显示一个坐标盒子
    // 🟩左下角-坐标盒子小视口（裁剪+第二场景）
    const axes_scene = new THREE.Scene()
    const box_geo = new THREE.BoxGeometry(2, 2, 2)
    const box_mats = [
      new THREE.MeshBasicMaterial({ color: 0xff5555 }),
      new THREE.MeshBasicMaterial({ color: 0x993333 }),
      new THREE.MeshBasicMaterial({ color: 0x55ff55 }),
      new THREE.MeshBasicMaterial({ color: 0x339933 }),
      new THREE.MeshBasicMaterial({ color: 0x5555ff }),
      new THREE.MeshBasicMaterial({ color: 0x333399 })
    ]
    // 小视口内的材质禁用深度测试/写入，避免被主场景深度影响
    box_mats.forEach((mat) => {
      mat.depthTest = false
      mat.depthWrite = false
    })
    const axes_box = new THREE.Mesh(box_geo, box_mats)
    axes_box.renderOrder = 999
    axes_scene.add(axes_box)
    const axes_helper_small = new THREE.AxesHelper(2.2)
      ; (axes_helper_small.material as THREE.Material).depthTest = false
      ; (axes_helper_small.material as THREE.Material).depthWrite = false
    axes_helper_small.renderOrder = 999
    axes_scene.add(axes_helper_small)
    const axes_camera = new THREE.PerspectiveCamera(50, 1, 0.01, 10)
    axes_camera.position.set(0, 0, 3)
    axes_camera.lookAt(0, 0, 0)
    const mini_scale = 0.22 // 小视口相对画布的比例
    const mini_size = Math.round(Math.min(w, h) * mini_scale)
    const mini_margin = 10
    make_process(15)
    // 🟩渲染循环
    function animate() {
      requestAnimationFrame(animate)
      // controls_orbit.update()
      controls_arcball?.update()
      // 主场景渲染
      renderer.setScissorTest(true)
      renderer.setViewport(0, 0, w, h)
      renderer.setScissor(0, 0, w, h)
      renderer.clear(true, true, true) // 主场景：清颜色/深度/模板
      renderer.render(scene, camera)
      // 小视口渲染（左下角）
      axes_camera.quaternion.copy(camera.quaternion)
      const mini_x = mini_margin + 20
      const mini_y = mini_margin + 20
      renderer.setViewport(mini_x, mini_y, mini_size, mini_size)
      renderer.setScissor(mini_x, mini_y, mini_size, mini_size)
      renderer.clearDepth() // 小视口：仅清理深度，颜色保持背景色一致
      // renderer.clearStencil() // 如使用了模板缓冲，可解注释
      renderer.render(axes_scene, axes_camera) // 不更改清屏颜色，避免出现白色底框
      renderer.setScissorTest(false)
    }
    animate()

    make_process(100)
  })
}