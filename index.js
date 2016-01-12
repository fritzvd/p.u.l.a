var THREE = require('three');

var scene, camera, renderer, pointLight;

var geometry, material, mesh;

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

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

function animate() {
  requestAnimationFrame(animate);

/*  mesh.rotation.x += 0.01;*/
  /*mesh.rotation.y += 0.02;*/
  renderer.render(scene, camera);
}

function handleInput (e) {
  switch (e.key) {
    case "Up":
    camera.position.y += 1;
    case "Down":
    camera.position.y -= 1;
    case "Left":
    camera.position.x -= 1;
    case "Right":
    camera.position.x += 1;
  }

    e.stopPropagation();
};

window.addEventListener('keydown', handleInput); 
