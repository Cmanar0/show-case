<template>
  <!-- Success View -->
  <div v-if="success" class="success-screen">

    <div class="success-content">
      <h1>Děkujeme, víme o Vás</h1>
      <p>Nyní prosím vyčkejte, než si Vás vyzvedne některý ze zástupců pobočky.</p>
      <div class="meeting-info">
        <p>Datum: {{ meeting.date }}</p>
        <p>Čas: {{ meeting.time }}</p>
        <p>Místo: {{ meeting.location }}</p>
        <p>Osoba: {{ meeting.person }}</p>
      </div>
    </div>
  </div>

  <!-- Initial View -->
  <div v-else>
    <div class="header">
      <div class="aaa-container">
        <div class="aaa-auto">
          <h1>AAA AUTO</h1>
        </div>
      </div>
      <div class="welcome-container">
        <div class="welcome">
          <h1>Mám domluvenou schůzku</h1>
        </div>
      </div>
    </div>
    <div class="background flex justify-center items-center h-screen">
      <div class="min-h-screen flex flex-col items-center justify-center" :style="{ backgroundColor: '#025EA7' }" :class="{ 'margin-top': isMobile }">

        <!-- Phone Number Display -->
        <div class="mobile-scale flex items-center gap-6 md:gap-8 mb-8" :class="{ 'flex-col': isMobile }">
          <!-- Zpět button desktop -->
          <button v-if="!isMobile" @click="goBack" class="back-btn rounded-full bg-transparent bolt text-white w-32 h-16 flex items-center justify-center">
            <img :src="'/back.svg'" alt="Back" class="w-6 h-6 mr-2" /> Zpět
          </button>

          <div class="flex items-center gap-3 phone">
            <!-- Country Code Dropdown -->
            <div class="flex items-center">
              <div class="relative mr-4">
                <button class="bg-white custom-dropdown txt-blue-custom w-28 h-16 bolt rounded-md text-xl shadow-md flex items-center justify-center" @click="toggleDropdown">
                  +{{ selectedCountryCode }}
                </button>
                <div v-if="dropdownVisible" class="absolute mt-2 bg-white shadow-lg w-28 rounded-md">
                  <ul>
                    <li v-for="code in countryCodes" :key="code" @click="selectCountryCode(code)" class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                      +{{ code }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Clear Button mobile -->
              <button v-if="isMobile" @click="clearPhoneNumber" class="bg-white custom-clear txt-blue-custom w-16 h-16 rounded-lg text-xl shadow-md flex items-center justify-center ml-2">
                <img :src="'/cross.svg'" alt="Clear" class="button-icon">
              </button>
            </div>
            <div class="flex flex-row gap-3">
              <div class="flex justify-center items-center">
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[0] }}</span>
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[1] }}</span>
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[2] }}</span>
              </div>
              <div class="flex justify-center items-center">
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[3] }}</span>
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[4] }}</span>
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[5] }}</span>
              </div>
              <div class="flex justify-center items-center">
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[6] }}</span>
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[7] }}</span>
                <span class="slot text-3xl text-white font-bold">{{ phoneNumber[8] }}</span>
              </div>
            </div>

            <!-- Clear Button desktop -->
            <button v-if="!isMobile" @click="clearPhoneNumber" class="bg-white custom-clear txt-blue-custom w-16 h-16 rounded-lg text-xl shadow-md flex items-center justify-center ml-2">
              <img :src="'/cross.svg'" alt="Clear" class="button-icon">
            </button>
          </div>
          <div class="flex flex-row gap-10">
            <!-- Zpět button mobile -->
            <button v-if="isMobile" @click="goBack" class="back-btn rounded-full bg-transparent bolt text-white w-32 h-16 flex items-center justify-center">
              <img :src="'/back.svg'" alt="Back" class="w-6 h-6 mr-2" /> Zpět
            </button>
            <!-- Vyhledat button -->
            <button @click="searchMeeting" class="bg-white bolt search-btn txt-blue-custom w-36 h-16 rounded-full flex items-center justify-center">
              <img :src="'/search.svg'" alt="Back" class="w-6 h-6 mr-2" /> Vyhledat
            </button>
          </div>
        </div>

        <!-- Numeric Keyboard -->
        <div class="grid mt-10 grid-cols-3 gap-3">
          <!-- First row of digits -->
          <button v-for="digit in digits.slice(0, 9)" :key="digit" @click="enterDigit(digit)" class="bg-blue-100 txt-blue-custom w-16 h-16 rounded-md text-xl shadow-md flex items-center justify-center">
            {{ digit }}
          </button>

          <!-- 0 button spanning two columns -->
          <button @click="enterDigit(0)" class="bg-blue-100 txt-blue-custom h-16 rounded-lg text-xl shadow-md flex items-center justify-center col-span-2">
            0
          </button>

          <!-- Delete Button (Backspace) -->
          <button @click="deleteDigit" class="bg-blue-100 txt-blue-custom w-16 h-16 rounded-lg text-xl shadow-md flex items-center justify-center">
            <img :src="'/delete.svg'" alt="icon" class="button-icon">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addError } from '../stores/errorsStore.js'; // Ensure this is the correct path

const router = useRouter();

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const isMobile = ref(false);
const success = ref(false); // State for toggling views
const meeting = ref(null); // Store meeting information

// Function to check if the device is mobile
const checkIsMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 1150px)').matches;
};

// Check on component mount
onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile);
});

const phoneNumber = ref([]);
const countryCodes = [420, 421, 49, 44, 1];
const selectedCountryCode = ref(420);
const dropdownVisible = ref(false);

// Toggle country code dropdown
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Select country code
const selectCountryCode = (code) => {
  selectedCountryCode.value = code;
  dropdownVisible.value = false;
};

// Enter digit
const enterDigit = (digit) => {
  if (phoneNumber.value.length < 9) {
    phoneNumber.value.push(digit);
  }
};

// Delete last digit
const deleteDigit = () => {
  if (phoneNumber.value.length > 0) {
    phoneNumber.value.pop();
  }
};

// Clear the phone number
const clearPhoneNumber = () => {
  phoneNumber.value = [];
};

// Navigate back
const goBack = () => {
  router.push('/kiosek'); // Adjust the route as necessary
};

// Search for a meeting (send phone number to the server)
const searchMeeting = async () => {
  // Construct the full phone number
  const fullPhoneNumber = `+${selectedCountryCode.value}${phoneNumber.value.join('')}`;

  try {
    const response = await $fetch(`/api/meeting?phone=${encodeURIComponent(fullPhoneNumber)}`);

    if (response && response.status === 200 && response.meeting) {
      // Store the meeting information
      meeting.value = response.meeting;
      success.value = true; // Show success screen
    } else {
      handleError(response.status, response.error);
    }
  } catch (error) {
    handleError(error.response?.status, error.message);
  }
};

// Function to handle errors, similar to fetchMeetingInfo
const handleError = (status, message) => {
  let header = 'Chyba';
  let content = message || 'Nastala neznámá chyba. Zkuste to prosím znovu.';

  switch (status) {
    case 404:
      header = 'Nenalezeno';
      content = 'Schůzka nebyla nalezena. Zkontrolujte telefonní číslo a zkuste to znovu.';
      break;
    case 500:
      header = 'Chyba serveru';
      content = 'Nastala chyba serveru. Zkuste to prosím později.';
      break;
    case 403:
      header = 'Zakázáno';
      content = 'Nemáte oprávnění k přístupu k tomuto zdroji.';
      break;
    case 400:
      header = 'Špatný požadavek';
      content = 'Požadavek je neplatný. Zadejte prosím platné telefonní číslo.';
      break;
    default:
      break;
  }

  addError({
    header,
    content,
    btnText: 'Ok',
  });
};
</script>

<style scoped>
/* Success screen styles */
.success-screen {
  width: 100vw;
  height: 100vh;
  background-image: url('../public/handshake.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.success-header {
  background-color: #015EA8;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.success-content {
  background-color: rgb(255, 255, 255);
  padding: 40px;
  border-radius: 20px;
}
.success-content p {
  font-size: 1.5rem;
  margin: 10px 0;
  color: #000;
}
.success-content h1{
  font-size: 2rem !important;
  margin: 10px 0;
  color: #000;
}

.meeting-info p {
  color: #000;
  font-size: 1.5rem;
  margin: 10px 0;
}

/* Initial view styles (existing styles) */
.margin-top {
  margin-top: 20%;
}
.bolt {
  font-weight: 900;
}
.back-btn {
  border: 1px solid #ffffff;
  display: flex;
}
.search-btn {
  border: 1px solid #ffffff;
}
.txt-blue-custom {
  color: #015EA8 !important;
}
.slot {
  border-bottom: 1px solid #ffffff;
  min-width: 35px;
  min-height: 60px;
  max-width: 30px;
  max-height: 70px;
  text-align: center;
  margin: 5px 3px;
  padding: 5px;
}
@media screen and (max-width: 1150px) {
  .phone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 768px) {
  .phone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .slot {
    min-width: 20px;
    min-height: 40px;
    max-width: 20px;
    max-height: 40px;
    text-align: center;
    margin: 5px 3px;
    padding: 5px;
  }
}

.button-icon {
  width: 25px;
  height: 25px;
}
.background {
  background-color: #015EA8;
}
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
.welcome-container {
  width: auto;
  height: 100%;
  margin-left: auto;
}
.aaa-auto {
  background-color: white;
  padding: 15px 80px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  clip-path: polygon(0 0%, 100% 0, 96% 100%, 0 100%);
}
.welcome {
  background-color: white;
  padding: 15px 50px 15px 80px;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  clip-path: polygon(2% 0%, 100% 0, 100% 100%, 0 100%);
}

.aaa-auto h1 {
  color: #015EA8;
  font-size: 2rem;
  margin: 0;
  font-weight: 1000;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 5px;
  font-style: italic;
}
.welcome h2 {
  color: #0056b3;
  font-size: 2rem;
  margin: 0;
  font-weight: 1000;
  text-underline-offset: 5px;
  text-decoration-thickness: 5px;
}
.welcome h1 {
  color: #0056b3 !important;
  font-size: 2rem;
  margin-right: 10px;
  text-decoration: none;
  font-weight: 1000;
  font-style: normal;
}
@media screen and (max-width: 768px) {
  .buttons {
    margin-top: 20%;
  }
  .buttons button span {
    font-size: 1.2rem;
  }
  .header {
    gap: 2vh;
  }
  .aaa-container {
    margin-right: 30%;
  }
  .welcome-container {
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
    background-color: #015EA8;
    color: white !important;
    margin: 0;
  }
  .welcome h2 {
    margin: 0;
  }
}
</style>
