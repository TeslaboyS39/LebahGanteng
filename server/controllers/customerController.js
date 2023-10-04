const {
  User,
  Genre,
  Movie,
  History,
  Customer,
  Bookmark,
  sequelize,
} = require("../models");
const { comparePasswords } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { Op } = require("sequelize");

class CustomerController {
  static async customerRegister(req, res, next) {
    try {
      const { email, password } = req.body;

      const customer = await Customer.create({ email, password });

      res.status(201).json({
        message: `User with id ${customer.id} is created`,
        email,
        password,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async customerLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "badRequest", message: "Email cannot be empty" };
      }

      if (!password) {
        throw { name: "badRequest", message: "Password cannot be empty" };
      }

      const customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        throw { name: "unauthenticated", message: "Invalid email" };
      }

      const validPass = comparePasswords(password, customer.password);
      console.log(validPass);

      if (!validPass) {
        throw { name: "unauthenticated", message: "Invalid password" };
      }

      const access_token = createToken({ id: customer.id });
      // console.log(access_token);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async customerGoogleLogin(req, res, next) {
    try {
      const { credential } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      // console.log(payload, '<<<<<');
      const [customer, isCreated] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: String(Math.floor(Math.random() * 88888) + 11111), // rentang keacakan pw login google dari 11111 - 99999
          role: "customer",
          phoneNumber: "N/A",
          address: "N/A",
        },
        hook: false,
      });

      // console.log(user, '<<<< INI USER BRO');
      // console.log(isCreated, '<<<< INI ISCREATED BRO');
      const access_token = createToken({
        id: customer.id,
      });

      let status = 200;
      if (isCreated) status = 201;

      res.status(status).json({ access_token, userName: customer.userName });
    } catch (error) {
      next(error);
    }
  }

  static async customerShowAllMovies(req, res, next) {
    try {
      let { page, filter, search } = req.query;

      search = search || "";
      page = parseInt(page) || 1;

      let obj = {
        include: Genre,
        order: [["id", "ASC"]],
        where: {
          title: { [Op.iLike]: `%${search}%` },
          status: "Active",
        },
      };

      if (page) {
        (obj.limit = 8), (obj.offset = (page - 1) * 8);
      }

      if (filter) {
        obj.where.genreId = filter;
      }

      console.log(obj, "<<<");

      const movies = await Movie.findAll(obj);

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async customerShowOneMovie(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.findByPk(id, {
        include: [Customer, Genre],
        where: {
          status: "Active",
        },
      });

      // Axios to hit qr code api, fail because trial version already expired
      //   const { data } = await axios({
      //     url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QRCODE}`,
      //     method: "post",
      //     data: {
      //       frame_name: "no-frame",
      //       qr_code_text: `http://localhost:5173/detail/${req.params.id}`,
      //       //   qr_code_text: `https://projectgc3.web.app/detail/${req.params.id}`,
      //       image_format: "SVG",
      //       qr_code_logo: "scan-me-square",
      //     },
      //   });

      if (!movie) {
        throw { name: "movieNotFound" };
      }

      //   res.status(200).json({ movie, data });
      res.status(200).json({ movie });
    } catch (error) {
      next(error);
    }
  }

  static async customerShowAllBookmarks(req, res, next) {
    try {
      const bookmarks = await Bookmark.findAll({
        include: Movie,
        where: {
          CustomerId: req.customer.id,
        },
      });

      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  }

  static async customerAddBookmark(req, res, next) {
    try {
      const { MovieId } = req.body;

      const newBookmark = await Bookmark.create({
        CustomerId: req.customer.id,
        MovieId,
      });

      res.status(201).json({
        message: `Movie with id ${MovieId} has been added to bookmark`,
        newBookmark,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
