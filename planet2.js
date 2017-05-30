var container
var camera, scene
var group
var mouseX = 0, mouseY = 0

var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('mainCanvas'), antialias: true})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)
const windowW = window.innerWidth
const windowH= window.innerHeight

init()
animate()

function init() {
	container = document.getElementById( 'mainCanvas' )
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 )
	camera.position.z = 400
	scene = new THREE.Scene()
	group = new THREE.Group()
	scene.add( group )
  const light = new THREE.AmbientLight(0xffffff, .5)
  scene.add(light)
  const light1 = new THREE.PointLight(0xffffff, 2, 1000)
  light1.position.set( 300, 300, 300 )
  scene.add(light1)

	// earth
	let textureLoader = new THREE.TextureLoader()

  let geometry = new THREE.SphereGeometry( 150, 32, 32 )
  let material = new THREE.MeshPhongMaterial( {
		emissive: true,
    emissiveIntensity: 100,
    map: textureLoader.load('earth_atmos.jpg'),
    specularMap: textureLoader.load('specularmap.jpg'),
    bumpMap: textureLoader.load('earth_normal_2048.jpg'),
    bumpScale: 10
  })

	// clouds
  let geometry1 = new THREE.SphereGeometry( 153, 32, 32 )
  let material1 = new THREE.MeshPhongMaterial( {
    map: textureLoader.load('earth_clouds_2048.png'),
    emissive: true,
    emissiveIntensity: 10,
    side: THREE.DoubleSide,
    opacity: 0.8,
    transparent: true,
    depthWrite: false
  })

  let earth = new THREE.Mesh(geometry, material)
  let clouds = new THREE.Mesh(geometry1, material1)
  earth.add(clouds)
  group.add(earth)

}

function animate() {
	requestAnimationFrame( animate )
	render()
}

function render() {
	camera.position.x += ( mouseX - camera.position.x ) * 0.05
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05
	camera.lookAt( scene.position )
	group.rotation.y -= 0.003
	renderer.render( scene, camera )
}
