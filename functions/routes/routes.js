const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

router.post('/api/posts', async (req, res) => {
    try {
        await db.collection('posts')
            .doc('/' + req.body.id + '/')
            .create({
                title:req.body.title
            });
        return res.status(204).json();
    } catch (error) {
        console.log(error) 
        return res.status(500).send(error);       
    }
})

router.get('/api/posts/:post_id', async(req, res)=>{
    try {
        const doc = db.collection('posts').doc(req.params.post_id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error) 
        return res.status(500).send(error);       
    }
})
    

router.get('/api/posts', async(req, res)=>{
    try {
        const query = db.collection('posts');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
        }))

        return res.status(200).json(response)

    } catch (error) {
        console.log(error) 
        return res.status(500).send(error);       
    }
})

router.delete('/api/posts/:post_id', async(req, res)=>{
    try {
        const query = db.collection('posts').doc(req.params.post_id);
        await query.delete()
        return res.status(200).json()

    } catch (error) {
        console.log(error) 
        return res.status(500).send(error);
    }
})

router.put('/api/posts/:post_id', async(req, res)=>{
    try {
        const query = db.collection('posts').doc(req.params.post_id);
        await query.update({
            title: req.body.title
        })
        return res.status(200).json()

    } catch (error) {
        console.log(error) 
        return res.status(500).send(error);
    }
})

module.exports = router