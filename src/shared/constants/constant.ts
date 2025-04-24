export const SUCCESS = {
  RECORD_FETCHED: (record) => `${record} fetched successfully`,
  RECORD_FOUND: (record) => `${record} found`,
  RECORD_ADDED: (record) => `${record} added successfully`,
  RECORD_UPDATED: (record) => `${record} updated successfully`,
  RECORD_DELETED: (record) => `${record} deleted successfully`,
  RECORD_NOT_FOUND: (record) => `${record} not found`,
};

export const ERROR = {
  RECORD_NOT_FOUND: (record) => `${record} not found`,
};
