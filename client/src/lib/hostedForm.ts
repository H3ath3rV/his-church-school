type HostedFormFieldValue = string | number | boolean | null | undefined;

type HostedFormApiError = {
  field?: string;
  message?: string;
};

type HostedFormApiResponse = {
  errors?: HostedFormApiError[];
};

export type HostedFormFieldErrors = Record<string, string>;

export type HostedFormSubmission = {
  endpoint?: string;
  enquiryType: string;
  fields: Record<string, HostedFormFieldValue>;
  page: string;
  replyTo?: string;
  subject: string;
};

export const ENQUIRY_FORM_ENDPOINT = (
  import.meta.env.VITE_ENQUIRY_FORM_ENDPOINT?.trim() ??
  import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ??
  ""
).trim();

export const HAS_ENQUIRY_FORM_ENDPOINT = ENQUIRY_FORM_ENDPOINT.length > 0;

export class HostedFormSubmissionError extends Error {
  fieldErrors: HostedFormFieldErrors;

  constructor(message: string, fieldErrors: HostedFormFieldErrors = {}) {
    super(message);
    this.name = "HostedFormSubmissionError";
    this.fieldErrors = fieldErrors;
  }
}

function toFieldErrors(errors: HostedFormApiError[]) {
  return errors.reduce<HostedFormFieldErrors>((fieldErrors, error) => {
    if (!error.field || !error.message) return fieldErrors;

    fieldErrors[error.field] = error.message;
    return fieldErrors;
  }, {});
}

export async function submitHostedEnquiryForm({
  endpoint = ENQUIRY_FORM_ENDPOINT,
  enquiryType,
  fields,
  page,
  replyTo,
  subject,
}: HostedFormSubmission) {
  if (!endpoint) {
    throw new HostedFormSubmissionError(
      "Online enquiries are temporarily unavailable. Please contact the school office directly."
    );
  }

  const formData = new FormData();

  Object.entries(fields).forEach(([field, value]) => {
    if (value === null || value === undefined) return;

    const normalizedValue =
      typeof value === "string" ? value.trim() : String(value);

    if (!normalizedValue) return;
    formData.set(field, normalizedValue);
  });

  if (replyTo?.trim()) {
    formData.set("_replyto", replyTo.trim());
  }

  formData.set("_subject", `Website enquiry: ${subject.trim()}`);
  formData.set("source", "His Church School website");
  formData.set("page", page);
  formData.set("enquiryType", enquiryType);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  const responseBody = (await response
    .json()
    .catch(() => null)) as HostedFormApiResponse | null;

  if (response.ok) return;

  const responseErrors = Array.isArray(responseBody?.errors)
    ? responseBody.errors
    : [];

  throw new HostedFormSubmissionError(
    responseErrors[0]?.message ||
      "We couldn't send your enquiry right now. Please try again.",
    toFieldErrors(responseErrors)
  );
}
