const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('mainCanvas'), antialias: true})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)

// GEOMETRY
// let geometry = new THREE.SphereGeometry(0.5, 32, 32)
let loader = new THREE.TextureLoader()
// let material = new THREE.MeshPhongMaterial({
//   map: new THREE.TextureLoader().load('./earthmap.jpg')
//   // bumpMap: new THREE.TextureLoader().load('./earthbump1k.jpg'),
//   // bumpScale: 0.05
// })
loader.load('./earthmap.jpg', function ( texture ) {
  let geometry = new THREE.SphereGeometry(10, 32, 32)
  let material = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.5})
  let earthMesh = new THREE.Mesh(geometry, material)
  scene.add(earthMesh)
})
// let earth = new THREE.Mesh(geometry, material)
// 
// BACKDROP
// let geometry2 = new THREE.SphereGeometry(90, 32, 32)
// let material2  = new THREE.MeshBasicMaterial({
  // map: new THREE.TextureLoader().load('./Star_field.JPG'),
  // side: THREE.BackSide
// })
// let starMesh = new THREE.Mesh(geometry2, material2)
//
// scene.add(starMesh)


// LIGHTS
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

const light1 = new THREE.PointLight(0xffffff, 0.5)
light1.position.set( 50, 50, 50 )
scene.add(light1)


renderer.render(scene, camera)
