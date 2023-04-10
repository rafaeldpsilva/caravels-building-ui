<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
              <template slot-scope="{row}">
                <td v-if="row.token != ''">{{row.token}} </td>
                <td v-if="row.token != ''">{{row.expiration_time_minutes}}</td>
                <td v-if="row.token != ''">{{row.datetime}}</td>
                <td v-if="row.token != ''">{{row.active}}</td>
                <td class="td-revoke text-right" v-if="row.token != ''">
                  <base-button type="danger" size="sm" icon @click="clicktorevoke(row.token)">
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </td>
              </template>
            </base-table>
          </div>
          <p></p>
          <div class="btn-wrapper row justify-content-center align-items-center">
              <base-button tag="a"
                              class="mb-3 mb-sm-0 text-white"
                              type="default"
                              @click="onSubmit">
                  Get Token List
              </base-button>
          </div>
          <p></p>
        </card>
      </div>
    </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from 'axios';
import BaseButtonVue from '../components/BaseButton.vue';
const tableColumns = [];
const tableData = [
  {
    id: 1,
    token: "",
    expiration_time_minutes: "",
    datetime: "",
    active: "",
    revoke: ""
  }
];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table1: {
        title: "Tokens",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  },
  methods: {
    getTokens() {
      const path = `http://192.168.2.171:5000/building/tokens`
      axios.get(path)
        .then((res) => {
          this.consumption = JSON.stringify(res.data, null, 2);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendtokentorevoke(payload){
      const path = "http://192.168.2.171:5000/building/revoke/token"
        axios
          .post(path, payload)
          .then((res) => {
            this.token = res.data.token;
          })
          .catch((error) => {
            console.error(error);
          });
    },

    onSubmit(e) {
      e.preventDefault();
      this.getTokens();
      this.mounted();
    },

    clicktorevoke(token) {
      
      const payload = {
        token: token
      };
      console.log(token)
      
      this.sendtokentorevoke(payload);
    },

    mounted() {
      var obj = JSON.parse(this.consumption);
      var index = [];
      // build the index
      for (var x in obj) {
        index.push(x);
      }
      // sort the index
      index.sort(function (a, b) {    
        return a == b ? 0 : (a > b ? 1 : -1); 
      }); 

      //adicionar os titulos as colunas
      this.tableColumns = Object.keys(obj[index[0]]);
      this.table1.columns.push(...this.tableColumns);
      
      this.tableColumns = ["Revoke"];
      this.table1.columns.push(...this.tableColumns);


      //adicionar o conteudo à tabela
      this.tableData = Object.values(obj);
      this.table1.data.push(...this.tableData);
      console.log(this.tableData)
    }
  }
};
</script>
<style lang="css" scoped>
td {
max-width: 1200px;
}
</style>

