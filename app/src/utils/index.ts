import axios, { AxiosError, AxiosResponse } from 'axios';

const errorMessages = [
  'invalid-logo-mime-type',
  'duplicate-organisation-id',
] as const;

type ErrorMessageCode = typeof errorMessages[number];

interface ApiError extends AxiosError<{ code: ErrorMessageCode }> {
  response: AxiosResponse<{ code: ErrorMessageCode }>;
}

export function isApiError(err: unknown): err is ApiError {
  if (axios.isAxiosError(err) && err.response?.status === 400) {
    const errData = err.response.data as { code: string };
    return errorMessages.includes(errData.code as ErrorMessageCode);
  }
  return false;
}
