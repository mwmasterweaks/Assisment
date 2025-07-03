<template>
  <form @submit.prevent="submitAgent" class="agent-form">
    <h2>{{ localAgent.id ? 'Update Agent' : 'Create Agent' }}</h2>

    <input v-model="localAgent.firstName" placeholder="First Name" required />
    <input v-model="localAgent.lastName" placeholder="Last Name" required />
    <input v-model="localAgent.email" placeholder="Email" type="email" required />
    <input v-model="localAgent.mobileNumber" placeholder="Mobile Number" required />

    <button type="submit">{{ localAgent.id ? 'Update' : 'Save' }}</button>
    <button type="button" @click="$emit('cancel')">Cancel</button>
  </form>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AgentForm",
  props: {
    agent: Object,
  },
  setup(props, { emit }) {
    const localAgent = ref({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "", 
    });

    // Watch for changes in the prop and clone it to localAgent
    watch(
      () => props.agent,
      (newAgent) => {
        if (newAgent) {
          localAgent.value = { ...newAgent };
        }
      },
      { immediate: true }
    );

    const submitAgent = async () => {
      try {
        if (localAgent.value.id) {
          // UPDATE
          await axios.put(`http://localhost:3000/agents/${localAgent.value.id}`, localAgent.value);
          alert("Agent updated successfully!");
        } else {
          // CREATE
          await axios.post("http://localhost:3000/agents", localAgent.value);
          alert("Agent created successfully!");
        }

        emit("saved");
      } catch (err) {
        console.error(err);
        const message =
          err.response?.data?.message || "Failed to save agent.";
        alert(`Error: ${message}`);
      }
    };

    return {
      localAgent,
      submitAgent,
    };
  },
});
</script>

<style scoped>
.agent-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 20px auto;
}
</style>
