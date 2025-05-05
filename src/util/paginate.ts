export async function paginate<T>(
  model: any,
  query: any,
  searchFields: string[] = [],
  populate: string[] = [],
): Promise<{
  results: T[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const { page, limit, sortBy, sortOrder, search } = query;
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const baseFilter = { deleted: { $ne: true } };

  const searchFilter = search
    ? {
        $and: [
          baseFilter,
          {
            $or: searchFields.map((field) => ({
              [field]: { $regex: search, $options: 'i' },
            })),
          },
        ],
      }
    : baseFilter;

  let findQuery = model.find(searchFilter).sort(sort).skip(skip).limit(+limit);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((field) => {
        findQuery = findQuery.populate(field);
      });
    } else {
      findQuery = findQuery.populate(populate);
    }
  }

  const [results, total] = await Promise.all([
    findQuery,
    model.countDocuments(searchFilter),
  ]);

  return {
    results,
    total,
    page: +page,
    totalPages: Math.ceil(total / limit),
  };
}
