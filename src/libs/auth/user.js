import { nanoid } from 'nanoid';
import { groq } from 'next-sanity';

export const user = (client) => {
	const sanity = client?.sanity({ useCdn: false, useToken: true });
	const chec = client?.chec({ useSecretKey: true });

	/** Remove user. */
	const removeUser = async (userID, from = 'all') => {
		if (!userID) return false;

		const removeFromSanity = (from === 'all' || from === 'sanity') && userID.sanity;
		const removeFromChec = (from === 'all' || from === 'chec') && userID.chec;

		try {
			if (removeFromSanity) await sanity.delete(userID.sanity);
			if (removeFromChec) await chec.request(`customers/${userID.chec}`, 'delete');
			return true;
		} catch (error) {
			return false;
		}
	};

	/** Find user. */
	const findUser = async (key = '_id', value = '') => {
		let userSanity;
		const query = groq`*[_type == "user" && ${key} == $value]{
      "id": _id, "name": firstname, firstname, lastname, email, emailVerified, image, checId
    }[0]`;

		try {
			userSanity = await sanity.fetch(query, { value });
			const userChec = await chec.request(`customers/${userSanity?.checId}`);
			if (!userSanity || !userChec) throw new Error('User not found');
			return userSanity;
		} catch (error) {
			await removeUser({ sanity: userSanity?.id, chec: userSanity?.checId });
			return null;
		}
	};

	return {
		/** Create user. */
		async create({ name, email, image, emailVerified } = {}) {
			const existingUser = await findUser('email', email);
			if (existingUser) return existingUser;

			/** Build new user object (commerce.js). */
			const userObjChec = { email, firstname: name };

			/** Build new user object (sanity). */
			const userObjSanity = {
				_id: `user.${nanoid()}`,
				_type: 'user',
				firstname: name,
				lastname: '',
				email: email,
				image: image,
				emailVerified: emailVerified ?? '',
			};

			try {
				const { id: checId } = await chec.request('customers', 'post', userObjChec);
				const { _id: id, ...rest } = await sanity.create({ checId, ...userObjSanity });
				return { id, ...rest };
			} catch (error) {
				throw new Error('Failed to create new user');
			}
		},

		/** Update user. */
		async update({ id, name, email, image, emailVerified } = {}) {
			const existingUser = await findUser('_id', id);
			if (!existingUser) throw new Error("Can't update user. User not found");

			/** Build user object (commerce.js). */
			const userObjChec = { firstname: name, email };

			/** Build user object (sanity). */
			const userObjSanity = {
				email,
				firstname: name,
				lastname: '',
				image,
				emailVerified: emailVerified ?? '',
			};

			try {
				const {
					_id: userId,
					checId,
					firstname,
					...rest
				} = await sanity.patch(id).set(userObjSanity).commit();
				await chec.request(`customers/${checId}`, 'put', userObjChec);
				return { id: userId, name: firstname, ...rest };
			} catch (error) {
				throw new Error("Can't update user. Something went wrong");
			}
		},

		/** Get user. */
		async get(id) {
			const existingUser = await findUser('_id', id);
			return existingUser ?? null;
		},

		/** Get user by email. */
		async getByEmail(email) {
			const existingUser = await findUser('email', email);
			return existingUser ?? null;
		},
	};
};

export default user;
