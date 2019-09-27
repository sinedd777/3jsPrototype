var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor("#FFFFFF");

document.body.appendChild( renderer.domElement );

camera.position.set( 500,500,500 );
// camera.lookAt(0,0,0);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
// controls.target.set(1000,200,1000)

function getNormalizedCoords(event){
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

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

let border1 = new THREE.Mesh(new THREE.BoxBufferGeometry(20,500,20),new THREE.MeshBasicMaterial(
    { color: '#a22221' } ));
let border2 = new THREE.Mesh(new THREE.BoxBufferGeometry(20,500,20),new THREE.MeshBasicMaterial(
    { color: '#a22221' } ));
border1.position.x=0;
border2.position.x=500;
border1.position.z=0;
border2.position.z=500;
scene.add(border1);
scene.add(border2);

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
		buildings[i].hover = hover;
		buildings[i].revert = revert;
}


var lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff,visible:false } );
var lineGeometry,line;
let lines=[];
for(let i=0;i<99;i++){
	lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(new THREE.Vector3( buildings[i].position.x, buildings[i].geometry.parameters.height, buildings[i].position.z) );
	lineGeometry.vertices.push(new THREE.Vector3( buildings[i+1].position.x, buildings[i+1].geometry.parameters.height, buildings[i+1].position.z) );
	// console.log(buildings[i].geometry.parameters.height);
	line = new THREE.Line( lineGeometry, lineMaterial );
	lines.push(line);
	scene.add( line );
}
for(let i=0;i<100;i++){
	scene.add(buildings[i]);
}

let lineNumbers=[];

function revert() {
    this.material = material;
    while(lineNumbers.length>0){
        lines[lineNumbers.pop()].material = lineMaterial;
    }
}

function hover() {
	this.material= new THREE.MeshBasicMaterial(
        { color: '#f54242' } );
    for(let i=0;i<99;i++){
        if(this.position.x===lines[i].geometry.vertices[0].x && this.position.z===lines[i].geometry.vertices[0].z||this.position.x===lines[i].geometry.vertices[1].x && this.position.z===lines[i].geometry.vertices[1].z){
            lines[i].material = new THREE.LineBasicMaterial( { color: 0x0000ff} );
            lineNumbers.push(i);
        }
    }
	// if(this.position==
}

let object;
var animate = function () {

    renderer.domElement.addEventListener('mousemove', function(event) {

        getNormalizedCoords(event);
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(buildings);
        if (intersects.length > 0) {
            for (var i = 0; i < intersects.length; i++) {
                object = intersects[i];
                intersects[i].object.hover();
            }
        }else{
            object.object.revert();
        }
    });
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();