<script lang="ts" setup>
  import PanelLayout from "@/components/layouts/PanelLayout.vue";
  import {onMounted, ref} from "vue";
  import {FwbButton, FwbInput, FwbRadio, FwbSelect, FwbTextarea} from "flowbite-vue";

  onMounted(() => {
    document.title = "Leave feedback";
  });
  
  interface Message {
    name: string, 
    email: string,
    message: string,
    reportType: string,
    priority: string,
    phone: string
  }

  const form = ref<Message>({
    name: '',
    email: '',
    message: '',
    reportType: '',
    priority: '',
    phone: ''
  });
  
  let edited: Message = null;
  
  const reports = ref<any[]>(JSON.parse(localStorage.getItem("feedback")) as any[] ?? []);

  const reportTypes = [
    { value: "Bug Report", name: "Bug Report" },
    { value: "Feature Request", name: "Feature Request" },
    { value: "General Feedback", name: "General Feedback" },  
  ];
  const priorities = ['Low', 'Medium', 'High'];
  const submitted = ref<boolean>(false);

  let submitForm = () => {
    let valid = true;
    
    if (form.value.priority === "" || form.value.priority === null) {
      document.getElementById("priority-required").style.display = "block";
      valid = false;
    } else {
      document.getElementById("priority-required").style.display = "none";
    }

    if (form.value.reportType === "" || form.value.reportType === null) {
      document.getElementById("type-required").style.display = "block";
      valid = false;
    } else {
      document.getElementById("type-required").style.display = "none";
    }
    
    if (!valid) {
      return;
    }
    
    const confirmed = confirm(`Is the data proper?\n` +
    `Name: ${form.value.name}\n` +
    `Email: ${form.value.email}\n` +
    `Telephone: ${form.value.phone}\n` +
    `Message: ${form.value.message}\n` +
    `Type: ${form.value.reportType}\n` +
    `Priority: ${form.value.priority}\n`);
    
    if (!confirmed) {
      return;
    }

    submitted.value = true;
    
    if (edited !== null) {
      reports.value = reports.value.map(obj => obj === edited ? form.value : obj);
      edited = null;
    }
    else {
      reports.value = [...reports.value, form.value];
    }

    localStorage.setItem("feedback", JSON.stringify(reports.value));
  };
  
  let removeItem = (item: Message) => {
    reports.value = reports.value.filter(i => i !== item);
  };
  
  let editItem = (item: Message) => {
    form.value = { ...item };
    edited = item;
  };
  
  let cancel = () => {
    form.value = {
      name: '',
      email: '',
      message: '',
      reportType: '',
      priority: '',
      phone: ''
    };
    
    edited = null;
  };
</script>

<template>
  <PanelLayout>
    <div class="bg-slate-700 p-4">
      <h2 class="text-2xl font-semibold mb-4">Feedback</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name of reporting person</label>
          <fwb-input v-model="form.name" id="name" type="text" required pattern="^[A-Za-z]+([ '\-][A-Za-z]+)*$" />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <fwb-input v-model="form.email" id="email" type="email" required />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Phone number</label>
          <fwb-input v-model="form.phone" id="email" type="tel" pattern="[0-9]{9}" required />
        </div>

        <div class="mb-4">
          <fwb-textarea v-model="form.message" label="Message" id="message" required />
        </div>
        
        <div class="mb-4">
          <fwb-select v-model="form.reportType" :options="reportTypes" label="Report Type" required />
          <span id="type-required" class="text-red-500 text-sm font-bold" style="display: none;">This field is required!</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Priority</label>
          <div class="mt-2 flex justify-around">
            <fwb-radio 
                v-model="form.priority" 
                v-for="priority in priorities" 
                :key="priority" 
                :value="priority" 
                id="priority-{{ priority }}" 
                :label="priority" 
                name="priority"
                required
            />
          </div>
          <span id="priority-required" class="text-red-500 text-sm font-bold" style="display: none;">This field is required!</span>
        </div>

        <div class="space-x-2">
          <fwb-button>Submit</fwb-button>
          <fwb-button v-on:click.prevent="cancel">Cancel</fwb-button>
        </div>
      </form>
    </div>
    <br>
    <div class="bg-slate-700 p-4 space-y-2">
      <h2 class="text-2xl font-semibold mb-4">Submitted feedback</h2>
      <div class="bg-slate-600 p-4" v-for="item in reports" :key="item">
        <div>Name: {{ item.name }}</div>
        <div>Email: {{ item.email }}</div>
        <div>Telephone Number: {{ item.phone }}</div>
        <div>Message: {{ item.message }}</div>
        <div>Report type: {{ item.reportType }}</div>
        <div>Priority: {{ item.priority }}</div>
        <div class="space-x-2">
          <fwb-button v-on:click.prevent="editItem(item)">Edit</fwb-button>
          <fwb-button v-on:click.prevent="removeItem(item)">Delete</fwb-button>
        </div>
      </div>
    </div>
  </PanelLayout>
</template>

<style scoped>

</style>