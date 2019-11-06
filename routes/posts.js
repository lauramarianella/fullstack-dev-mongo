const express = require('express');
let multer = require('multer');
let upload = multer({ dest: __dirname + '/uploads' });

const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
  res.send('We are on posts');
});

router.get('/specific', (req, res) => {
  res.send('We are on specific posts');
});

//http://localhost:3000/posts/saveMongo?title=myTitle&description=myDescription
//router.post
router.post('/saveMongo', upload.none(), (req, res) => {
  let title = '';
  let description = '';
  let method = 'GET';

  if (method === 'NOT GET') {
    //if the end point is .get
    title = req.query.title;
    description = req.query.description;
    console.log(description);
  } else {
    //for this use app: PostMan, don't use params, instead use body, there add the key,values
    //if the end point is .post
    title = req.body.title;
    description = req.body.description;
    console.log(title + ' ' + description);
  }

  const post = new Post({
    title: title,
    description: description,
  });

  post
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post('/saveMongo2', upload.none(), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/getById/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/deleteById/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    const removedPost = await Post.remove({ _id: postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//patch doesn't work with the parameters as query string or in the body...
router.get('/updateById/:postId', async (req, res) => {
  const postId = req.params.postId;
  let newTitle = 'aja';
  try {
    //doesnot works,
    newTitle = req.body.title;
  } catch (err) {
    console.log('Req body null');
  }

  try {
    newTitle = req.query.title;
  } catch (err) {
    console.log('Req query params null');
  }

  try {
    const updatedPost = await Post.updateOne(
      { _id: postId },
      { $set: { title: newTitle } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
