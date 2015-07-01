var express = require('express');
var router = express.Router();

function getBlog(req, res, next) {
    res.send({
        status: 'success',
        blog: [
            {
                title: 'Today',
                content: 'It\'s first blog I posted'
            }
        ]
    });
}

function blog(req, res, next) {
    res.sendfile('views/blog.html');
}

router.get('/blog', getBlog);
router.get('/', blog);

module.exports = router;