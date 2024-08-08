<script>
import { mapGetters } from 'vuex';

export default {
    name: 'reportWeather',
    computed: {
        ...mapGetters(['latandlon', 'report'])
    }
}

</script>

<template>
    <div class="main">
        <h3>More Info:</h3>
        <p> Co-Ordinates : {{ latandlon }}</p>
        <p>Report : {{ report }}</p>
    </div>
</template>

<style scoped>
.main {
    color: white;
    margin: 0 auto;
    background-image: radial-gradient(100% 100% at 100% 0, #5a7bff 0, #2a5181 100%);
    border-radius: 1em;
    /* width:fit-content; */
    padding: 5px;
}

p {
    color: white
}

h3 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 30px;
}
</style>
