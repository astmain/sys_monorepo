<template>
  <h1>print_shop</h1>
  <div><el-button @click="test1()">test1</el-button></div>
</template>

<script setup lang="tsx">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { axios_api } from "@/plugins/axios_api"

async function test1() {
  ElMessage.success("test1")
  console.log(`111---test1:`, 1111)
}

function test2() {
  const list = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
  ]
  const requests = list.map((items: any, index: number) => {
    axios_api
      .get(`/api/v1/print_shop/test1`, {
        // 监听进度（仅对支持的请求有效，如GET/POST）
        onDownloadProgress: (progressEvent) => {
          console.log(`请求${index + 1}进度：`, progressEvent)
        },
      })
      .then((response) => {})
      .catch((error) => {})
  })
}
</script>
