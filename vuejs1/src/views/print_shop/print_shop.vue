<template>
  <h1>print_shop</h1>
  <div><el-button @click="test1()">test1</el-button></div>
  <div><el-button @click="test2()">test2</el-button></div>
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
  const list_form = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
  ]
  let completed = 0
  const list_ajax = list_form.map((items: any, index: number) => {
    axios_api
      .get(`/test/ajax/test_oss`, {
        // 监听进度（仅对支持的请求有效，如GET/POST）
        onDownloadProgress: (progressEvent) => {
          const percent = progressEvent.total ? Math.round((progressEvent.loaded / progressEvent.total) * 100) : 0
          console.log(`请求${index + 1}进度：`, progressEvent)
        },
      })
      .then((response) => {
        completed++
        console.log(`请求${index + 1}完成，总进度：${completed}/${list_form.length}`)
        return response.data
      })
      .catch((error) => {
        completed++
        console.log(`请求${index + 1}失败，总进度：${completed}/${list_form.length}，错误：${error.message}`)
        throw error // 如需忽略错误可改为return null
      })
  })

  Promise.all(list_ajax)
    .then((results) => {
      console.log(`所有请求完成，结果：`, results)
    })
    .catch((error) => {
      console.log(`所有请求失败，错误：`, error)
    })
}
</script>
