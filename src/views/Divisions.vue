<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div v-for="(division, index) in divisionList" :key="index" class="col-lg-3 col-md-6 col-12">
            <div >
              <division-card :title="division.title" :value="division.value"
              :percentage="division.percentage" :iconClass="division.iconClass"
              :iconBackground="division.iconBackground" :detail="detail" directionReverse></division-card>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <create-division-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DivisionCard from "./components/DivisionCard.vue"
import CreateDivisionCard from "./components/CreateDivisionCard.vue"

export default {
  name: "divisions",
  data() {
    return {
      i: 0,
      detail: "There are no iots in this room",
      divisionList : [{
          title: "Garagem",
          value: "0 W",
        },
        {
          title: "Cozinha",
          value: "0 W",
        },
        {
          title: "Sala",
          value: "0 W",
        }
      ],
    };
  },
  methods: {
    async updateMonitoringValues() {
      this.i = -1;
    }
  },
  async mounted() {
    this.division.value = "0 W";
    this.stats.generation.value = "0 W";
    this.stats.flexibility.value = "0 W";
  },
  components: {
    DivisionCard,
    CreateDivisionCard,
  },
};
</script>
