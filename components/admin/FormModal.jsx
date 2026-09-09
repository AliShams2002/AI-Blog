"use client";

import { useFormModal } from "@/hooks/useFormModal";
import { X, Plus, Edit2 } from "lucide-react";

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "add",
  title = "",
  initialData = {},
  fields = [],
  schema = null,
  isLoading = false,
  customChildren = null,
  serverErrors: propServerErrors = {},
  serverMessage: propServerMessage = "",
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    isValid,
    handleSubmit,
    handleChange,
    handleFileChange,
    isEditMode,
    register,
    setValue,
    getFieldError,
    hasFieldError,
    serverErrors,
    serverMessage,
  } = useFormModal({
    mode,
    initialData,
    fields,
    schema,
    onSubmit,
    onClose,
    isOpen,
    serverErrors: propServerErrors,
    serverMessage: propServerMessage,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="h-full bg-[#1F1F24] rounded-xl border border-[#3F3F46] w-full max-w-lg shadow-2xl overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#3F3F46]">
          <div className="flex items-center gap-2">
            {!isEditMode ? (
              <Plus className="w-5 h-5 text-green-400" />
            ) : (
              <Edit2 className="w-5 h-5 text-blue-400" />
            )}
            <h3 className="text-lg font-semibold text-white">
              {title || (isEditMode ? "ویرایش" : "افزودن جدید")}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading || isSubmitting}
            className="p-1 rounded-lg hover:bg-[#2A2A30] transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            {/* Display general server error */}
            {serverErrors?._form && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-400 text-sm">⚠️ {serverErrors._form}</p>
              </div>
            )}

            {customChildren
              ? typeof customChildren === "function"
                ? customChildren({
                    formData,
                    errors,
                    serverErrors,
                    handleChange,
                    register,
                    setValue,
                    getFieldError,
                    hasFieldError,
                  })
                : customChildren
              : fields.map((field) => {
                  const fieldError = getFieldError(field.name);
                  const isFieldError = hasFieldError(field.name);

                  return (
                    <div key={field.name}>
                      <label className="block text-sm text-gray-300 mb-1">
                        {field.label}
                        {field.required && (
                          <span className="text-red-400 mr-1">*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          {...register(field.name)}
                          placeholder={field.placeholder}
                          rows={field.rows || 4}
                          className={`w-full p-2 bg-[#2A2A30] border rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 ${
                            isFieldError ? "border-red-500" : "border-[#3F3F46]"
                          }`}
                        />
                      ) : field.type === "select" ? (
                        <select
                          {...register(field.name)}
                          className={`w-full p-2 bg-[#2A2A30] border rounded-lg focus:outline-none focus:border-purple-500 text-white ${
                            isFieldError ? "border-red-500" : "border-[#3F3F46]"
                          }`}
                        >
                          <option value="">انتخاب کنید</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "file" ? (
                        <>
                          <input
                            type="file"
                            name={field.name}
                            onChange={(e) =>
                              handleFileChange(field.name, e.target.files?.[0])
                            }
                            accept={field.accept}
                            className="w-full p-2 bg-[#2A2A30] border border-[#3F3F46] rounded-lg focus:outline-none focus:border-purple-500 text-white file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                          />
                        </>
                      ) : (
                        <input
                          type={field.type || "text"}
                          {...register(field.name)}
                          placeholder={field.placeholder}
                          className={`w-full p-2 bg-[#2A2A30] border rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 ${
                            isFieldError ? "border-red-500" : "border-[#3F3F46]"
                          }`}
                        />
                      )}

                      {/* Display field error (below each field)*/}
                      {fieldError && (
                        <div className="mt-1 flex items-start gap-1.5">
                          <span className="text-red-400 text-xs">⚠️</span>
                          <p className="text-red-400 text-xs flex-1">
                            {fieldError}
                          </p>
                        </div>
                      )}

                      {/* Show hint */}
                      {field.hint && !fieldError && (
                        <p className="text-xs text-gray-500 mt-1">
                          {field.hint}
                        </p>
                      )}
                    </div>
                  );
                })}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-4 border-t border-[#3F3F46]">
            <button
              type="submit"
              disabled={isLoading || isSubmitting || (schema && !isValid)}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading || isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>
                    {isEditMode ? " در حال ذخیره..." : " در حال ارسال..."}
                  </span>
                </>
              ) : isEditMode ? (
                "ویرایش"
              ) : (
                "افزودن"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading || isSubmitting}
              className="flex-1 px-4 py-2 bg-[#2A2A30] text-gray-300 rounded-lg hover:bg-[#3F3F46] transition-colors"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
