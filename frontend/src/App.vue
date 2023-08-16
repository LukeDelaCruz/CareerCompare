<script lang="ts">
import axios from 'axios';
import { clearURLParameters, captureTrackingData } from './utils/url';
import { defineComponent } from 'vue';
import { TrackingData } from '@/types/tracking';
import { useRouter } from 'vue-router';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default defineComponent({
  name: 'App',
  mounted() {
    this.captureAndClearUtmParameters();
  },
  methods: {
    captureAndClearUtmParameters() {
      const utmData = captureTrackingData();
      if (utmData && !sessionStorage.getItem('trackedUserData')) {
        this.sendTrackingDataToBackend(utmData);
      }
    },
    sendTrackingDataToBackend(data: TrackingData) {
      axios
        .post(`${API_BASE_URL}/track-user-data`, data)
        .then(() => {
          // Prevents sending tracked data to the server on each page refresh
          sessionStorage.setItem('trackedUserData', 'true');
          clearURLParameters();
        })
        .catch((error) => console.error('Error sending data:', error));
    },
  },
  setup() {
    const router = useRouter();

    const goToRoute = (path: string) => {
      router.push(path);
    };

    return {
      goToRoute,
    };
  },
});
</script>

<template>
  <div id="app">
    <el-menu mode="horizontal" default-active="1">
      <el-menu-item index="1" @click="goToRoute('/')">Home</el-menu-item>
      <el-menu-item index="3" @click="goToRoute('/compare')"
        >Comparison</el-menu-item
      >
      <el-menu-item index="2" @click="goToRoute('/about')">About</el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<style>
html {
  overflow-y: scroll;
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Style the navbar */
.el-menu--horizontal {
  border-bottom: 1px solid #e6e6e6;
}

/* Mobile Styles */
@media (max-width: 768px) {
  #app {
    margin: 0;
  }

  h1 {
    font-size: 1.5rem; /* adjust as needed */
  }
  h2 {
    font-size: 1.25rem; /* adjust as needed */
  }
  h3 {
    font-size: 1.1rem; /* adjust as needed */
  }
}
</style>
