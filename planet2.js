//adding camera locks the camera - how to solve?
//need to add zoom in and out
//need to disable 360 rotation
//add different rotations for planets
//add 3 moons to jupter and 2moons to saturn
//add mars moons
//create correct light/flare

let container
let camera, scene, projector
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
let group

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
	projector = new THREE.Projector()
  document.addEventListener('mousedown', onDocumentMouseDown, false);

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

	// callisto radius 1,498mi
	let geometry2 = new THREE.SphereGeometry(9.62, 32, 32)
	let material2 = new THREE.MeshPhongMaterial({
		map: textureLoader.load('callisto.jpg'),
		bumpMap: textureLoader.load('CallistoNormal.png'),
		bumpScale: 10
	})

	// sun
	solarSys.sun = THREEx.Planets.createSun()

	// planets and positions

	//MERCURY
	let mercuryPivot = new THREE.Object3D()
	solarSys.sun.add(mercuryPivot)
  solarSys.mercury = THREEx.Planets.createMercury()
	solarSys.mercury.position.x = 1200
	solarSys.mercury.position.z = 2000
	mercuryPivot.add(solarSys.mercury)

	//VENUS
	let venusPivot = new THREE.Object3D()
	solarSys.sun.add(venusPivot)
	solarSys.venus = THREEx.Planets.createVenus()
	venusPivot.position.x = 1450
	venusPivot.position.z = 1700
	venusPivot.add(solarSys.venus)
	// venusPivot.add(camera)

	//EARTH radius 3,959mi
	let earthPivot = new THREE.Object3D()
	solarSys.sun.add(earthPivot)
  solarSys.earth = new THREE.Mesh(geometry, material)
	solarSys.earth.position.x = 1750
	solarSys.earth.position.z = 1200
	earthPivot.add(solarSys.earth)

	let cloudsPivot = new THREE.Object3D()
	solarSys.sun.add(cloudsPivot)
  solarSys.clouds = new THREE.Mesh(geometry1, material1)
	solarSys.clouds.position.x = 1750
	solarSys.clouds.position.z = 1200
	cloudsPivot.add(solarSys.clouds)

	// LUNA radius 1,079mi
	solarSys.moon = THREEx.Planets.createMoon()
	let moonPivot = new THREE.Object3D()
	solarSys.earth.add(moonPivot)
	moonPivot.position.x = 50
	moonPivot.add(solarSys.moon)

	//MARS
	let marsPivot = new THREE.Object3D()
	solarSys.sun.add(marsPivot)
	solarSys.mars = THREEx.Planets.createMars()
	solarSys.mars.position.x = 1900
	solarSys.mars.position.z = 1100
	marsPivot.add(solarSys.mars)

	//JUPITER
	let jupiterPivot = new THREE.Object3D()
	solarSys.sun.add(jupiterPivot)
	solarSys.jupiter = THREEx.Planets.createJupiter()
	solarSys.jupiter.position.x = 2400
	solarSys.jupiter.position.z = 700
	jupiterPivot.add(solarSys.jupiter)

	//JUPITER's CALLISTO
	solarSys.callisto = new THREE.Mesh(geometry2, material2)
	let callistoPivot = new THREE.Object3D()
	solarSys.jupiter.add(callistoPivot)
	callistoPivot.position.x = 370
	callistoPivot.position.z = 200
	callistoPivot.add(solarSys.callisto)

	// Saturn and rings
	let saturnPivot = new THREE.Object3D()
	solarSys.sun.add(saturnPivot)
	solarSys.saturn = THREEx.Planets.createSaturn()
	saturnPivot.position.x = 3500
	saturnPivot.position.z = 500
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
	uranusPivot.position.z = 300
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
	solarSys.neptune.position.z = 100
	neptunePivot.add(solarSys.neptune)

	// Pluto
	let plutoPivot = new THREE.Object3D()
	solarSys.sun.add(plutoPivot)
	solarSys.pluto = THREEx.Planets.createPluto()
	solarSys.pluto.position.x = 5000
	solarSys.pluto.position.z = 50
	plutoPivot.add(solarSys.pluto)

	//Starfield
	solarSys.starfield = THREEx.Planets.createStarfield()

 scene.add(solarSys.starfield)
 group.add(solarSys.sun)

}

let solarSysControls =  new THREE.OrbitControls(camera, renderer.domElement)
function onDocumentMouseDown(event) {
  let vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
  vector = vector.unproject(camera)
  let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  let intersects = raycaster.intersectObjects([solarSys.sun, solarSys.mercury, solarSys.venus, solarSys.earth, solarSys.mars, solarSys.jupiter, solarSys.saturn, solarSys.uranus, solarSys.neptune, solarSys.pluto])
	console.log(intersects)
	if (intersects.length > 0) {
      console.log(intersects[0])
			camera.lookAt(intersects[0].object.position)
			intersects[0].object.add(camera)
			//adding camera locks the camera - how to solve?
			//need to add zoom in and out
			//need to disable 360 rotation
			solarSysControls.minDistance = intersects[0].object.geometry.parameters.radius
  }
}


function animate() {
	requestAnimationFrame(animate)
	render()
}

function render() {

	camera.lookAt( group.position )
	solarSys.moon.rotation.y -= 0.05
	solarSys.sun.rotation.y -= 0.003
	solarSys.starfield.rotation.y -= 0.0001
	solarSys.mercury.rotation.y -= 0.001
	solarSys.venus.rotation.y -= 0.001
	solarSys.earth.rotation.y -= 0.005
	solarSys.clouds.rotation.y -= 0.001
	solarSys.mars.rotation.y -= 0.001
	solarSys.jupiter.rotation.y -= 0.001
	solarSys.saturn.rotation.y -= 0.001
	solarSys.uranus.rotation.y -= 0.001
	solarSys.neptune.rotation.y -=0.01
	solarSys.pluto.rotation.y -=0.01
	renderer.render( scene, camera )

}
