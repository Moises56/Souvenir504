const {Router} = require('express');
const router = Router();

const Cart = require('../models/Cart');
const Order = require('../models/Order');

const { renderNoteForm,
        createNewNote,
        renderNotas,
        renderEditForm,
        updateNotes,
        deleteNotes,
        status,
        buscador} = require('../controllers/notes.controller');

const {isAuthenticated} = require('../helpers/validacion');


//*Añadir un nota
router.get('/notes/add',isAuthenticated, renderNoteForm)
router.post('/notes/new-note',isAuthenticated, createNewNote)

//*Obtenet todas las notas
router.get('/notes',isAuthenticated, renderNotas)
// router.get('/productos/new-productos', renderProductos)
// router.get('index', renderProductosIndex)

//*Edit notas
//router.get('/notes/edit/:id', renderEditForm) //*Mostrar el formulario envia los datos
//router.put('/notes/edit/:id', updateNotes) //*Autualizar los datos resive los datos

router.get("/notes/edit/:id",isAuthenticated, renderEditForm);
router.put("/notes/edit-note/:id",isAuthenticated, updateNotes);

//*Perfil del producto
router.get('/note/:id', (req, res) => {
    res.send('Perfil del producto');
})

//*Eliminar
//router.delete('/notes/delete/:id', deleteNotes)
router.delete('/notes/delete/:id',isAuthenticated, deleteNotes);


//?Estatus
router.get('/notes/status',isAuthenticated, async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .lean();
    res.render('notes/status', {orders})
    console.log(orders)
  });



// router.post('/notes/status',isAuthenticated, status)

// notesCtrl.status = async (req, res) => {
//     const orders = await Order.find({ 'user': req.user}, (err, orders) => {
//       if(err){
//         return res.write('Error');
//       }
//       var cart;
//       orders.forEach(order => {
//         cart = new Cart(order.cart);
//         order.items = cart.generateArray();
//       });
//       res.render('notes/status', {orders});
//     })
   
//     // res.redirect("notes/status");
//   }

//?buscador
// router.get('store/checkout', buscador)


//TODO get ->Obtener
//TODO post ->Crear
//TODO put ->Actaulizar

module.exports = router