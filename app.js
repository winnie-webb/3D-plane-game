//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;
let followView;
let meshPosition;
function init() {
  container = document.querySelector(".scene");
  followView = 30;
  meshPosition = 0;
  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, followView);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./ap/scene.gltf", gltf => {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    house.scale.set(0.3,0.3,0.3)
    house.rotation.z += 59.7;
    house.rotation.x += 0.15;
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  followView-=0.07;
  camera.position.set(0, 5, followView);
  house.position.z -= 0.1;
  console.log(followView,house.position.z)  

  

  renderer.render(scene, camera);
  window.onkeypress = e => {
    switch(e.code){
      case "KeyD" :
        house.position.x +=0.3;
        house.rotation.y +=0.01;
        break;

      case "KeyA" :
        house.position.x -=0.3;
        house.rotation.y -=0.01;
        break;
  
    }
   
    renderer.render(scene, camera);
    console.log(e.code)
  }
  // fly();
  
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);