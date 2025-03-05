import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Mesh,
    PlaneGeometry,
    ShadowMaterial,
    DirectionalLight,
    PCFSoftShadowMap,
    SRGBColorSpace,
    Color,
    AmbientLight,
    Box3,
    LoadingManager,
    MathUtils,
} from '../../three/three.js';
import { OrbitControls } from '../../three/OrbitControls.js';
import URDFLoader from '../URDFLoader.js';

let scene, camera, renderer, robot, controls;

init();
render();

function init() {

    scene = new Scene();
    scene.background = new Color(0x263238);

    camera = new PerspectiveCamera();
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    renderer = new WebGLRenderer({ antialias: true });
    renderer.outputEncoding = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    const directionalLight = new DirectionalLight(0xffffff, 1.0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.setScalar(1024);
    directionalLight.position.set(5, 30, 5);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const ground = new Mesh(new PlaneGeometry(), new ShadowMaterial({ opacity: 0.25 }));
    ground.rotation.x = -Math.PI / 2;
    ground.scale.setScalar(30);
    ground.receiveShadow = true;
    scene.add(ground);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.5;
    controls.target.y = 1;
    controls.update();

    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.packages = {
        staubli_tx90_support: "/urdf/staubli_tx90_support"
    }
    loader.load('/urdf/staubli_tx90_support/urdf/tx90.urdf', result => {

        robot = result;

    });

    // wait until all the geometry has loaded to add the model to the scene
    manager.onLoad = () => {

        robot.rotation.x = -Math.PI / 2;
        robot.traverse(c => {
            c.castShadow = true;
        });
        for (let i = 1; i <= 6; i++) {

            robot.joints[`joint_${ i }`].setJointValue(MathUtils.degToRad(0));

        }
        robot.updateMatrixWorld(true);

        const bb = new Box3();
        bb.setFromObject(robot);

        // robot.position.y -= bb.min.y;
        scene.add(robot);

    };

    onResize();
    window.addEventListener('resize', onResize);

}

function onResize() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

function render() {

    requestAnimationFrame(render);
    renderer.render(scene, camera);

}
