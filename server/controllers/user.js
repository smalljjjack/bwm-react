const User = require('../models/user');
const { normalizeErrors } = require('../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req, res){
  const email = req.body.email;
  const password = req.body.password;

  if(!password || !email){
    return res.status(422).send({errors: [{title:"Data Missing", detail: 'provide email or password!'}]});
  }

  User.findOne({email}, function(err, user){
    if(err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    if(!user){
      return res.status(422).send({errors: [{title:"Invalid User", detail: 'User doesnt exist'}]});
    }

    if(user.hasSamePassword(password)){
      const token = jwt.sign({
        userId: user.id,
        username: user.username,
      }, config.SECERT, { expiresIn: '1h' });

      return res.json(token);
    } else{
        return res.status(422).send({errors: [{title:"Invalid password or email", detail: 'wrong mail or password'}]});
    }
  });
}

exports.register = function(req, res){
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;
  //const {username, email, password, passwordConfirmation} = req.body;
  if(!username || ! email) {
    return res.status(402).send({errors: [{title:"register err", detail: 'invalid user input!'}]});
  }

  if(password != passwordConfirmation){
    return res.status(402).send({errors: [{title:"register err", detail: 'password is not same as passwordConfirmation'}]});
  }

  User.findOne({email}, function(err, existingUser){
    if(err){
      return res.status(402).send({errors: normalizeErrors(err.errors)});
    }

    if(existingUser){
      return res.status(402).send({errors: [{title:"register err", detail: 'email is existing'}]});
    }

    const user = new User({
      username,
      email,
      password,
      passwordConfirmation,
    });
    user.save(function(err){
      if(err){
        return res.status(402).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'registerd':true});
    });
  });

}

exports.authMiddleware = function(req, res, next){
  const token = req.headers.authorization;

  if(token){
    const user = parseToken(token);

    User.findById(user.userId, function(err, user){
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      if(user){
        res.locals.user = user;
        next();
      }else{
        return notAuthorized(res);
      }
    })
  }else{
    return notAuthorized(res);
  }
}

function parseToken(token){
  return jwt.verify(token.split(' ')[1], config.SECERT)
}

function notAuthorized(res){
  return res.status(401).send({errors: [{title:"Not authorized", detail: 'You need to loging to get access'}]});
}
