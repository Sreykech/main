<template>
  <div id="app">
    <Header />
    <div class="system-body flex flex-row ">
      <div class="sidebar-overlay"></div>
      <div class="sidebar-wrap p-3 bg-[#f1f1f1]">
        <Sidebar />
      </div>
      <div class="max-w-full grow">
        <div class="container mx-auto">
          <div class="flex gap-4 pt-6 title_bar items-center px-2">
            <i class="pi pi-align-left font-bold" @click="sidbarToggle"></i>
            <h1 class="font-bold">Dashboard</h1>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-x-2 px-2 mt-6">
            <div class="">
              <Panel class="dashboad-key-figure">
                <template #header>
                  <h2 class="font-semibold m-0">15</h2>
                </template>
                <p>Total Sales</p>
                <template #footer>
                  <router-link
                    class="lmk-dsh-btn bg-[#7BE0B6] rounded-b w-full py-1 font-semibold text-white flex flex-wrap items-center justify-center gap-4 "
                    to="/sales" target="_blank" rel="noopener">
                    More Info <i class="fa-solid fa-arrow-right"></i>
                  </router-link>
                </template>
              </Panel>
            </div>
            <div class="">
              <Panel class="dashboad-key-figure">
                <template #header>
                  <h2 class="font-semibold m-0">56</h2>
                </template>
                <p>Total Products</p>
                <template #footer>
                  <router-link
                    class="lmk-dsh-btn bg-[#6CB5FC] rounded-b w-full py-1 font-semibold text-white flex flex-wrap items-center justify-center gap-4 "
                    to="/sales" target="_blank" rel="noopener">
                    More Info <i class="fa-solid fa-arrow-right"></i>
                  </router-link>
                </template>
              </Panel>
            </div>
            <div class="">
              <Panel class="dashboad-key-figure">
                <template #header>
                  <h2 class="font-semibold m-0">23</h2>
                </template>
                <p>Total Customers</p>
                <template #footer>
                  <router-link
                    class="lmk-dsh-btn bg-[#50DAE2] rounded-b w-full py-1 font-semibold text-white flex flex-wrap items-center justify-center gap-4 "
                    to="/sales" target="_blank" rel="noopener">
                    More Info <i class="fa-solid fa-arrow-right"></i>
                  </router-link>
                </template>
              </Panel>
            </div>
            <div class="">
              <Panel class="dashboad-key-figure">
                <template #header>
                  <h2 class="font-semibold m-0">4</h2>
                </template>
                <p>Total Users</p>
                <template #footer>
                  <router-link
                    class="lmk-dsh-btn bg-[#FD7777] rounded-b w-full py-1 font-semibold text-white flex flex-wrap items-center justify-center gap-4 "
                    to="/sales" target="_blank" rel="noopener">
                    More Info <i class="fa-solid fa-arrow-right"></i>
                  </router-link>
                </template>
              </Panel>
            </div>
          </div>

          <!-- Charts -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 dsh_graphs py-6">
            <div class="">
              <Panel class="graph-pie">
                <template #header>
                  <div class="card">
                    <Chart type="doughnut" :data="chartDataPie" :options="chartOptionsPie" class="h-[300px]"  />
                </div>
                </template>
              </Panel>
            </div>

            <div class="">
              <Panel class="graph-bar">
                <template #header>
                  <div class="card flex justify-center w-10/12">
                    <Chart type="bar" :data="chartDataBar" :options="chartOptionsBar" class="w-full h-[300px]" />
                  </div>
                </template>
              </Panel>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


export default {
  name: "Home",
  components: {

  },
  mounted() {




  }
};
</script>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  chartDataPie.value = setChartDataPie();
  chartOptionsPie.value = setChartOptionsPie();
});

const chartDataPie = ref();
const chartOptionsPie = ref(null);

const setChartDataPie = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
      }
    ]
  };
};

const setChartOptionsPie = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor
        }
      }
    }
  };
};


onMounted(() => {
  chartDataBar.value = setChartDataBar();
  chartOptionsBar.value = setChartOptionsBar();
});

const chartDataBar = ref();
const chartOptionsBar = ref(null);

const setChartDataBar = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Value',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
};
function sidbarToggle() {
    let sidebarOverlay = document.getElementsByClassName("sidebar-overlay")[0];
    let sidebarWrap = document.getElementsByClassName("sidebar-wrap")[0];

    if (sidebarOverlay) {
      sidebarOverlay.classList.add("active");
    }

    if (sidebarWrap) {
      sidebarWrap.classList.add("active");
    }
  }
const setChartOptionsBar = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}
</script>