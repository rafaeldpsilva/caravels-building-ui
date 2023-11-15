<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>IoT's table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Type</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">URL</th>
              <!--th class="text-secondary opacity-7"></th-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="iot in iotsList" :key="iot.name" @click="showChargeModal(iot)">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img v-if="iot.type == 'refrigerator'" src="../../assets/img/icons/refrigerator.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'dishwasher'" src="../../assets/img/icons/dishwasher.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'hvac'" src="../../assets/img/icons/hvac.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'kettle'" src="../../assets/img/icons/kettle.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'microwave'" src="../../assets/img/icons/microwave.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'sockets'" src="../../assets/img/icons/sockets.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'water heater'" src="../../assets/img/icons/waterheater.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'lamp'" src="../../assets/img/icons/lamp.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'generation'" src="../../assets/img/icons/generation.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'light'" src="../../assets/img/icons/light.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'temperature'" src="../../assets/img/icons/temperature.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'humidity'" src="../../assets/img/icons/humidity.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'co2'" src="../../assets/img/icons/co2.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'movement'" src="../../assets/img/icons/movement.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'door'" src="../../assets/img/icons/door.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else src="../../assets/img/icons/iot.png" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ iot.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ iot.type }}</p>
                <!--p class="text-xs text-secondary mb-0">Organization</p-->
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Online</span>
              </td>
              <td class="align-middle text-center">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
                
              </td>
              <!--td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold">Edit</span>
              </td-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <iot-modal :show="isModalVisible" :iot="selectedIot" @close="isModalVisible = false"></iot-modal>
    </Teleport>
</template>

<script>
import IotService from '../../services/IotService.js';
import IotModal from './IotModal.vue';

export default {
  name: "iots-table",
  components: {
    IotModal
  },
  async mounted() {
    const iots = JSON.parse(localStorage.getItem("iots"))
    if (iots.length == 0) {
      await this.loadIotsList();
    } else {
      this.iotsList = iots;
    }
  },
  data() {
    return {
      selectedIot: null,
      isModalVisible: false,
      iotsList: []
    }
  },
  methods: {
    showChargeModal(iot) {
      this.selectedIot = iot['name']
      this.isModalVisible = true;
    },
    async loadIotsList() {
      this.iotsList = await IotService.getIots(localStorage.getItem("uri"), localStorage.getItem("token"))
      localStorage.setItem("iots", JSON.stringify(this.iotsList))
    },
  }
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
}

tr:hover {
  background-color: #f5f5f5;
}

tr:hover td {
  background-color: #f5f5f5; /* Or any other color you prefer */
}

tr.active {
  background-color: #e0e0e0; /* Highlight color when row is active */
}

</style>