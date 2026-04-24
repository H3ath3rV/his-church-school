import { useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import {
  HAS_ENQUIRY_FORM_ENDPOINT,
  HostedFormSubmissionError,
  submitHostedEnquiryForm,
} from "@/lib/hostedForm";
import { getPageHref } from "@/lib/sitePaths";

export type HostedEnquiryField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  autoComplete?: string;
  column?: "full" | "half";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  requiredMessage?: string;
  rows?: number;
  validate?: (value: string, values: Record<string, string>) => string;
};

type HostedEnquiryFormProps = {
  emptyStateMessage?: string;
  enquiryType: string;
  fields: HostedEnquiryField[];
  formId: string;
  intro: string;
  page: string;
  submitLabel: string;
  successBody: string;
  successIcon: ReactNode;
  successTitle: string;
  title: string;
  buildSubmission: (values: Record<string, string>) => {
    fields: Record<string, string>;
    replyTo?: string;
    subject: string;
  };
};

const inputClass =
  "w-full min-h-[52px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-body text-[#051040] placeholder:text-[#051040]/62 transition-colors focus:border-[#051040] focus:outline-none focus:ring-1 focus:ring-[#051040]/20";
const fieldLabelClass =
  "px-1 font-label text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#051040]/70";
const cardSurfaceClass =
  "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden";

function createInitialValues(fields: HostedEnquiryField[]) {
  return fields.reduce<Record<string, string>>((values, field) => {
    values[field.name] = "";
    return values;
  }, {});
}

function validateField(
  field: HostedEnquiryField,
  values: Record<string, string>
) {
  const value = values[field.name]?.trim() ?? "";

  if (field.required && !value) {
    return (
      field.requiredMessage ?? `Please enter ${field.label.toLowerCase()}.`
    );
  }

  return field.validate?.(value, values) ?? "";
}

function getErrorId(formId: string, fieldName: string) {
  return `${formId}-${fieldName}-error`;
}

export default function HostedEnquiryForm({
  emptyStateMessage,
  enquiryType,
  fields,
  formId,
  intro,
  page,
  submitLabel,
  successBody,
  successIcon,
  successTitle,
  title,
  buildSubmission,
}: HostedEnquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = createInitialValues(fields);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const privacyHref = getPageHref("privacy");

  const updateFieldError = (
    field: HostedEnquiryField,
    nextValues: Record<string, string>
  ) => {
    const error = validateField(field, nextValues);

    setErrors(currentErrors => {
      const nextErrors = { ...currentErrors };

      if (error) nextErrors[field.name] = error;
      else delete nextErrors[field.name];

      return nextErrors;
    });
  };

  const handleFieldChange = (field: HostedEnquiryField, value: string) => {
    const nextValues = { ...values, [field.name]: value };
    setValues(nextValues);

    if (submitError) {
      setSubmitError(null);
    }

    if (touchedFields[field.name] || errors[field.name]) {
      updateFieldError(field, nextValues);
    }
  };

  const handleFieldBlur = (field: HostedEnquiryField) => {
    setTouchedFields(current => ({ ...current, [field.name]: true }));
    updateFieldError(field, values);
  };

  const validateAllFields = () => {
    return fields.reduce<Record<string, string>>((nextErrors, field) => {
      const error = validateField(field, values);

      if (error) {
        nextErrors[field.name] = error;
      }

      return nextErrors;
    }, {});
  };

  const focusField = (fieldName: string) => {
    requestAnimationFrame(() => {
      const fieldElement = document.getElementById(`${formId}-${fieldName}`);

      if (fieldElement instanceof HTMLElement) {
        fieldElement.focus();
      }
    });
  };

  const focusFirstInvalidField = (fieldErrors: Record<string, string>) => {
    const firstInvalidField = fields.find(field => fieldErrors[field.name]);

    if (firstInvalidField) {
      focusField(firstInvalidField.name);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedFields({});
    setIsSubmitted(false);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateAllFields();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setTouchedFields(
        fields.reduce<Record<string, boolean>>((nextTouchedFields, field) => {
          nextTouchedFields[field.name] = true;
          return nextTouchedFields;
        }, {})
      );
      focusFirstInvalidField(nextErrors);
      return;
    }

    if (!HAS_ENQUIRY_FORM_ENDPOINT) {
      setSubmitError(
        emptyStateMessage ??
          "Online enquiries are temporarily unavailable. Please contact the school office directly."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = buildSubmission(values);

      await submitHostedEnquiryForm({
        enquiryType,
        fields: submission.fields,
        page,
        replyTo: submission.replyTo,
        subject: submission.subject,
      });

      setValues(initialValues);
      setErrors({});
      setTouchedFields({});
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof HostedFormSubmissionError) {
        if (Object.keys(error.fieldErrors).length > 0) {
          setErrors(currentErrors => ({
            ...currentErrors,
            ...error.fieldErrors,
          }));
          setTouchedFields(currentTouchedFields => ({
            ...currentTouchedFields,
            ...Object.keys(error.fieldErrors).reduce<Record<string, boolean>>(
              (nextTouchedFields, fieldName) => {
                nextTouchedFields[fieldName] = true;
                return nextTouchedFields;
              },
              {}
            ),
          }));
          focusFirstInvalidField(error.fieldErrors);
        }

        setSubmitError(error.message);
      } else {
        setSubmitError(
          "We couldn't send your enquiry right now. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClass = (fieldName: string, extraClass = "") => {
    const hasError = Boolean(touchedFields[fieldName] && errors[fieldName]);

    return `${inputClass} ${
      hasError
        ? "border-[#C94A4A] focus:border-[#C94A4A] focus:ring-[#C94A4A]/15"
        : ""
    } ${extraClass}`.trim();
  };

  return (
    <div className={`${cardSurfaceClass} p-6 fade-up sm:p-7 md:p-8`}>
      <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040]">
        {title}
      </h2>
      <div className="mx-auto mb-6 h-0.5 w-10 bg-[#C9A84C]" />

      {isSubmitted ? (
        <div
          className="mx-auto flex max-w-3xl flex-col items-center py-4 text-center sm:py-6"
          aria-live="polite"
        >
          <div className="mb-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#C9A84C] text-[#051040] sm:h-20 sm:w-20">
            {successIcon}
          </div>
          <h3 className="font-display text-[1.9rem] font-black leading-none text-[#051040] sm:text-[2.2rem]">
            {successTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-xl font-body text-[0.98rem] leading-[1.72] text-[#051040]/68 sm:text-[1rem]">
            {successBody}
          </p>
          <p className="mt-2 font-body text-[0.92rem] leading-[1.65] text-[#051040]/62 sm:text-[0.96rem]">
            If you need anything else, you can send another enquiry below.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="hcs-btn-primary mt-6 px-6"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          id={formId}
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          noValidate
          className="space-y-4 md:space-y-5"
        >
          <p className="rounded-2xl bg-[#EEF2FB] px-4 py-4 font-body text-[0.98rem] leading-[1.72] text-[#051040]/70 md:px-5 sm:text-[1rem]">
            {intro}
          </p>
          {!HAS_ENQUIRY_FORM_ENDPOINT ? (
            <p className="rounded-2xl border border-[#C9A84C]/25 bg-[#FFF8E6] px-4 py-4 font-body text-[0.98rem] leading-[1.72] text-[#6B4C0F] md:px-5 sm:text-[1rem]">
              {emptyStateMessage ??
                "Online enquiries are temporarily unavailable. Please contact the school office directly."}
            </p>
          ) : null}
          {submitError ? (
            <p
              role="alert"
              className="rounded-2xl border border-[#C94A4A]/20 bg-[#FFF6F6] px-4 py-4 font-body text-[0.98rem] leading-[1.72] text-[#8C1E1E] md:px-5 sm:text-[1rem]"
            >
              {submitError}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {fields.map(field => {
              const errorId = getErrorId(formId, field.name);
              const showError =
                touchedFields[field.name] && Boolean(errors[field.name]);
              const wrapperClass =
                field.column === "half"
                  ? "space-y-2"
                  : "space-y-2 md:col-span-2";
              const fieldId = `${formId}-${field.name}`;

              return (
                <div key={field.name} className={wrapperClass}>
                  <label htmlFor={fieldId} className={fieldLabelClass}>
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <div className="relative">
                      <select
                        id={fieldId}
                        name={field.name}
                        value={values[field.name]}
                        onChange={event =>
                          handleFieldChange(field, event.target.value)
                        }
                        onBlur={() => handleFieldBlur(field)}
                        required={field.required}
                        className={`${getFieldClass(field.name, "appearance-none pr-12")} ${
                          values[field.name] === ""
                            ? "text-[#051040]/70"
                            : "text-[#051040]"
                        }`}
                        aria-invalid={showError ? true : undefined}
                        aria-describedby={showError ? errorId : undefined}
                      >
                        <option value="" disabled>
                          {field.placeholder ??
                            `Select ${field.label.toLowerCase()}`}
                        </option>
                        {field.options?.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={20}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#051040]/70"
                      />
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={fieldId}
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={field.rows ?? 5}
                      required={field.required}
                      value={values[field.name]}
                      onChange={event =>
                        handleFieldChange(field, event.target.value)
                      }
                      onBlur={() => handleFieldBlur(field)}
                      className={getFieldClass(
                        field.name,
                        "min-h-[168px] resize-none"
                      )}
                      aria-invalid={showError ? true : undefined}
                      aria-describedby={showError ? errorId : undefined}
                    />
                  ) : (
                    <input
                      id={fieldId}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={values[field.name]}
                      onChange={event =>
                        handleFieldChange(field, event.target.value)
                      }
                      onBlur={() => handleFieldBlur(field)}
                      className={getFieldClass(field.name)}
                      autoComplete={field.autoComplete}
                      aria-invalid={showError ? true : undefined}
                      aria-describedby={showError ? errorId : undefined}
                    />
                  )}

                  {showError ? (
                    <p
                      id={errorId}
                      className="px-1 text-sm font-body text-[#C94A4A]"
                    >
                      {errors[field.name]}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="pt-1">
            <p className="mb-4 rounded-2xl border border-[#051040]/10 bg-[#FAFBFE] px-4 py-4 font-body text-[0.92rem] leading-[1.7] text-[#051040]/72 sm:text-[0.96rem]">
              By submitting this form, you consent to His Church School and its
              hosted enquiry service using the information you provide to reply
              to your request. Read our{" "}
              <Link
                href={privacyHref}
                className="font-semibold text-[#051040] underline decoration-[#C9A84C] decoration-2 underline-offset-3 transition-colors hover:text-[#0A1B66]"
              >
                Privacy Notice
              </Link>
              .
            </p>
            <button
              type="submit"
              disabled={isSubmitting || !HAS_ENQUIRY_FORM_ENDPOINT}
              className="hcs-btn-primary w-full px-5 text-center disabled:cursor-not-allowed disabled:bg-[#8B93AA] disabled:text-white/88 disabled:shadow-none"
            >
              {!HAS_ENQUIRY_FORM_ENDPOINT
                ? "ONLINE ENQUIRIES UNAVAILABLE"
                : isSubmitting
                  ? "SENDING..."
                  : submitLabel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
