<template>
  <div class="header">
    <div class="aaa-container">
      <div class="aaa-auto">
        <h1>AAA AUTO</h1>
      </div>
    </div>
    <div class="welcome-container">
      <div class="welcome">
        <h1>Vítáme Vás v AAA AUTO</h1>
        <h2>České Budějovice</h2>
      </div>
      </div>
  </div>
  <div :style="backgroundContainerStyle">
    <div class="angled-content" :style="angledContentStyle">

      <div class="buttons" :style="buttonsContainerStyle">
        <button 
          v-for="(button, index) in buttonData" 
          :key="index" 
          :style="buttonStyles[index]" 
          @click="button.method"
        >
          <div class="icon-container">
            <img :src="button.iconSrc" alt="icon" class="button-icon">
          </div>
          <span>{{ button.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// Initialize screenWidth with a default value (for SSR safety)
const screenWidth = ref(0);

const updateScreenWidth = () => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth;
  }
};

// Ensure that the code runs only in the client environment
onMounted(() => {
  updateScreenWidth(); // Update the screen width on mount
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScreenWidth);
  }
});

// Calculate the clip-path value based on screen width
const calculateClipPath = () => {
  const minWidth = 480;
  const maxWidth = 1024;

  const leftTopCorner = Math.max(0, Math.min(40 * (screenWidth.value - minWidth) / (maxWidth - minWidth), 40));

  return `polygon(${leftTopCorner < 30 ? leftTopCorner : 30}% 0, 100% 0%, 100% 100%, 0% 100%)`;
};

// Calculate the width based on screen width
const calculateWidth = () => {
  const minWidth = 480;
  const maxWidth = 1024;
  const startValue = 100; // 100%
  const endValue = 60; // 60%

  if (screenWidth.value <= minWidth) return `${startValue}%`;
  if (screenWidth.value >= maxWidth) return `${endValue}%`;

  const widthValue = startValue - (40 * (screenWidth.value - minWidth) / (maxWidth - minWidth));
  return `${widthValue}%`;
};

// Calculate rotation angle for the buttons container
const calculateRotation = () => {
  const minWidth = 480;
  const maxWidth = 1300;
  const maxRotation = 20; // Max rotation at large screens

  if (screenWidth.value <= minWidth) return 0;
  if (screenWidth.value >= maxWidth) return maxRotation;

  return (screenWidth.value - minWidth) / (maxWidth - minWidth) * maxRotation;
};

// Calculate margin-left for buttons based on index and screen width
const calculateMarginLeft = (index, totalButtons) => {
  const minWidth = 480;
  const maxWidth = 1024;

  const largestMargin = 50; // Example: 50px for the first button
  const smallestMargin = 50; // 5x smaller margin for the last button

  if (screenWidth.value <= minWidth) return `0px`;
  if (screenWidth.value >= maxWidth) {
    const decrement = (largestMargin - smallestMargin) / (totalButtons - 1) * index;
    return `${largestMargin - decrement}px`;
  }

  const marginRange = largestMargin - smallestMargin;
  const decrement = (marginRange / (totalButtons - 1)) * index;
  const margin = largestMargin - decrement;

  const interpolationFactor = (screenWidth.value - minWidth) / (maxWidth - minWidth);
  return `${margin * interpolationFactor}px`;
};

const calculateMaxBtnWidth = () => {
  const minWidth = 480;
  const maxWidth = 1400;
  const widthValue = 80 - (30 * (screenWidth.value - minWidth) / (maxWidth - minWidth));

  return `${widthValue}%`;

};

// Define the total number of buttons
const totalButtons = 5;

// Button data array with text, icon, and method for each button
const buttonData = [
  { text: "Mám domluvenou schůzku", iconSrc: "truck.svg", method: () => router.push("/hledani-schuzky")},
  { text: "Kupuji auto", iconSrc: "/car.svg", method: () => console.log("Clicked: Kupuji auto") },
  { text: "Prodávám auto", iconSrc: "/database.svg", method: () => console.log("Clicked: Prodávám auto") },
  { text: "Protiúčet", iconSrc: "handshake.svg", method: () => console.log("Clicked: Protiúčet") },
  { text: "Reklamace", iconSrc: "cart.svg", method: () => console.log("Clicked: Reklamace") },
];

// Compute styles for the buttons container
const buttonsContainerStyle = computed(() => ({
  transform: `rotate(${calculateRotation()}deg)`,
}));

// Compute styles for each button
const buttonStyles = computed(() => {
  const rotation = calculateRotation();
  return Array.from({ length: totalButtons }, (_, index) => ({
    marginLeft: calculateMarginLeft(index, totalButtons),
    width: '100%', // Ensure full width
    maxWidth: calculateMaxBtnWidth(),
    minWidth: '50%',
    backgroundColor: '#004F90',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transform: `rotate(${-rotation}deg)`, // Opposite rotation of the container
  }));
});

// Dynamic styles based on screen width
const backgroundContainerStyle = ref({
  width: '100vw',
  height: '100vh',
  backgroundImage: "url('/audi.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative',
});

const angledContentStyle = computed(() => ({
  background: 'white',
  width: calculateWidth(), // Use calculated width value
  height: '100vh',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  clipPath: calculateClipPath(), // Use calculated clip-path value
  overflow: 'hidden',
}));
</script>

<style scoped>
.header {
  position: absolute;
  top: 3%;
  left: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  z-index: 100;
  flex-wrap: wrap;
}
.aaa-container {
  width: auto;
  height: 100%;
  min-width: 30%;
}
.welcome-container  {
  width: auto;
  height: 100%;
  padding-right: 20px;
  margin-left: auto;
  margin-right: 80px;
}
.aaa-auto {
  background-color:#015EA8;
  padding: 15px 80px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  clip-path: polygon(0 0%, 100% 0, 96% 100%, 0 100%);
}
.welcome {
  background-color: white;
  padding: 15px 10px 15px 80px ;
  display: flex;  
  align-items: center;
  justify-content: start;
  width: 100%;
  clip-path: polygon(2% 0%, 100% 0, 100% 100%, 0 100%);
}

.aaa-auto h1 {
  color: #ffffff;
  font-size: 2rem;
  margin: 0;
  font-weight: 1000;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 5px;
  font-style: italic;
}
.welcome h2 {
  color: #0056b3 ;
  font-size: 2rem;
  margin: 0;
  font-weight: 1000;
  text-underline-offset: 5px;
  text-decoration-thickness: 5px;
}
.welcome h1 {
  color: #0056b3 !important;
  font-size: 2rem ;
  margin-right: 10px;
  text-decoration: none;
  font-weight: 1000;
  font-style:normal
}
.angled-content {
  height: 100%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2vw;
  height: 100%;
}

.buttons button {
  position: relative;
}

.icon-container {
  background-color: white;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.button-icon {
  width: 24px;
  height: 24px;
}

.buttons button:hover {
  background-color: #003763 !important;
}

.buttons span {
  flex-grow: 1;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .buttons{
    margin-top: 20%;
  }
  .buttons button span{
    font-size: 1.2rem;
  }
  .header{
    gap: 2vh;
  }
  .aaa-container {
    margin-right: 30%
  }
  .welcome-container {
    padding: 0 10%;
    margin-left: auto;

  }
  .welcome {
    padding: 15px 10px 15px 30px;
    display: flex;
    flex-direction: column;
  }
  .welcome h1 {
    font-size: 1.5rem !important;
  }
  .welcome h2 {
    font-size: 1.5rem !important;
  }
  .aaa-auto h1 {
    font-size: 1.5rem !important;
  }
} 
@media screen and (max-width: 500px) {

  .welcome-container {
    padding: 20px;
    margin: 0 auto;
  }
  .welcome {
    padding: 0;
    clip-path: polygon(0 0%, 100% 0, 100% 100%, 0 100%);
  }
  .welcome h1 {
    margin: 0;  
  }
  .welcome h2 {
    margin: 0;  
  }

}
</style>
