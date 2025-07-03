<template>
  <div class="agent-list">
    <h2>All Agents</h2>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="agent in agents" :key="agent.id">
          <td>{{ agent.firstName }}</td>
          <td>{{ agent.lastName }}</td>
          <td>{{ agent.email }}</td>
          <td>{{ agent.mobileNumber }}</td>
          <td>
            <button @click="editAgent(agent)">Edit</button>
            <button @click="deleteAgent(agent.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AgentForm v-if="editingAgent" :agent="editingAgent" @saved="onAgentSaved" @cancel="cancelEdit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import AgentForm from "./AgentForm.vue";

export default defineComponent({
  name: "AgentList",
  components: { AgentForm },
  setup() {
    const agents = ref<any[]>([]);
    const editingAgent = ref<any | null>(null);

    const fetchAgents = async () => {
      const response = await axios.get("http://localhost:3000/agents");
      agents.value = response.data;
    };

    const deleteAgent = async (id: string) => {
      if (!confirm("Are you sure you want to delete this agent?")) return;
      await axios.delete(`http://localhost:3000/agents/${id}`);
      await fetchAgents();
    };

    const editAgent = (agent: any) => {
      console.log(agent);
      
      editingAgent.value = { ...agent }; // pass a copy
    };

    const onAgentSaved = async () => {
      editingAgent.value = null;
      await fetchAgents();
    };

    const cancelEdit = () => {
      editingAgent.value = null;
    };

    onMounted(fetchAgents);

    return {
      agents,
      deleteAgent,
      editAgent,
      editingAgent,
      onAgentSaved,
      cancelEdit
    };
  },
});
</script>

<style scoped>
.agent-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.agent-list th, td {
  padding: 8px;
  border: 1px solid #ddd;
}
.agent-list button {
  margin-right: 6px;
}
</style>
