<template>
  <div class="admin-dashboard-main-container">
    <div class="graph-client-container">
      <v-row>
        <v-col cols="12" lg="8">
          <div class="gift-graph-container">
            <div class="gift-graph-header">
              <p class="gift-graph-title">Amount Gifted</p>
            </div>
            <div class="gift-graph-body">
              <v-img :src="require('../../assets/static-imgs/Graph.png')"></v-img>
            </div>
          </div>
        </v-col>

        <v-col cols="12" lg="4" class="client-info-containers">
          <div class="client-account-container">
            <div class="client-account-header">
              <p class="client-account-title">Client Account</p>
            </div>
            <div class="client-account-body">
              <v-autocomplete
                v-model="currentAccountType"
                :items="allAccountTypes"
                variant="outlined"
                prepend-inner-icon="mdi-account-outline"
                auto-select-first
              >
                <!-- <template #append-inner="{ on }">
            <v-icon v-on="on">mdi-account</v-icon>
                </template>-->
              </v-autocomplete>
            </div>
          </div>

          <div class="client-account-container">
            <div class="client-account-header">
              <p class="client-account-title">Client ID</p>
            </div>
            <div class="client-account-body client-id-container">
              <div>
                <h1>481902</h1>
              </div>
              <div>
                <button class="client-edit-btn-container">Edit</button>
              </div>
            </div>
          </div>

          <div class="client-account-container">
            <div class="client-account-header">
              <p class="client-account-title">Client Balance</p>
            </div>
            <div class="client-account-body client-balance-container">
              <div>
                <h1>$19,550</h1>
              </div>
              <div>
                <button class="client-edit-btn-container">Edit</button>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="history-gifts-btn-container">
      <h2>
        <i>Historical and Upcoming Gifts</i>
      </h2>

      <button class="export-excel-btn">Export to Excel(.csv)</button>
    </div>

    <div>
      <!-- <v-data-table
        v-model:page="pageNumber"
        :headers="dashboardHeadings"
        :items="adminDashboard.getGiftsPerPage"
        :items-per-pageNumber="itemsPerPage"
        :loading="showLoader"
        item-value="name"
        class="elevation-1"
      >-->
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="dashboardHeadings"
        :items-length="adminDashboard.getTotalGiftCount"
        :items="adminDashboard.getGiftsPerPage"
        :loading="adminDashboard.getGiftTableLoader"
        class="elevation-1"
        item-value="name"
      >
        <template v-slot:item.status="{ item }">
          <div
            class="status-pills"
            :class="item.status == 'Redeemed' ?  'redeemed-status-pill' : item.status == 'Ordered' ? 'order-status-pill' : 'delivered-status-pill' "
          >{{ item.status}}</div>
        </template>

        <template v-slot:item.editButton="{ item }">
          <p class="table-edit-btn">Edit</p>
          <!-- <v-icon size="small" class="me-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>-->
        </template>

        <template v-slot:bottom>
          <div class="data-table-footer-row">
            <div class="data-table-footer-count">
              <!-- >Showing {{ dashboardRows.length - ( (Math.ceil(dashboardRows.length/itemsPerPage) - pageNumber) * 10 )}} of {{dashboardRows.length}} Entries</p> -->
              <p
                class="footer-count-text"
              >Showing {{adminDashboard.getGiftCountPerPage}} of {{adminDashboard.getTotalGiftCount}} Entries</p>
            </div>
            <div class="data-table-footer-pagination">
              <v-pagination
                v-model="pageNumber"
                :length="Math.ceil(adminDashboard.getTotalGiftCount/itemsPerPage)"
                :total-visible="3"
                @update:modelValue="handlePaginationUpdate(pageNumber)"
              ></v-pagination>
            </div>
          </div>
        </template>
      </v-data-table-server>
      <!-- </v-data-table> -->
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VDataTableServer } from "vuetify/labs/VDataTable";
import { useAdminDashboard } from "../../store/AdminDashboard";

export default {
  components: { VDataTable, VDataTableServer },
  setup() {
    let currentAccountType = ref("All");
    let allAccountTypes = ref(["All", "Ordered", "Redeemed", "Delivered"]);

    let pageNumber = ref(1);
    let itemsPerPage = ref(10);

    let dashboardHeadings = ref([
      {
        align: "center",
        sortable: false,
        title: "Company",
        key: "company"
      },
      {
        align: "center",
        sortable: false,
        title: "Client",
        key: "client"
      },
      {
        align: "center",
        sortable: false,
        title: "Date",
        key: "date"
      },
      {
        align: "center",
        sortable: false,
        title: "Recipient",
        key: "recipient"
      },
      { align: "center", sortable: false, title: "Country", key: "country" },
      { align: "center", sortable: false, title: "Amount", key: "amount" },

      { align: "center", sortable: false, title: "Status", key: "status" },
      {
        align: "center",
        sortable: false,
        title: "",
        key: "editButton"
      }
    ]);

    let dashboardRows = ref([
      {
        company: "TechGenius",
        date: "12/01/2022",
        client: "Sophia Green",
        country: "Singapore",
        recipient: "Tanya",
        amount: "$12",
        status: "Delivered"
      },
      {
        company: "GigaCorp",
        date: "09/20/2023",
        client: "Michael Black",
        country: "United States",
        recipient: "Jason",
        amount: "$52",
        status: "Redeemed"
      },
      {
        company: "TechSolutions",
        date: "04/10/2023",
        client: "William Brown",
        country: "Canada",
        recipient: "Benedict",
        amount: "$23",
        status: "Delivered"
      },
      {
        company: "FutureTech",
        date: "11/25/2022",
        client: "Ava Johnson",
        country: "United Kingdom",
        recipient: "Le Roy",
        amount: "$78",
        status: "Ordered"
      },
      {
        company: "CodeMasters",
        date: "06/17/2023",
        client: "David White",
        country: "Australia",
        recipient: "Megan",
        amount: "$45",
        status: "Redeemed"
      },
      {
        company: "TechGenius",
        date: "12/01/2022",
        client: "Sophia Green",
        country: "France",
        recipient: "Rachel",
        amount: "$12",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        date: "09/20/2023",
        client: "Michael Black",
        country: "Germany",
        recipient: "Michel",
        amount: "$87",
        status: "Delivered"
      },
      {
        company: "InnoSys",
        date: "02/28/2023",
        client: "Olivia Davis",
        country: "Japan",
        recipient: "Doug",
        amount: "$92",
        status: "Redeemed"
      },
      {
        company: "NewTech",
        date: "07/15/2023",
        client: "James White",
        country: "Brazil",
        recipient: "John",
        amount: "$53",
        status: "Ordered"
      },
      {
        company: "Data Innovations",
        date: "03/05/2023",
        client: "Emily Brown",
        country: "South Korea",
        recipient: "Arthur",
        amount: "$14",
        status: "Redeemed"
      },
      {
        company: "TechCorp",
        date: "10/08/2022",
        client: "John Smith",
        country: "India",
        recipient: "Morgan",
        amount: "$74",
        status: "Delivered"
      },
      {
        company: "Apex Solutions",
        date: "05/12/2023",
        client: "Sarah Johnson",
        country: "Italy",
        recipient: "Antonio",
        amount: "$69",
        status: "Redeemed"
      },
      {
        company: "NewTech",
        date: "07/15/2023",
        client: "James White",
        country: "Spain",
        recipient: "Natasha",
        amount: "$42",
        status: "Ordered"
      },
      {
        company: "Data Innovations",
        date: "03/05/2023",
        client: "Emily Brown",
        country: "Mexico",
        recipient: "Zeeshan",
        amount: "$19",
        status: "Delivered"
      },
      {
        company: "TechCorp",
        date: "10/08/2022",
        client: "John Smith",
        country: "Argentina",
        recipient: "Haider",
        amount: "$23",
        status: "Ordered"
      },
      {
        company: "Apex Solutions",
        date: "05/12/2023",
        client: "Sarah Johnson",
        country: "Russia",
        recipient: "Murphy",
        amount: "$35",
        status: "Redeemed"
      },
      {
        company: "TechSolutions",
        date: "04/10/2023",
        client: "William Brown",
        country: "China",
        recipient: "Doug",
        amount: "$63",
        status: "Delivered"
      },
      {
        company: "FutureTech",
        date: "11/25/2022",
        client: "Ava Johnson",
        country: "Netherlands",
        recipient: "James",
        amount: "$13",
        status: "Ordered"
      },
      {
        company: "CodeMasters",
        date: "06/17/2023",
        client: "David White",
        country: "Sweden",
        recipient: "Gordon",
        amount: "$24",
        status: "Delivered"
      },
      {
        company: "TechGenius",
        date: "12/01/2022",
        client: "Sophia Green",
        country: "Norway",
        recipient: "Ramsey",
        amount: "$56",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        date: "09/20/2023",
        client: "Michael Black",
        country: "Denmark",
        recipient: "Daniel",
        amount: "$89",
        status: "Redeemed"
      },
      {
        company: "TechSolutions",
        date: "04/10/2023",
        client: "William Brown",
        country: "Greece",
        recipient: "Ahmad",
        amount: "$14",
        status: "Delivered"
      },
      {
        company: "FutureTech",
        date: "11/25/2022",
        client: "Ava Johnson",
        country: "Turkey",
        recipient: "Ali",
        amount: "$70",
        status: "Ordered"
      },
      {
        company: "CodeMasters",
        date: "06/17/2023",
        client: "David White",
        country: "Egypt",
        recipient: "Zubair",
        amount: "$87",
        status: "Redeemed"
      },
      {
        company: "TechGenius",
        date: "12/01/2022",
        client: "Sophia Green",
        country: "South Africa",
        recipient: "Doug",
        amount: "$76",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        date: "09/20/2023",
        client: "Michael Black",
        country: "New Zealand",
        recipient: "Arthur",
        amount: "$67",
        status: "Redeemed"
      },
      {
        company: "InnoSys",
        date: "02/28/2023",
        client: "Olivia Davis",
        country: "Switzerland",
        recipient: "Morgan",
        amount: "$86",
        status: "Redeemed"
      },
      {
        company: "NewTech",
        date: "07/15/2023",
        client: "James White",
        country: "Belgium",
        recipient: "Dutch",
        amount: "$25",
        status: "Delivered"
      },
      {
        company: "Data Innovations",
        date: "03/05/2023",
        client: "Emily Brown",
        country: "Portugal",
        recipient: "Marston",
        amount: "$89",
        status: "Redeemed"
      },
      {
        company: "TechCorp",
        date: "10/08/2022",
        client: "John Smith",
        country: "Ireland",
        recipient: "Molly",
        amount: "$56",
        status: "Ordered"
      },
      {
        company: "Apex Solutions",
        date: "05/12/2023",
        client: "Sarah Johnson",
        country: "Finland",
        recipient: "Django",
        amount: "$45",
        status: "Redeemed"
      }
    ]);

    // let totalRecords = accountRows.length;
    // const recordCount = computed(() => {
    //   let currentRecords = pageNumber * itemsPerPage;
    //   return totalRecords - currentRecords;
    // });

    // let totalPages = computed(() => {
    //   return Math.ceil(accountRows.length / itemsPerPage.value);
    // });

    let showLoader = ref(false);
    const adminDashboard = useAdminDashboard();

    const handlePaginationUpdate = async arg => {
      if (typeof arg == "number") {
        await adminDashboard.setGiftsList(arg);
      }
    };

    onMounted(async () => {
      await adminDashboard.setGiftsList(pageNumber.value);
    });

    return {
      currentAccountType,
      allAccountTypes,
      pageNumber,
      itemsPerPage,
      dashboardHeadings,
      dashboardRows,
      showLoader,
      adminDashboard,
      handlePaginationUpdate
    };
  }
};
</script>

<style lang="css">
.client-account-body .v-autocomplete .v-field.v-field {
  border-radius: 12px;
}

.admin-dashboard-main-container
  .v-table--density-default
  > .v-table__wrapper
  > table
  > thead
  > tr
  > th {
  /* height: ; */
  /* padding: 8px 0px 4px 16px; */
  height: 40px;
  background: #9a8762;
  color: #ffffff;
}

.admin-dashboard-main-container .v-data-table-header__content span {
  font-size: 16px;
}

.admin-dashboard-main-container .v-table.v-data-table {
  border-radius: 12px;
}

.admin-dashboard-main-container
  .v-table
  .v-table__wrapper
  > table
  > tbody
  > tr
  > td {
  /* padding: 24px 16px; */
  padding: 0px 16px;
}

.admin-dashboard-main-container
  nav.v-pagination
  .v-btn--icon.v-btn--density-default {
  height: 30px;
  width: 30px;
}

.admin-dashboard-main-container .v-pagination__item,
.v-pagination__first,
.v-pagination__prev,
.v-pagination__next,
.v-pagination__last {
  margin: 0.1rem;
}
</style>

<style lang="css" scoped>
.admin-dashboard-main-container {
  background: #ede7e2;
  height: calc(100% - 56px);
  padding: 28px 14px 12px 24px;
}

.graph-client-container {
  display: flex;
}

.client-info-containers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.gift-graph-container,
.client-account-container {
  min-width: 300px;
  /* width: 400px; */
  border-radius: 8px;
}

.gift-graph-container p.gift-graph-title,
.client-account-container p.client-account-title {
  padding: 8px 0px 4px 16px;
  font-size: 18px;
}

.gift-graph-header,
.client-account-header {
  background: #9a8762;
  color: #ffffff;
  border-radius: 10px 10px 0px 0px;
}

.gift-graph-body,
.client-account-body {
  background: #ffffff;
  /* color: ; */
  padding: 16px 20px 8px 20px;
  border-radius: 0px 0px 10px 10px;
}

.client-id-container,
.client-balance-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.client-id-container h1 {
  font-weight: 400;
}

.client-balance-container h1 {
  font-weight: 400;
  color: #818181;
}

.client-edit-btn-container {
  background: #9a8762;
  color: #ffffff;
  padding: 0px 16px;
  font-size: 28px;
  border-radius: 4px;
}

.history-gifts-btn-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 16px 0px;
  align-items: center;
}

.export-excel-btn {
  background: #9a8762;
  color: #ffffff;
  border-radius: 6px;
  padding: 10px 8px;
}

.data-table-footer-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px 10px 28px;
}

.status-pills {
  border-radius: 16px;
  padding: 4px 16px;
}

.redeemed-status-pill {
  background: #e1f2e5;
  color: #34a853;
}

.order-status-pill {
  background: #fff0df;
  color: #fbbc05;
}

.delivered-status-pill {
  background: #e3edfd;
  color: #4285f4;
}
</style>

