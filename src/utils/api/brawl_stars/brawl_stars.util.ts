import {BrawlStarsApiError} from '$core/utils/api/brawl_stars/brawl_stars_error.class';
import type {Result} from 'rustic-error';
import {error, ok} from 'rustic-error';
import {jsonRestRequest} from '$core/utils/request/request.func';
import {BASE_URL} from '$core/utils/api/brawl_stars/brawl_stars.const';
import {env} from '$core/config/env';
import {clientErrorSchema} from '$core/utils/api/brawl_stars/client_error.z';
import type {z} from 'zod';
import {RestRequestError} from '$core/utils/error';

export const request = async <T extends z.Schema>(url: string, schema: T): Promise<Result<z.infer<T>, BrawlStarsApiError>> => {
  const result = await jsonRestRequest('get', BASE_URL + url, {
    headers: {
      'Authorization': `Bearer ${env.BRAWL_STARS_TOKEN}`,
    },
  });

  if (!result.ok) {
    const err = await result.error.response?.json();
    const infos = clientErrorSchema.safeParse(err);
    if (!infos.success) {
      return error(new BrawlStarsApiError('failed to request brawl stars api and invalid error return', result.error, infos.error.toString(), 'unknown'));
    }

    return error(new BrawlStarsApiError('failed to request brawl stars api', result.error, infos.data.reason || 'unknown', infos.data.message || 'unknown'));
  }

  const infos = schema.safeParse(result.value);
  if (!infos.success) {
    return error(new BrawlStarsApiError('failed to parse response',
      new RestRequestError('', 200, BASE_URL + url, 'get'),
      infos.error.toString(),
      'unknown'));
  }

  return ok(infos.data);
};

export const fixTag = (tag: string) => `%23${tag.replace('#', '')}`;