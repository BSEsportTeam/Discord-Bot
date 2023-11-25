import type {Method, RequestParams} from '$core/utils/request/request.type';
import {RestRequestError} from '$core/utils/error';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';

export const restRequest = async (method: Method, url: string, options: RequestParams = {}): Promise<Result<Response, RestRequestError>> => {
  const response = await fetch(url, {...options, method: method});

  if (!response.ok) {
    return error(new RestRequestError('failed to rest request', response.status, url, method, response));
  }

  return ok(response);
};

export const jsonRestRequest = async (method: Method, url: string, options: RequestParams = {}): Promise<Result<object, RestRequestError>> => {
  options.headers = {...options.headers, 'Content-Type': 'application/json'};

  const result = await restRequest(method, url, options);
  if (!result.ok) {
    return error(result.error);
  }

  return ok(await result.value.json());
};