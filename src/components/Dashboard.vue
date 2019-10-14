<template>
  <div>
    <div class='mt-3'>
      <!--<v-row wrap>
        <v-col cols="12" xs="12" md="4">
          <q-card class="pa-3">
            <apexchart :options="chartOptions1" :series="series1"></apexchart>
          </q-card>
        </v-col>

        <v-col cols="12" xs="12" md="4">
          <q-card class="pa-3">
            <apexchart :options="chartOptions1" :series="series1" ></apexchart>
          </q-card>
        </v-col>

        <v-col cols="12" xs="12" md="4">
          <q-card class="pa-3">
            <apexchart :options="chartOptions1" :series="series1"></apexchart>
          </q-card>
        </v-col>

        <v-col cols="12" md="6" sm="12" >
          <q-card class="pa-3">
            <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
          </q-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <q-card class="pa-3">
            <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
          </q-card>
        </v-col>
      </v-row>-->
    </div>
  </div>
</template>
<script>

import { container } from '@quartz/core'
import ServiceItem from './Services/ServiceItem'



export default {
  components: {
    ServiceItem,
  },
  data: function() {
    return {
      services: [],
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

    canShow (service) {
      return parseInt(container.get('settings').get('app.services.show.' + service.name, 0))
    },
    retrieveServices () {
      return container.get('$quartz.view.services').filter((val) => {
        return this.canShow(val);
      }).sort((a, b) => {
        return a.name > b.name;
      })
    },
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