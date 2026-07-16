<template>
    <v-container>
         <v-card >
                        <v-sheet class="pa-4">
                            <h1 class="text-h5 font-weight-bold">คู่มือประกอบการประเมิน</h1>
                        </v-sheet>
                        <v-card-text>
                            <v-table>
                                <thead>
                                    <tr>
                                    <th class="bg-grey border pa-1">ตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1">น้ำหนักคะแนน</th>
                                    <th class="bg-grey border pa-1">คะแนนเต็ม</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items,index) in result" :key="items.id_doc">
                                    <td class="border pa-1 text-center">{{ index+1 }}</td>
                                    <td class="border pa-1 text-center">{{ items.name_doc }}</td>
                                    <td class="border pa-1 text-center">{{ items.day_doc }}</td>
                                    <td class="border pa-1 text-center">
                                        <v-btn color="warning" size="small" prepend-icon="mdi-eye" @click="views(items.file)">เปิดดู</v-btn>
                                    </td>
                                    </tr>
                                    <tr v-if="result.length === 0">
                                        <td class="text-center border" colspan="10">ไม่พบข้อมูล</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api } from '~/API/base'

const result = ref([])

const viwe = (filename:string)=>{
    const url = new URL(`/uploads/document/${filename}`,api).href
    window.open(url,'_blank')
}

const fetchUser = async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${api}/docnoe`, { headers: { Authorization: `Bearer ${token}` } })
        result.value = res.data
    } catch (error) {
        console.error('Error Fethching!', error)
    }
}
onMounted(fetchUser)
</script>

<style scoped></style>