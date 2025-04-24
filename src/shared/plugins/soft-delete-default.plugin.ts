import { Schema } from 'mongoose';

export function SoftDeleteDefaultFieldsPlugin(schema: Schema) {
  // Common default fields
  schema.add({
    deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
    created_by_ip: { type: String },
    updated_by_ip: { type: String },
  });

  // Add timestamps (created_at, updated_At)
  schema.set('timestamps', {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  // Auto-exclude soft-deleted documents unless explicitly included
  function excludeDeleted(this: any, next: () => void) {
    if (!this.getFilter().includeDeleted) {
      this.where({ deleted: false });
    }
    next();
  }

  schema.pre('find', excludeDeleted);
  schema.pre('findOne', excludeDeleted);
  schema.pre('findOneAndUpdate', excludeDeleted);

  // Methods for soft delete and restore
  schema.methods.softDelete = function () {
    this.deleted = true;
    this.deleted_at = new Date();
    return this.save();
  };

  schema.methods.restore = function () {
    this.deleted = false;
    this.deleted_at = null;
    return this.save();
  };
}
