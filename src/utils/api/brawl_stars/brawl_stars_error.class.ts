import type {DebugValues} from '$core/utils/logger';
import {RestRequestError} from '$core/utils/error';


export class BrawlStarsApiError extends RestRequestError {

  constructor(message: string, baseError: RestRequestError, public reason: string, public apiMessage: string) {
    super(message, baseError.code, baseError.url, baseError.method, baseError.response);
  }

  debug(): DebugValues {
    return {
      ...super.debug(),
      'bs api reason': this.reason,
      'bs api message': this.apiMessage,
    };
  }

}