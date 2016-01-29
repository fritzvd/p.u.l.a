var THREE = require('three');
var makeText = require('./makeText')(THREE);
var typeface = require('three.regular.helvetiker');
THREE.typeface_js.loadFace(typeface);

var scene, camera, renderer, pointLight, time = 0;

var geometry, material, mesh, sphereG, sphereMesh;

init();
animate();


function init () {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000);
  pointLight = new THREE.PointLight(0xFFFFFF);

  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;
  scene.add(pointLight);

  geometry = new THREE.BoxGeometry(200, 200, 200);
  material = new THREE.MeshBasicMaterial({color: 0xff00ff, wireframe: true});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  sphereG = new THREE.Sphere(undefined, 400);
  var sphereM = new THREE.MeshBasicMaterial({
    color: THREE.ColorKeywords.greenyellow,
    wireframe: true
  });
  sphereMesh = new THREE.Mesh(sphereG, sphereM);

  scene.add(sphereMesh);

  var obj = makeText('PULA.', {
			size: 6,
			depth: 0,
			curveSegments: 3,
			wireframe: true,
			color: THREE.ColorKeywords.mintcream
		});
  scene.add(obj);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  var newGeom = new THREE.Geometry();

  var g = new THREE.IcosahedronGeometry( 2 , 1 ); // new THREE.CubeGeometry( 2 , 0.3 , 0.5  );
  for( var i = 0; i < 3000; i++ ){


    var m = new THREE.Mesh( g );

    m.position.x = Math.random() - 0.5;
    m.position.y = Math.random() - 0.5;
    m.position.z = Math.random() - 0.5;

    m.position.normalize();

    m.position.multiplyScalar( 30  + Math.random() * 20);

    m.rotation.x = Math.random() * 4;
    m.rotation.y = Math.random() * 4;
    m.rotation.z = Math.random() * 4;
    m.updateMatrix();
    newGeom.merge( g , m.matrix );

  }

  var meshI = new THREE.Mesh( newGeom, new THREE.MeshNormalMaterial());
  scene.add( meshI);
}

function animate() {
  requestAnimationFrame(animate);

  // time += 1;
 mesh.rotation.x += 0.001;
 mesh.rotation.y += 0.002;
  // if (time < 300) {
    camera.position.z += 0.1
  // }
  renderer.render(scene, camera);
}

function handleInput (e) {
  console.log(e.keyIdentifier)
  switch (e.keyIdentifier) {
    case "Up":
    camera.position.y += 1;
    break;
    case "Down":
    camera.position.y -= 1;
    break;
    case "Left":
    camera.position.x -= 1;
    break;
    case "Right":
    camera.position.x += 1;
    break;
  }

    e.stopPropagation();
};

window.addEventListener('keydown', handleInput);
