<script setup lang="ts">
import type { Row } from '~/types';

const client = useSupabaseClient();
const props = defineProps<{
  shortened_urls: Row[];
}>();
const updatedList = ref<Row[]>(props.shortened_urls);

async function deleteRow(row: Row) {
  try {

    const { data, error } = await client
      .from('shortened_urls')
      .delete()
      .eq('url_id', row.url_id);

      updatedList.value = updatedList.value.filter(item => item.url_id !== row.url_id);
  
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
watch(() => props.shortened_urls, (newUrls) => {
  updatedList.value = newUrls;
});
</script>

<template>
  <div class="table-container">
    <table class="responsive-table">
      <thead>
        <tr>
          <th>Original URL</th>
          <th>Shortened URL</th>
          <th>Creation Date</th>
          <th>Clicks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in updatedList" :key="url.url_id">
          <td class="w-12 overflow-hidden max-w-96">{{ url.long_url }}</td>
          <td>
            <NuxtLink :to="url.short_url">{{ url.short_url }}</NuxtLink>
          </td>
          <td>{{ new Date(url.creation_date).toLocaleDateString() }}</td>
          <td>{{ url.usage_count }}</td>
          <td>
            <button @click="deleteRow(url)">X</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
}

.responsive-table th,
.responsive-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.responsive-table th {
  background-color: #037516;
  color: white;
}

.responsive-table tr:hover {
  background-color: #cecece;
}

@media (max-width: 600px) {
  .responsive-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .responsive-table thead,
  .responsive-table tbody,
  .responsive-table th,
  .responsive-table td,
  .responsive-table tr {
    display: block;
  }

  .responsive-table th {
    text-align: left;
  }

  .responsive-table td {
    border-top: none;
  }

  .responsive-table td:before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }
}
</style>
