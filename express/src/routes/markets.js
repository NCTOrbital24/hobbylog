const { Router } = require('express'); 

const router = Router(); 

const supermarkets = [ 
    { 
        id: 1,
        store :'Whole Foods', 
        miles: 0.6, 
    },

    { 
        id: 2, 
        store: 'Trader Joes', 
        miles: 2.5, 
    },
]; 


router.use((req, res, next) => { 
    if (req.session.user) next(); 
    else res.send(401);
});

router.get('', (request, response) => { 
    const { miles } = request.query; 
    const parsedMiles = parseInt(miles);
    if (!isNaN(parsedMiles)) { 
        const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles);
        response.send(filteredStores);

    } else response.send(supermarkets);
}); 

module.exports = router; 