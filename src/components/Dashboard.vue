<template>
  <div>
    <v-card class="mt-4 resource-card">
      <v-card-title>
        <div>
          <h3 class="headline mb-0">Hello there</h3>
          <p>It seems you have reached the dashboard, unfortunately there is nothing here.</p>
        </div>
      </v-card-title>
    </v-card>

    <div class='mt-3'>

        <v-layout row wrap class="" style='margin: 0 -15px'>
          <v-flex xs4>
            <v-card class="pa-3 ma-3 resource-card">
              <apexchart :options="chartOptions1" :series="series1" height='150'></apexchart>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card class="pa-3 ma-3 resource-card">
              <apexchart :options="chartOptions1" :series="series1" height='150'></apexchart>
            </v-card>
          </v-flex>

          <v-flex xs4>
            <v-card class="pa-3 ma-3 resource-card">
              <apexchart :options="chartOptions1" :series="series1" height='150'></apexchart>
            </v-card>
          </v-flex>

          <v-flex xs6>
            <v-card class="pa-3 ma-3 resource-card">
              <apexchart type="bar" height='400' :options="chartOptions" :series="series"></apexchart>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card class="pa-3 ma-3 resource-card">
              <apexchart type="donut" height='400' :options="pie.options" :series="pie.series"></apexchart>
            </v-card>
          </v-flex>
        </v-layout>
    </div>
  </div>
</template>
<script>

import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)


export default {
  data: function() {
    return {
      sparklineData: [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46],
      series: [],
      series1: [],
      pie: {
        series: [44, 55, 13, 33],
        options: {
          chart: {
              type: 'donut'
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
              },
              offsetY: -20,
            },
            stroke: {
              colors: undefined
            }
          },
          colors: ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0'],
          title: {
            text: 'Department Sales',
            style: {
              fontSize: '18px'
            }
          },
          series: [21, 23, 19, 14, 6],
          labels: ['Clothing', 'Food Products', 'Electronics', 'Kitchen Utility', 'Gardening'],
          legend: {
            position: 'left',
            offsetY: 80
          }
        }
      },
      chartOptions1: {
        chart: {
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          type: 'solid',
          opacity: 1.0,
        },
        yaxis: {
          min: 0
        },
        colors: ['#DCE6EC'],
        title: {
          text: '$424,652',
          offsetX: 0,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        subtitle: {
          text: 'Sales',
          offsetX: 0,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
          }
        }
      },
      chartOptions: {
        chart: {
          stacked: true
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      }
    }
  },
  methods: {

    randomizeArray (arg) {
      var array = arg.slice();
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

  },
  created() {
    this.series1 = [{
      name: 'series-1',
      data: this.randomizeArray(this.sparklineData)
    }]

    this.series = [{
      name: 'series-1',
      data: this.randomizeArray(this.sparklineData).slice(1, 10)
    },{
      name: 'series-2',
      data: this.randomizeArray(this.sparklineData).slice(1, 10)
    }]
  }
}
</script>