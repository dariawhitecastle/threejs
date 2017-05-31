var container
var camera, scene
var group, clouds, sun
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
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 6000 )
	camera.position.z = 2000
	scene = new THREE.Scene()
	// sun = new THREE.Group()
	// scene.add(sun)
	group = new THREE.Group()
	scene.add(group)
  const light = new THREE.AmbientLight(0xffffff, .5)
  scene.add(light)
  const light1 = new THREE.PointLight(0xffffff, 2, 2000)
  light1.position.set( 500, 500, 500 )
  scene.add(light1)

	let textureLoader = new THREE.TextureLoader()

	// earth
  let geometry = new THREE.SphereGeometry( 25, 32, 32 )
  let material = new THREE.MeshPhongMaterial( {
    map: textureLoader.load('earth_atmos.jpg'),
    specularMap: textureLoader.load('specularmap.jpg'),
    bumpMap: textureLoader.load('earth_normal_2048.jpg'),
    bumpScale: 10
  })

	// clouds
  let geometry1 = new THREE.SphereGeometry( 26, 32, 32 )
  let material1 = new THREE.MeshPhongMaterial( {
    map: textureLoader.load('earth_clouds_2048.png'),
    opacity: 0.8,
    transparent: true,
    depthWrite: false
  })

	// sun
	sun = THREEx.Planets.createSun()

	// planets and positions

	let earthPivot = new THREE.Object3D()
	sun.add( earthPivot )
  let earth = new THREE.Mesh(geometry, material)
	earth.position.x = 2000
	earthPivot.add( earth )

	let cloudsPivot = new THREE.Object3D()
	sun.add(cloudsPivot)
  clouds = new THREE.Mesh(geometry1, material1)
	clouds.position.x = 2000
	cloudsPivot.add(clouds)
	// earthPivot.rotation.y += 0.1

	// create sun group and add planets to it
  // sun.add(earth)
 group.add(sun)
}

function animate() {
	requestAnimationFrame( animate )
	render()
}

function render() {
	camera.position.x += ( mouseX - camera.position.x ) * 0.05
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05
	camera.lookAt( scene.position )
	sun.rotation.y -= 0.003
	// clouds.rotation.y -= 0.0009
	renderer.render( scene, camera )
}
