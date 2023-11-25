import { getGlobalTop } from "$core/handlers/database/xp/xp.func";

const test = async() => {
  const time = Date.now();
  console.log(await getGlobalTop(30000, 2));
  console.log(`reply in ${Date.now() - time} ms`);
};

void test();