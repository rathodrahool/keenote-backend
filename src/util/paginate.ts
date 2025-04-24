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

  const searchFilter = search
    ? {
        $or: searchFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      }
    : {};

  let findQuery = model.find(searchFilter).sort(sort).skip(skip).limit(+limit);

  // Handle populate if provided
  if (populate) {
    // If populate is an array, populate multiple fields
    if (Array.isArray(populate)) {
      populate.forEach((field) => {
        findQuery = findQuery.populate(field);
      });
    } else {
      // If populate is a string, populate single field
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
