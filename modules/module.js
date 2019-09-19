var express =require('express');
var router =express.Router();
var crud =require('./api/crudapp/crud')

router.post('/add',crud.addData);
router.get('/get',crud.getData);
router.delete('/delete/:id',crud.deleteData);
router.put('/update/:id',crud.updateData);





module.exports = router;