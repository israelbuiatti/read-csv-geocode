import knex from '../../database';
import User from '../models/User';

export default class UsersController {

	async list(req, res) {

		const results = await knex('users');

		return res.json(results);

	}

	async get(req, res) {

		const results = await knex('users').where('id', 1).first();

		return res.json(results);

	}

	async create(req, res) {

		const user = {
			name: "Israel"
		}

		await knex('users').insert(user);

		return res.json(null);
		
	}

	async native(req, res) {

		const results = await knex.raw('select * from users');

		return res.json(results.rows);
		
	}

	returnModel(req, res) {

		const model = new User();

		return res.json(model);

	}

}