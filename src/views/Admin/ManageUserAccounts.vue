<template>
  <div class="user-accounts-main-container">
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
      <i>User Accounts</i>
    </h2>

    <div>
      <v-data-table
        v-model:page="page"
        :headers="accountHeadings"
        :items="accountRows"
        :loading="showLoader"
        :items-per-page="itemsPerPage"
        item-value="name"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <div
            class="status-pills"
            :class="item.status == 'Active' ? 'active-status-pill' : 'overdue-status-pill'"
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
              <!-- >Showing {{ accountRows.length - ( (Math.ceil(accountRows.length/itemsPerPage) - page) * 10 )}} of {{accountRows.length}} Entries</p> -->
              <p class="footer-count-text">Showing 10 of {{accountRows.length}} Entries</p>
            </div>
            <div class="data-table-footer-pagination">
              <v-pagination
                v-model="page"
                :length="Math.ceil(accountRows.length/itemsPerPage)"
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
    let allAccountTypes = ref(["All", "Active", "Overdue"]);

    let page = ref(1);
    let itemsPerPage = ref(10);

    let accountHeadings = ref([
      {
        align: "center",
        sortable: false,
        title: "Company",
        key: "company"
      },
      {
        align: "center",
        sortable: false,
        title: "Start Date",
        key: "startDate"
      },
      {
        align: "center",
        sortable: false,
        title: "Client Name",
        key: "clientName"
      },
      { align: "center", sortable: false, title: "Email", key: "email" },
      { align: "center", sortable: false, title: "Status", key: "status" },
      {
        align: "center",
        sortable: false,
        title: "",
        key: "editButton"
      }
    ]);

    let accountRows = ref([
      {
        company: "Apex Solutions",
        startDate: "05/12/2023",
        clientName: "Sarah Johnson",
        email: "sarah.j@apexsolutions.com",
        status: "Active"
      },
      {
        company: "TechCorp",
        startDate: "10/08/2022",
        clientName: "John Smith",
        email: "john.smith@techcorp.com",
        status: "Overdue"
      },
      {
        company: "Data Innovations",
        startDate: "03/05/2023",
        clientName: "Emily Brown",
        email: "emily.brown@datainnovations.com",
        status: "Active"
      },
      {
        company: "NewTech",
        startDate: "07/15/2023",
        clientName: "James White",
        email: "james.white@newtech.com",
        status: "Overdue"
      },
      {
        company: "InnoSys",
        startDate: "02/28/2023",
        clientName: "Olivia Davis",
        email: "olivia.davis@innosys.com",
        status: "Active"
      },
      {
        company: "GigaCorp",
        startDate: "09/20/2023",
        clientName: "Michael Black",
        email: "michael.black@gigacorp.com",
        status: "Active"
      },
      {
        company: "TechGenius",
        startDate: "12/01/2022",
        clientName: "Sophia Green",
        email: "sophia.green@techgenius.com",
        status: "Overdue"
      },
      {
        company: "CodeMasters",
        startDate: "06/17/2023",
        clientName: "David White",
        email: "david.white@codemasters.com",
        status: "Active"
      },
      {
        company: "FutureTech",
        startDate: "11/25/2022",
        clientName: "Ava Johnson",
        email: "ava.johnson@futuretech.com",
        status: "Overdue"
      },
      {
        company: "TechSolutions",
        startDate: "04/10/2023",
        clientName: "William Brown",
        email: "william.brown@techsolutions.com",
        status: "Active"
      },
      {
        company: "GigaCorp",
        startDate: "09/20/2023",
        clientName: "Michael Black",
        email: "michael.black@gigacorp.com",
        status: "Active"
      },
      {
        company: "TechGenius",
        startDate: "12/01/2022",
        clientName: "Sophia Green",
        email: "sophia.green@techgenius.com",
        status: "Overdue"
      },
      {
        company: "CodeMasters",
        startDate: "06/17/2023",
        clientName: "David White",
        email: "david.white@codemasters.com",
        status: "Active"
      },
      {
        company: "FutureTech",
        startDate: "11/25/2022",
        clientName: "Ava Johnson",
        email: "ava.johnson@futuretech.com",
        status: "Overdue"
      },
      {
        company: "TechSolutions",
        startDate: "04/10/2023",
        clientName: "William Brown",
        email: "william.brown@techsolutions.com",
        status: "Active"
      },
      {
        company: "Apex Solutions",
        startDate: "05/12/2023",
        clientName: "Sarah Johnson",
        email: "sarah.j@apexsolutions.com",
        status: "Active"
      },
      {
        company: "TechCorp",
        startDate: "10/08/2022",
        clientName: "John Smith",
        email: "john.smith@techcorp.com",
        status: "Overdue"
      },
      {
        company: "Data Innovations",
        startDate: "03/05/2023",
        clientName: "Emily Brown",
        email: "emily.brown@datainnovations.com",
        status: "Active"
      },
      {
        company: "NewTech",
        startDate: "07/15/2023",
        clientName: "James White",
        email: "james.white@newtech.com",
        status: "Overdue"
      },
      {
        company: "Apex Solutions",
        startDate: "05/12/2023",
        clientName: "Sarah Johnson",
        email: "sarah.j@apexsolutions.com",
        status: "Active"
      },
      {
        company: "TechCorp",
        startDate: "10/08/2022",
        clientName: "John Smith",
        email: "john.smith@techcorp.com",
        status: "Overdue"
      },
      {
        company: "Data Innovations",
        startDate: "03/05/2023",
        clientName: "Emily Brown",
        email: "emily.brown@datainnovations.com",
        status: "Active"
      },
      {
        company: "NewTech",
        startDate: "07/15/2023",
        clientName: "James White",
        email: "james.white@newtech.com",
        status: "Overdue"
      },
      {
        company: "InnoSys",
        startDate: "02/28/2023",
        clientName: "Olivia Davis",
        email: "olivia.davis@innosys.com",
        status: "Active"
      },
      {
        company: "GigaCorp",
        startDate: "09/20/2023",
        clientName: "Michael Black",
        email: "michael.black@gigacorp.com",
        status: "Active"
      },
      {
        company: "TechGenius",
        startDate: "12/01/2022",
        clientName: "Sophia Green",
        email: "sophia.green@techgenius.com",
        status: "Overdue"
      },
      {
        company: "CodeMasters",
        startDate: "06/17/2023",
        clientName: "David White",
        email: "david.white@codemasters.com",
        status: "Active"
      },
      {
        company: "FutureTech",
        startDate: "11/25/2022",
        clientName: "Ava Johnson",
        email: "ava.johnson@futuretech.com",
        status: "Overdue"
      },
      {
        company: "TechSolutions",
        startDate: "04/10/2023",
        clientName: "William Brown",
        email: "william.brown@techsolutions.com",
        status: "Active"
      },
      {
        company: "GigaCorp",
        startDate: "09/20/2023",
        clientName: "Michael Black",
        email: "michael.black@gigacorp.com",
        status: "Active"
      },
      {
        company: "TechGenius",
        startDate: "12/01/2022",
        clientName: "Sophia Green",
        email: "sophia.green@techgenius.com",
        status: "Overdue"
      }
    ]);

    // let totalRecords = accountRows.length;
    // const recordCount = computed(() => {
    //   let currentRecords = page * itemsPerPage;
    //   return totalRecords - currentRecords;
    // });

    // let totalPages = computed(() => {
    //   return Math.ceil(accountRows.length / itemsPerPage.value);
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
      accountHeadings,
      accountRows,
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

.user-accounts-main-container
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

.user-accounts-main-container .v-data-table-header__content span {
  font-size: 16px;
}

.user-accounts-main-container .v-table.v-data-table {
  border-radius: 12px;
}

.user-accounts-main-container
  .v-table
  .v-table__wrapper
  > table
  > tbody
  > tr
  > td {
  /* padding: 24px 16px; */
  padding: 0px 16px;
}

.user-accounts-main-container
  nav.v-pagination
  .v-btn--icon.v-btn--density-default {
  height: 30px;
  width: 30px;
}

.user-accounts-main-container .v-pagination__item,
.v-pagination__first,
.v-pagination__prev,
.v-pagination__next,
.v-pagination__last {
  margin: 0.1rem;
}
</style>

<style lang="css" scoped>
.user-accounts-main-container {
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

.active-status-pill {
  background: #e1f2e5;
  color: #34a853;
}

.overdue-status-pill {
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

.footer-count-text {
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