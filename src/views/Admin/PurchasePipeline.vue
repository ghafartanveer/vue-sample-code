<template>
  <div class="purchase-pipeline-main-container">
    <div class="dropdown-btn-container">
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

      <button class="add-user-btn">Click to Add User</button>
    </div>

    <h2 class="mt-5 mb-4">
      <i>Purchase Pipeline</i>
    </h2>

    <div>
      <v-data-table
        v-model:page="page"
        :headers="pieplineHeadings"
        :items="pipelineRows"
        :loading="showLoader"
        :items-per-page="itemsPerPage"
        item-value="name"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <div
            class="status-pills"
            :class="item.status == 'Redeemed' ? 'redeemed-status-pill' : 'order-status-pill'"
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
              <!-- >Showing {{ pipelineRows.length - ( (Math.ceil(pipelineRows.length/itemsPerPage) - page) * 10 )}} of {{pipelineRows.length}} Entries</p> -->
              <p class="footer-pipeline-text">Showing 10 of {{pipelineRows.length}} Entries</p>
            </div>
            <div class="data-table-footer-pagination">
              <v-pagination
                v-model="page"
                :length="Math.ceil(pipelineRows.length/itemsPerPage)"
                :total-visible="3"
              ></v-pagination>
            </div>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
  components: { VDataTable },
  setup() {
    let currentAccountType = ref("All");
    let allAccountTypes = ref(["All", "Ordered", "Redeemed"]);

    let page = ref(1);
    let itemsPerPage = ref(10);

    let pieplineHeadings = ref([
      {
        align: "center",
        sortable: false,
        title: "Company",
        key: "company"
      },
      {
        align: "center",
        sortable: false,
        title: "Order Date",
        key: "orderDate"
      },
      {
        align: "center",
        sortable: false,
        title: "Recipint Name",
        key: "recipintName"
      },
      { align: "center", sortable: false, title: "Order Id", key: "orderId" },
      { align: "center", sortable: false, title: "Merchant", key: "merchant" },
      { align: "center", sortable: false, title: "Amount", key: "amount" },

      { align: "center", sortable: false, title: "Status", key: "status" },
      {
        align: "center",
        sortable: false,
        title: "",
        key: "editButton"
      }
    ]);

    let pipelineRows = ref([
      {
        company: "TechGenius",
        orderDate: "12/01/2022",
        recipintName: "Sophia Green",
        orderId: "67438",
        merchant: "Tanya",
        amount: "$12",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        orderDate: "09/20/2023",
        recipintName: "Michael Black",
        orderId: "234234",
        merchant: "Jason",
        amount: "$52",
        status: "Redeemed"
      },
      {
        company: "TechSolutions",
        orderDate: "04/10/2023",
        recipintName: "William Brown",
        orderId: "275645",
        merchant: "Benedict",
        amount: "$23",
        status: "Redeemed"
      },
      {
        company: "FutureTech",
        orderDate: "11/25/2022",
        recipintName: "Ava Johnson",
        orderId: "254635",
        merchant: "Le Roy",
        amount: "$78",
        status: "Ordered"
      },
      {
        company: "CodeMasters",
        orderDate: "06/17/2023",
        recipintName: "David White",
        orderId: "263454",
        merchant: "Megan",
        amount: "$45",
        status: "Redeemed"
      },
      {
        company: "TechGenius",
        orderDate: "12/01/2022",
        recipintName: "Sophia Green",
        orderId: "463355",
        merchant: "Rachel",
        amount: "$12",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        orderDate: "09/20/2023",
        recipintName: "Michael Black",
        orderId: "235522",
        merchant: "Michel",
        amount: "$87",
        status: "Redeemed"
      },
      {
        company: "InnoSys",
        orderDate: "02/28/2023",
        recipintName: "Olivia Davis",
        orderId: "234235",
        merchant: "Doug",
        amount: "$92",
        status: "Redeemed"
      },
      {
        company: "NewTech",
        orderDate: "07/15/2023",
        recipintName: "James White",
        orderId: "032844",
        merchant: "John",
        amount: "$53",
        status: "Ordered"
      },
      {
        company: "Data Innovations",
        orderDate: "03/05/2023",
        recipintName: "Emily Brown",
        orderId: "923043",
        merchant: "Arthur",
        amount: "$14",
        status: "Redeemed"
      },
      {
        company: "TechCorp",
        orderDate: "10/08/2022",
        recipintName: "John Smith",
        orderId: "235423",
        merchant: "Morgan",
        amount: "$74",
        status: "Ordered"
      },
      {
        company: "Apex Solutions",
        orderDate: "05/12/2023",
        recipintName: "Sarah Johnson",
        orderId: "324235",
        merchant: "Antonio",
        amount: "$69",
        status: "Redeemed"
      },
      {
        company: "NewTech",
        orderDate: "07/15/2023",
        recipintName: "James White",
        orderId: "090302",
        merchant: "Natasha",
        amount: "$42",
        status: "Ordered"
      },
      {
        company: "Data Innovations",
        orderDate: "03/05/2023",
        recipintName: "Emily Brown",
        orderId: "349494",
        merchant: "Zeeshan",
        amount: "$19",
        status: "Redeemed"
      },
      {
        company: "TechCorp",
        orderDate: "10/08/2022",
        recipintName: "John Smith",
        orderId: "029423",
        merchant: "Haider",
        amount: "$23",
        status: "Ordered"
      },
      {
        company: "Apex Solutions",
        orderDate: "05/12/2023",
        recipintName: "Sarah Johnson",
        orderId: "385720",
        merchant: "Murphy",
        amount: "$35",
        status: "Redeemed"
      },
      {
        company: "TechSolutions",
        orderDate: "04/10/2023",
        recipintName: "William Brown",
        orderId: "492924",
        merchant: "Doug",
        amount: "$63",
        status: "Redeemed"
      },
      {
        company: "FutureTech",
        orderDate: "11/25/2022",
        recipintName: "Ava Johnson",
        orderId: "294321",
        merchant: "James",
        amount: "$13",
        status: "Ordered"
      },
      {
        company: "CodeMasters",
        orderDate: "06/17/2023",
        recipintName: "David White",
        orderId: "494935",
        merchant: "Gordon",
        amount: "$24",
        status: "Redeemed"
      },
      {
        company: "TechGenius",
        orderDate: "12/01/2022",
        recipintName: "Sophia Green",
        orderId: "582821",
        merchant: "Ramsey",
        amount: "$56",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        orderDate: "09/20/2023",
        recipintName: "Michael Black",
        orderId: "499305",
        merchant: "Daniel",
        amount: "$89",
        status: "Redeemed"
      },
      {
        company: "TechSolutions",
        orderDate: "04/10/2023",
        recipintName: "William Brown",
        orderId: "328432",
        merchant: "Ahmad",
        amount: "$14",
        status: "Redeemed"
      },
      {
        company: "FutureTech",
        orderDate: "11/25/2022",
        recipintName: "Ava Johnson",
        orderId: "193942",
        merchant: "Ali",
        amount: "$70",
        status: "Ordered"
      },
      {
        company: "CodeMasters",
        orderDate: "06/17/2023",
        recipintName: "David White",
        orderId: "193021",
        merchant: "Zubair",
        amount: "$87",
        status: "Redeemed"
      },
      {
        company: "TechGenius",
        orderDate: "12/01/2022",
        recipintName: "Sophia Green",
        orderId: "320521",
        merchant: "Doug",
        amount: "$76",
        status: "Ordered"
      },
      {
        company: "GigaCorp",
        orderDate: "09/20/2023",
        recipintName: "Michael Black",
        orderId: "248430",
        merchant: "Arthur",
        amount: "$67",
        status: "Redeemed"
      },
      {
        company: "InnoSys",
        orderDate: "02/28/2023",
        recipintName: "Olivia Davis",
        orderId: "234231",
        merchant: "Morgan",
        amount: "$86",
        status: "Redeemed"
      },
      {
        company: "NewTech",
        orderDate: "07/15/2023",
        recipintName: "James White",
        orderId: "324233",
        merchant: "Dutch",
        amount: "$25",
        status: "Ordered"
      },
      {
        company: "Data Innovations",
        orderDate: "03/05/2023",
        recipintName: "Emily Brown",
        orderId: "250032",
        merchant: "Marston",
        amount: "$89",
        status: "Redeemed"
      },
      {
        company: "TechCorp",
        orderDate: "10/08/2022",
        recipintName: "John Smith",
        orderId: "468965",
        merchant: "Molly",
        amount: "$56",
        status: "Ordered"
      },
      {
        company: "Apex Solutions",
        orderDate: "05/12/2023",
        recipintName: "Sarah Johnson",
        orderId: "438945",
        merchant: "Django",
        amount: "$45",
        status: "Redeemed"
      }
    ]);

    // let totalRecords = pipelineRows.length;
    // const recordCount = computed(() => {
    //   let currentRecords = page * itemsPerPage;
    //   return totalRecords - currentRecords;
    // });

    // let totalPages = computed(() => {
    //   return Math.ceil(pipelineRows.length / itemsPerPage.value);
    // });

    let showLoader = ref(false);

    const getRecordCount = () => {
      return 12;
    };

    return {
      currentAccountType,
      allAccountTypes,
      page,
      itemsPerPage,
      pieplineHeadings,
      pipelineRows,
      // totalPages,
      // totalRecords,
      // recordCount,
      getRecordCount,
      showLoader
    };
  }
};
</script>

<style lang="css">
.client-account-body .v-autocomplete .v-field.v-field {
  border-radius: 12px;
}

.purchase-pipeline-main-container
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

.purchase-pipeline-main-container .v-data-table-header__content span {
  font-size: 16px;
}

.purchase-pipeline-main-container .v-table.v-data-table {
  border-radius: 12px;
}

.purchase-pipeline-main-container
  .v-table
  .v-table__wrapper
  > table
  > tbody
  > tr
  > td {
  /* padding: 24px 16px; */
  padding: 0px 16px;
}

.purchase-pipeline-main-container
  nav.v-pagination
  .v-btn--icon.v-btn--density-default {
  height: 30px;
  width: 30px;
}

.purchase-pipeline-main-container .v-pagination__item,
.v-pagination__first,
.v-pagination__prev,
.v-pagination__next,
.v-pagination__last {
  margin: 0.1rem;
}
</style>

<style lang="css" scoped>
.purchase-pipeline-main-container {
  background: #ede7e2;
  height: calc(100% - 56px);
  padding: 28px 14px 12px 24px;
}

.dropdown-btn-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.client-account-container {
  min-width: 300px;
  width: 400px;
  border-radius: 8px;
}

.client-account-container p.client-account-title {
  padding: 8px 0px 4px 16px;
  font-size: 18px;
}

.client-account-header {
  background: #9a8762;
  color: #ffffff;
  border-radius: 10px 10px 0px 0px;
}

.client-account-body {
  background: #ffffff;
  /* color: ; */
  padding: 16px 20px 8px 20px;
  border-radius: 0px 0px 10px 10px;
}

.add-user-btn {
  background: #9a8762;
  color: #ffffff;
  border-radius: 8px;
  padding: 8px 16px;
  max-height: 44px;
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

.table-edit-btn {
  color: #797979;
  font-weight: 500;
  font-style: italic;
}

.data-table-footer-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px 10px 28px;
}

.footer-pipeline-text {
  font-size: 14px;
  color: #a0a6b7;
}

@media only screen and (min-width: 1200px) {
  .status-pills {
    border-radius: 16px;
    padding: 4px 0px;
  }
}
</style>