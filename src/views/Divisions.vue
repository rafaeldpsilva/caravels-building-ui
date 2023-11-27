<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div v-for="(division, index) in divisionList" :key="index" class="col-lg-3 col-md-6 col-12">
            <div >
              <division-card :title="division.title" :value="division.value"
              :percentage="division.percentage" :detail="detail" directionReverse></division-card>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <create-division-card :newDivision="newDivision" @addDivision="handleAddDivision" />
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
      newDivision: "",
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
    },
    handleAddDivision(newDivision){
      console.log(newDivision)
      this.divisionList.push(newDivision)
    }
  },
  async mounted() {
    //GET DIVISIONS
  },
  components: {
    DivisionCard,
    CreateDivisionCard,
  },
};
</script>
