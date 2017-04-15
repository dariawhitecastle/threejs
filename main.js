//create scene and camera to add objects to
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
//renderer renders the scene, camera and objects
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


let geometry1 = new THREE.BoxGeometry(5,5,5)
let material1 = new THREE.MeshLambertMaterial({color: 0x00ff00})
let cube = new THREE.Mesh(geometry1, material1)
let geometry = new THREE.TorusKnotGeometry(15, 3, 100, 30)
let material = new THREE.MeshLambertMaterial({ color: 0x41EBC6 })
let pretzel = new THREE.Mesh(geometry, material)
scene.add(cube)
scene.add(pretzel)

light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
light3 = new THREE.PointLight(0xffffff, 0.5)
light3.position.set( 50, 50, 50 );
scene.add(light3)



camera.position.z = 50

function render() {
  requestAnimationFrame(render)

  cube.rotation.x += 0.05
  cube.rotation.y += 0.05
  pretzel.rotation.x += 0.01
  pretzel.rotation.y += 0.01
  renderer.render(scene, camera)


}
render()
