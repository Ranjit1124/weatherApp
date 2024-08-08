<script>
// import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex';
import report from './report.vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
    name: 'weatherApp',
    components: {
        report
    },
    mounted() {
        this.threeFile();
    },
    data() {
        return {
            weather: '',
            lat: '',
            lon: '',
            cityName: '',
            main: '',
            values: '',
            reports: '',
            description: '',
            coordinates: ''
        }
    },
    computed: {

        watchPlace() {
            return this.cityName
        },
        coordi() {
            return this.coordinates
        },
        descriptions() {
            return this.description
        }
    },
    methods: {
        ...mapMutations(['weathers']),
        ...mapActions(['moreInfo']),

        getapi() {
            this.axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=b9c63c654c188d8be6729d2dd961a42d`)
                .then((response) => {
                    this.reports = [this.weather = response.data.weather, this.main = response.data.main]
                    this.$store.dispatch('moreInfo', this.reports)
                    this.description = response.data.weather[0].description
                })
        },
        latandlon() {
            this.axios
                .get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&appid=b9c63c654c188d8be6729d2dd961a42d`)
                .then((response) => {
                    this.values = [`Latitude : ${this.lat = response.data[0].lat},Longitude : ${this.lon = response.data[0].lon}`]
                    this.$store.commit('weathers', this.values)
                    this.coordinates = `Latitude: ${response.data[0].lat},Longitude : ${response.data[0].lon}`
                })
        },
        threeFile() {
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth/3, window.innerHeight/3);
            renderer.setClearColor('#181c20');
            this.$refs.threeContainer.appendChild(renderer.domElement);

            const light = new THREE.AmbientLight('white');
            light.position.set(10, 10, 10).normalize();
            scene.add(light);

            const dlight = new THREE.DirectionalLight('white', 8);
dlight.position.set(0, 3, 0);
scene.add(dlight);
            
            const loader = new GLTFLoader();
            loader.load('/models/scene.gltf', function (gltf) {
                const model = gltf.scene;
                scene.add(model);
                // model.position.z=5;
                // model.position.set(0, 0, 0);
                model.scale.set(1,1,1);
            })

            const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.enableRotate = true;

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update()
                // controls.autoRotate=true;
                renderer.render(scene, camera);
            };

            animate();
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        },
    },
}



</script>
<template>
    <div>
        <div class="whole">
            <div class="main">
                <h2>Weather Report</h2>
                <input type='text' v-model="cityName" placeholder="Enter a City"><br><br>
                <button @click="latandlon">Get Co-Ordinates</button><br><br>
                <button @click="getapi">Get weather Report</button><br><br>
            </div>
            <div class="three-container" ref="threeContainer"></div>

            <div class="place">
                <p class="city">{{ watchPlace }}</p>
                <h3>Co-Ordinates</h3>
                <p>{{ coordi }}</p>
                <h3>Condition</h3>
                <p>{{ descriptions }}</p>
            </div>
        </div>
        <report />
    </div>
</template>
<style scoped>
.whole {
    display: flex;
    justify-content:space-evenly;
}

.main {
    color: white;
    background-image: radial-gradient(100% 100% at 100% 0, #5a7bff 0, #2a5181 100%);
    text-align: center;
    /* width:fit-content; */
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 1em;
    gap: 5%;
    z-index:1;

}

.place {
    color: white;
    margin: 100px auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 1000;
    background-image: radial-gradient(100% 100% at 100% 0, #5a7bff 0, #2a5181 100%);
    width: fit-content;
    padding: 20px;
    border-radius: 1em;
    z-index:1;
}

.city {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2em;
    background: linear-gradient(to left,

            rgb(47, 255, 0),
            rgb(77, 241, 93),
            rgb(180, 242, 157));
    background-clip: text;
    color: transparent;
}

button {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 12px;
    padding: 0.7em 1.4em 0.7em 1.1em;
    color: white;
    background: #ad5389;
    background: linear-gradient(0deg, rgba(20, 167, 62, 1) 0%, rgba(102, 247, 113, 1) 100%);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
    letter-spacing: 0.05em;
    border-radius: 0.5em;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

button:hover {
    transform: scale(1.1);
    transition: 0.5s;
}

button:active {
    box-shadow: 0 0.3em 1em -0.5em #14a73e98;
}

input {
    outline: none;
    border: none;
    font-family: cursive;
    border-radius: 0.5em;
    padding: 20px;
    font-size: 20px;

}

h2 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.three-container {
    width: fit-content;
    overflow: hidden;
    height: fit-content;
    margin: 80px auto;
    position: absolute;
    margin-left:180px;
    /* width:100%;
    height:100vh; */
}
</style>