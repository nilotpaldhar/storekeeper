import productSeeder from '@libs/seeder/productSeeder';
import categorySeeder from '@libs/seeder/categorySeeder';
import homepageSeeder from '@libs/seeder/homepageSeeder';
import siteSeeder from '@libs/seeder/siteSeeder';
import { flattenCategories } from '@libs/seeder/helpers';

const seeder = async () => {
	const categories = await categorySeeder();
	await productSeeder(flattenCategories(categories));
	await homepageSeeder();
	await siteSeeder();
};

export default seeder;
