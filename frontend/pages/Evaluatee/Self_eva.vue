<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 1" @submit.prevent="saveScore">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-2 mt-2">
                        <p>ผู้ใช้งาน : {{ user.first_name }} {{ user.last_name }} </p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="text-h5">{{ t+1 }}.{{ topic.name_topic }}</h1>

                        </v-col>
                    </v-row>
                </v-form>
                <v-alert v-else-if="user.status_eva === 2 || user.status_eva === 3" type="success">ประเมินสำเร็จ</v-alert>
                <v-alert v-else type="error">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva } from '~/API/base';

const token = import.meta.client ? localStorage.getItem('token') :null

const topics = ref<any>([])
const user = ref<any>({})
const fetch = async()=>{
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value= res.data
    } catch (error) {
        console.error('Error get profile',error)
    }
}
onMounted(fetch)

const saveScore = async() => {
    const formData = new FormData()
    const allScore = topics.value.flatMap((t:any)=>
        t.indicate.map((i:any)=>{
            const key = `${t.id_topic}`
        })    
)
}
</script>

<style scoped>

</style>