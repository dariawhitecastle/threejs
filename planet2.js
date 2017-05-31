let container
let camera, scene
let solarSys = {
	sun: {},
	mercury: {},
	venus: {},
	earth: {},
	clouds: {},
	moon: {},
	mars: {},
	jupiter: {},
	saturn: {},
	saturnRings: {},
	uranus: {},
	uranusRings: {},
	neptune: {},
	pluto: {},
	starfield: {}
}

let onRenderFcts = []
let group
let mouseX = 0, mouseY = 0

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('mainCanvas'), antialias: true})
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)
const windowW = window.innerWidth
const windowH= window.innerHeight

init()
animate()

function init() {
	container = document.getElementById( 'mainCanvas' )
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 )
	camera.position.set( 0, 0, 7000 )
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
	solarSys.sun = THREEx.Planets.createSun()

	// planets and positions

	//MERCURY
	let mercuryPivot = new THREE.Object3D()
	solarSys.sun.add(mercuryPivot)
  solarSys.mercury = THREEx.Planets.createMercury()
	solarSys.mercury.position.x = 1200
	mercuryPivot.add(solarSys.mercury)
	//VENUS
	let venusPivot = new THREE.Object3D()
	solarSys.sun.add(venusPivot)
	solarSys.venus = THREEx.Planets.createVenus()
	venusPivot.position.x = 1450
	venusPivot.add(solarSys.venus)
	// venusPivot.add(camera)
	//EARTH
	let earthPivot = new THREE.Object3D()
	solarSys.sun.add(earthPivot)
  solarSys.earth = new THREE.Mesh(geometry, material)
	solarSys.earth.position.x = 1750
	earthPivot.add(solarSys.earth)

	let cloudsPivot = new THREE.Object3D()
	solarSys.sun.add(cloudsPivot)
  solarSys.clouds = new THREE.Mesh(geometry1, material1)
	solarSys.clouds.position.x = 1750
	cloudsPivot.add(solarSys.clouds)
	// earthPivot.rotation.y += 0.1
	//MARS
	let marsPivot = new THREE.Object3D()
	solarSys.sun.add(marsPivot)
	solarSys.mars = THREEx.Planets.createMars()
	solarSys.mars.position.x = 1900
	marsPivot.add(solarSys.mars)
	//JUPITER
	let jupiterPivot = new THREE.Object3D()
	solarSys.sun.add(jupiterPivot)
	solarSys.jupiter = THREEx.Planets.createJupiter()
	solarSys.jupiter.position.x = 2400
	jupiterPivot.add(solarSys.jupiter)
	// Saturn and rings
	let saturnPivot = new THREE.Object3D()
	solarSys.sun.add(saturnPivot)
	solarSys.saturn = THREEx.Planets.createSaturn()
	saturnPivot.position.x = 3500
	saturnPivot.add(solarSys.saturn)

	let saturnRingsPivot = new THREE.Object3D()
	saturnPivot.add(saturnRingsPivot)
	solarSys.saturnRings = THREEx.Planets.createSaturnRing()
	saturnRingsPivot.add(solarSys.saturnRings)

	// add solarSys.sun and all the planets rotating around it to the group

	// Uranus
	let uranusPivot = new THREE.Object3D()
	solarSys.sun.add(uranusPivot)
	solarSys.uranus = THREEx.Planets.createUranus()
	uranusPivot.position.x = 4200
	uranusPivot.add(solarSys.uranus)

	let uranusRingsPivot = new THREE.Object3D()
	uranusPivot.add(uranusRingsPivot)
	solarSys.uranusRings = THREEx.Planets.createUranusRing()
	uranusRingsPivot.add(solarSys.uranusRings)

	// Neptune
	let neptunePivot = new THREE.Object3D()
	solarSys.sun.add(neptunePivot)
	solarSys.neptune = THREEx.Planets.createNeptune()
	solarSys.neptune.position.x = 4800
	neptunePivot.add(solarSys.neptune)

	// Pluto
	let plutoPivot = new THREE.Object3D()
	solarSys.sun.add(plutoPivot)
	solarSys.pluto = THREEx.Planets.createPluto()
	solarSys.pluto.position.x = 5000
	plutoPivot.add(solarSys.pluto)

	//Starfield
	solarSys.starfield = THREEx.Planets.createStarfield()

 scene.add(solarSys.starfield)
 group.add(solarSys.sun)

}

function animate() {
	requestAnimationFrame( animate )
	render()
}

let solarSysControls =  new THREE.OrbitControls(camera, renderer.domElement)

function render() {

	camera.lookAt( group.position )
	solarSys.sun.rotation.y -= 0.003
	solarSys.starfield.rotation.y -= 0.0004
	solarSys.mercury.rotation.y -= 0.005
	solarSys.venus.rotation.y -= 0.005
	solarSys.earth.rotation.y -= 0.005
	solarSys.clouds.rotation.y -= 0.005
	solarSys.mars.rotation.y -= 0.005
	solarSys.jupiter.rotation.y -= 0.005
	solarSys.saturn.rotation.y -= 0.005
	solarSys.uranus.rotation.y -= 0.05
	solarSys.neptune.rotation.y -=0.01
	solarSys.pluto.rotation.y -=0.01

	document.addEventListener('click', function() {
		console.log(this);
	})

	renderer.render( scene, camera )

}
