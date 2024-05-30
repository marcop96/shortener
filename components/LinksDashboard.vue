<script setup lang="ts">
const props = defineProps<{
  shortened_urls: {
    url_id: number;
    long_url: string;
    short_url: string;
    creation_date: string;
    user_id: number;
    expiration_date: string;
    usage_count: number;
  }[];
}>();
</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>URL ID</th>
          <th>Original URL</th>
          <th>Shortened URL</th>
          <th>Creation Date</th>
          <th>User ID</th>
          <th>Expiration Date</th>
          <th>Usage Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in shortened_urls" :key="url.url_id">
          <td>{{ url.url_id }}</td>
          <td>{{ url.long_url }}</td>
          <td>
            <NuxtLink :to="url.short_url">{{ url.short_url }}</NuxtLink>
          </td>
          <td>{{ new Date(url.creation_date).toLocaleDateString() }}</td>
          <td>{{ url.user_id }}</td>
          <td>{{ new Date(url.expiration_date).toLocaleDateString() }}</td>
          <td>{{ url.usage_count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style >
table {
  width: 100%;
  border-collapse: collapse;
}
tr:hover {
  background-color: #cecece;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #037516;
  color: white;
}
</style>
