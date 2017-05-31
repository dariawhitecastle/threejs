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
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 )
	camera.position.set( 0, 200, 7000 )
	scene = new THREE.Scene()

	group = new THREE.Group()
	scene.add(group)
  const light1 = new THREE.AmbientLight(0xffffff, .7)
  scene.add(light1)

	let light	= new THREE.DirectionalLight(0xffffff, .8)
	light.position.set(5,5,5)
	scene.add( light )
	light.castShadow	= true
	light.shadowCameraNear	= 0.01
	light.shadowCameraFar	= 15
	light.shadowCameraFov	= 45
	light.shadowCameraLeft	= -1
	light.shadowCameraRight	=  1
	light.shadowCameraTop	=  1
	light.shadowCameraBottom= -1
	// light.shadowCameraVisible	= true
	light.shadowBias	= 0.001
	light.shadowDarkness	= 0.2
	light.shadowMapWidth	= 1024
	light.shadowMapHeight	= 1024


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

	//MERCURY
	let mercuryPivot = new THREE.Object3D()
	sun.add(mercuryPivot)
	let mercury = THREEx.Planets.createMercury()
	mercury.position.x = 1200
	mercuryPivot.add(mercury)
	//VENUS
	let venusPivot = new THREE.Object3D()
	sun.add(venusPivot)
	let venus = THREEx.Planets.createVenus()
	venus.position.x = 1450
	venusPivot.add(venus)
	//EARTH
	let earthPivot = new THREE.Object3D()
	sun.add(earthPivot)
  let earth = new THREE.Mesh(geometry, material)
	earth.position.x = 1750
	earthPivot.add(earth)

	let cloudsPivot = new THREE.Object3D()
	sun.add(cloudsPivot)
  clouds = new THREE.Mesh(geometry1, material1)
	clouds.position.x = 1750
	cloudsPivot.add(clouds)
	// earthPivot.rotation.y += 0.1
	//MARS
	let marsPivot = new THREE.Object3D()
	sun.add(marsPivot)
	let mars = THREEx.Planets.createMars()
	mars.position.x = 1900
	marsPivot.add(mars)
	//JUPITER
	let jupiterPivot = new THREE.Object3D()
	sun.add(jupiterPivot)
	let jupiter = THREEx.Planets.createJupiter()
	jupiter.position.x = 2400
	jupiterPivot.add(jupiter)
	// Saturn and rings
	let saturnPivot = new THREE.Object3D()
	sun.add(saturnPivot)
	let saturn = THREEx.Planets.createSaturn()
	saturn.position.x = 3500
	saturnPivot.add(saturn)

	// let saturnRingsPivot = new THREE.Object3D()
	// sun.add(saturnRingsPivot)
	// let saturnRings = THREEx.Planets.createSaturnRing()
	// saturnRings.position.x = 1300
	// saturnRingsPivot.add(saturnRings)
	// add sun and all the planets rotating around it to the group

	// Uranus
	let uranusPivot = new THREE.Object3D()
	sun.add(uranusPivot)
	let uranus = THREEx.Planets.createUranus()
	uranus.position.x = 4000
	uranusPivot.add(uranus)

	// Neptune
	let neptunePivot = new THREE.Object3D()
	sun.add(neptunePivot)
	let neptune = THREEx.Planets.createNeptune()
	neptune.position.x = 4300
	neptunePivot.add(neptune)

	// Pluto
	let plutoPivot = new THREE.Object3D()
	sun.add(plutoPivot)
	let pluto = THREEx.Planets.createPluto()
	pluto.position.x = 4500
	plutoPivot.add(pluto)

	//Starfield

	let starfield = THREEx.Planets.createStarfield()
	starfield.position.x = 0
 group.add(starfield)
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
