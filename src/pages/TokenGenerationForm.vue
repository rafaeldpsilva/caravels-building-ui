<template>
  <div>
    <card>
    <section class="section-hero section-shaped my-0">
        <div class="shape shape-style-1 shape-default">
            
        </div>
        <div class="container shape-container d-flex align-items-center">
            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <h1 class="display-2 text-white">Generation Token Form</h1>
                </div>
                
                <h6 class="display-6 text-white"><strong>Name:</strong></h6>
                
                <div>
                    <base-input v-model="formu.name" placeholder=""></base-input>
                </div>
                
                <h6 class="display-6 text-white"><strong>List of Resources:</strong></h6>
                <div>
                    <vue-tags-input
                        v-model="tag"
                        :tags="tags"
                        :autocomplete-items="filteredItems"
                        @tags-changed="newTags => tags = newTags"
                    />
                </div>
                <p></p>
                    
                <h6 class="display-6 text-white"><strong>Data Aggregation:</strong></h6>
                
                <div>
                    <base-radio name="individual" class="mb-3 text-white" v-model="radio.radio1">
                        Individual
                    </base-radio>

                    <base-radio name="sum" class="mb-3 text-white" v-model="radio.radio1">
                        Aggregated
                    </base-radio>
                </div>
                
                <p></p>
                
                <h6 class="display-6 text-white"><strong>Time Aggregation:</strong></h6>
                <div>
                    <base-radio name="realtime" class="mb-3 text-white" v-model="radio.radio2">
                        Real-Time
                    </base-radio>

                    <base-radio name="5minutes" class="mb-3 text-white" v-model="radio.radio2">
                        5 Minutes
                    </base-radio>

                    <base-radio name="15minutes" class="mb-3 text-white" v-model="radio.radio2">
                        15 Minutes
                    </base-radio>

                    <base-radio name="60minutes" class="mb-3 text-white" v-model="radio.radio2">
                        60 Minutes
                    </base-radio>
                </div>
                <p></p>
                
                <h6 class="display-6 text-white"><strong>Embargo Period:</strong></h6>

                <div>
                    <base-input v-model="formu.embargo" placeholder="Time in Minutes"></base-input>
                </div>
                <p></p>

                <h6 class="display-6 text-white"><strong>Expiration Date:</strong></h6>
                
                <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker slot-scope="{focus, blur}"
                                @on-open="focus"
                                @on-close="blur"
                                :config="{allowInput: true, mode: 'range'}"
                                class="form-control datepicker"
                                v-model="dates.range">
                    </flat-picker>
                </base-input>

                <div class="btn-wrapper row justify-content-center align-items-center">
                    <base-button tag="a"
                                    class="mb-3 mb-sm-0 text-white"
                                    type="default"
                                    @click="onSubmit">
                        Submit
                    </base-button>
                </div>
                <p></p>
                <div>
                  <textarea v-model="token" class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Token" disabled></textarea>
                </div>
                <p></p>
                <div class="btn-wrapper row justify-content-center align-items-center">
                    <base-button tag="a"
                                    class="mb-3 mb-sm-0 text-white"
                                    type="default"
                                    v-clipboard:copy="token">
                        Copy Token
                    </base-button>
                </div>
            </div>
        </div>
    </section>
    </card>
  </div>
</template>

<script>
  import VueTagsInput from '@johmun/vue-tags-input';
  import flatPicker from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import axios from 'axios';
  import BaseRadio from '../components/BaseRadio.vue';

  export default {
    components: {
      VueTagsInput,
      flatPicker,
      BaseRadio,
    },
    data() {
      return {
        tag: '',
        tags: [],

        autocompleteItems: [{ //Leftside
          text: 'Air Conditioner 101',
        }, {
          text: 'Air Conditioner 102',
        }, {
          text: 'Air Conditioner 103',
        }, {
          text: 'Air Conditioner 105',
        }, {
          text: 'Air Conditioner 107',
        }, {
          text: 'Air Conditioner 108',
        }, {
          text: 'Air Conditioner 109',
        }, {
          text: 'Sockets-101-102-103',
        }, {
          text: 'Sockets-104-105-106',
        }, {
          text: 'Sockets-107-108-109',
        }, {
          text: 'Sockets-corredor',
        }, {
          text: 'Air Conditioner Corredor',
        }, {
          text: 'Lamp 1_101',
        }, {
          text: 'Lamp 2_101',
        }, {
          text: 'Lamp 1_102',
        },{
          text: 'Lamp 2_102'
        }, {
          text: 'Lamp 1_103',
        }, {
          text: 'Lamp 1_105',
        }, {
          text: 'Lamp 2_105',
        }, {
          text: 'Lamp 1_106',
        }, {
          text: 'Lamp 1_107',
        }, {
          text: 'Lamp 1_108',
        },{
          text: 'Lamp 1_109'
        }, { //rightside
          text: 'Fridge',
        }, {
          text: 'Water Heater',
        }, {
          text: 'Microwave',
        }, {
          text: 'Dishwasher',
        }, {
          text: 'Kettle',
        }, {
          text: 'Air Conditioner Kitchen',
        }, {
          text: 'Air Conditioner Hallway',
        },{
          text: 'Air Conditioner 112_115'
        }, {
          text: 'Sockets 112_115',
        }, {
          text: 'Air Conditioner 111_116',
        }, {
          text: 'Sockets 111_116',
        }, {
          text: 'Lamp 1_111',
        }, {
          text: 'Lamp 1_112',
        }, {
          text: 'Lamp 2_112',
        },{
          text: 'Lamp 3_112'
        },  {
          text: 'Lamp 1_115',
        }, {
          text: 'Lamp 2_115',
        }, {
          text: 'Lamp 3_115',
        }, {
          text: 'Lamp 1_116',
        }, {
          text: 'Generation',
        }, { //houses
          text: 'IoT_1',
        }, {
          text: 'IoT_2',
        }, {
          text: 'IoT_3',
        }],

        formu: {
          name: '',
          
          embargo:'',
        },

        radio: {
            radio1: '',
            radio2: '',
          },

        dates: {
              range: "",
              splitdate: "",
              minutes: ""
        },
          
        token: ''
      };
    },
    computed: {
      filteredItems() {
        return this.autocompleteItems.filter(i => {
          return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
      },
    },
    methods: {
      generateToken(payload) {
        const path = "http://192.168.2.171:5000/generate_token"
        axios
          .post(path, payload)
          .then((res) => {
            this.token = res.data.token;
          })
          .catch((error) => {
            console.error(error);
          });
      },

      initForm() {
        this.formu.name = '';
        this.tags = [];
        this.radio.radio1 = '';
        this.radio.radio2 = '';
        this.formu.embargo = '';
        this.dates.range = '';
      },

      onSubmit(e) {
        e.preventDefault();
        this.getDifferenceInMinutes();

        const payload = {
          name: this.formu.name,
          listofresources: this.tags,
          dataaggregation: this.radio.radio1,
          timeaggregation: this.radio.radio2,
          embargo: this.formu.embargo,
          exp: this.dates.minutes
        };
        this.generateToken(payload);
      },
      
      splitdatee() {
        this.dates.splitdate = this.dates.range.split(" ");
      },

      getDifferenceInMinutes() {
        this.splitdatee();

        var date1 = "";
        var date2 = "";
        var diffInMs = "";

        date1 = new Date(this.dates.splitdate[0]);
        date2 = new Date(this.dates.splitdate[2]);
        
        diffInMs = Math.abs(date2 - date1);
        
        this.dates.minutes = diffInMs / (1000 * 60);
      }
    }
  };
</script>
<style lang="css">
.vue-tags-input .ti-autocomplete {
    background: #283944;
    border: 1px solid #8b9396;
    border-top: none;
  }
</style>