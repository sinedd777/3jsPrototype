var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#FFFFFF");

document.body.appendChild( renderer.domElement );

camera.position.set( 500, 500, 500 );
camera.lookAt(500,500,500);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);
//
// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);
//
// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();
//
// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);




// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
// mtlLoader.setPath('/examples/3d-obj-loader/assets/');
// mtlLoader.load('desert city.mtl', function (materials) {
//
// 	materials.preload();
//
// 	var objLoader = new THREE.OBJLoader();
// 	objLoader.setMaterials(materials);
// 	objLoader.setPath('/examples/3d-obj-loader/assets/');
// 	objLoader.load('desert city.obj', function (object) {
//
// 		scene.add(object);
// 		object.position.y -= 60;
//
// 	});
//
// });

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();


let boxGeometry;
let material = new THREE.MeshBasicMaterial(
	{ color: '#b5b5b5', vertexColors: THREE.VertexColors, opacity: 0.8, transparent:true } );


let buildings=[];
let height;
let position =1000;
for(let i=0;i<100;i++){
		height=Math.random()*100+20;
		boxGeometry= new THREE.BoxBufferGeometry(20,height,20);
		buildings.push(new THREE.Mesh(boxGeometry,material));
		buildings[i].position.y += height/2;
		buildings[i].position.x +=Math.random()*position;
		buildings[i].position.z +=Math.random()*position;
		buildings[i].name = i;
		buildings[i].hover = hover();
}


var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
var lineGeometry,line;

for(let i=0;i<99;i++){
	lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(new THREE.Vector3( buildings[i].position.x, buildings[i].geometry.parameters.height, buildings[i].position.z) );
	lineGeometry.vertices.push(new THREE.Vector3( buildings[i+1].position.x, buildings[i+1].geometry.parameters.height, buildings[i+1].position.z) );
	// console.log(buildings[i].geometry.parameters.height);
	line = new THREE.Line( lineGeometry, lineMaterial );
	scene.add( line );
}

for(let i=0;i<100;i++){
	scene.add(buildings[i]);
}


function hover() {
	// gradient(this,'#000000','#fc0303');
}

var animate = function () {

	// raycaster.setFromCamera(mouse, camera);
	// var intersects = raycaster.intersectObjects(buildings);
	// if (intersects.length > 0) {
	// 	for (var i = 0; i < intersects.length; i++) {
	// 		intersects[i].object.hover();
	// 	}
	// }

	requestAnimationFrame( animate );

	controls.update();

	renderer.render(scene, camera);

};

animate();