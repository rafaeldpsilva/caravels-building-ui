<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.consumption.title" :value="stats.consumption.value"
              :percentage="stats.consumption.percentage" :iconClass="stats.consumption.iconClass"
              :iconBackground="stats.consumption.iconBackground" :detail="detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.generation.title" :value="stats.generation.value"
              :percentage="stats.generation.percentage" :iconClass="stats.generation.iconClass"
              :iconBackground="stats.generation.iconBackground" :detail="detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.flexibility.title" :value="stats.flexibility.value"
              :percentage="stats.flexibility.percentage" :iconClass="stats.flexibility.iconClass"
              :iconBackground="stats.flexibility.iconBackground" :percentageColor="stats.flexibility.percentageColor"
              :detail="detail" directionReverse></card>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2 mb-4">
              <building-overview />
            </div>
            <div class="card z-index-2">
              <building-forecast />
            </div>
          </div>
          <div class="col-lg-5">
            <demand-response-events-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import BuildingOverview from "./components/Dashboard/BuildingOverview.vue";
import BuildingForecast from "./components/Dashboard/BuildingForecast.vue";
import DemandResponseEventsCard from "./components/DemandResponse/DemandResponseEventsCard.vue";
import EnergyService from "../services/EnergyService.js";

export default {
  name: "dashboard-default",
  data() {
    return {
      i: 0,
      detail: "updated 5 seconds ago",
      stats: {
        consumption: {
          title: "Consumption",
          value: "",
          iconClass: "fa fa-flash",
          iconBackground: "bg-gradient-primary",
        },
        generation: {
          title: "Generation",
          value: "",
          iconClass: "fa fa-sun-o",
          iconBackground: "bg-gradient-danger",
        },
        flexibility: {
          title: "Flexibility",
          value: "W",
          iconClass: "ni ni-sound-wave",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
        },
      },
    };
  },
  async mounted() {
    this.setupMQTT();
    this.stats.consumption.value = "0 W";
    this.stats.generation.value = "0 W";
    this.stats.flexibility.value = "0 W";
    this.detailInterval = setInterval(() => {
      this.i += 1;
      this.detail = "updated " + this.i + " seconds ago"
    }, 1000);
  },
  methods: {
    async updateMonitoringValues() {
      this.i = -1;
    }
  },
  beforeUnmount() {
    // Clear intervals to prevent memory leaks
    clearInterval(this.monitoringInterval);
    clearInterval(this.detailInterval);
    if (this.mqttClient) {
      this.mqttClient.end();
    }
  },
  components: {
    Card,
    BuildingOverview,
    BuildingForecast,
    DemandResponseEventsCard
  },
};
</script>
