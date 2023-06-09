/*
export const createUser = async (data: User): Promise<Result<User, DatabaseError>> => {
	const result = await resultify(() => prisma.user.create({
		data: data
	}));
	if (result.ok) return ok(result.value);

}
 */