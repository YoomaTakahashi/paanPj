const express = require('express')
const db = require('../../db')
const router = express.Router()
const {requireRole,verifyToken} = require('../../middleware/authMiddleware')

router.get('/user',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member=? and e.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc `,[id_member])
        res.json(rows[0])
    } catch (error) {
        console.error("Error Get User",error)
        res.status(500).json({message:'Error Get User'})
    }
})


router.get('/topic',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate`)
        const result = topics.map(t=>({
            ...t,
            indicates:indicates.filter((i)=> i.id_indicate === t.id_topic)
        }))
        res.json(result)
    } catch (error) {
        console.error("Error Get TOpics",error)
        res.status(500).json({message:'Error Get topics'})
    }
})

router.get('/commits',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s,tb_commit c where e.id_member=? and e.id_eva=c.id_eva and c.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc`,[id_member])
        res.json(rows)
    } catch (error) {
        console.error("Error Get User",error)
        res.status(500).json({message:'Error Get User'})
    }
})

module.exports = router