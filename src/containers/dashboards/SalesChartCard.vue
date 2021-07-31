<template>
  <b-card title="Conversões">
    <div class="dashboard-line-chart">
      <line-chart :data="lineChartData" shadow />
    </div>
  </b-card>
</template>
<script>
import LineChart from "../../components/Charts/Line";
import { ThemeColors } from '@/utils'
const colors = ThemeColors()
export default {
  components: {
    "line-chart": LineChart
  },
  props:{
    dataChart:{
      type: Array,
      required: true
    },
    labelsChart:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      lineChartData: {
        labels: this.labelsChart,
        datasets: [
          {
            label: '',
            data: this.dataChart,
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: true
          }
        ]
      }
    };
  },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    }
  }
};
</script>
