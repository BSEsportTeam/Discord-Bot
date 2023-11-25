import type {DebuggableError} from "$core/utils/error/error.type";
import type {DebugValues} from "$core/utils/logger";
import type {Method} from "$core/utils/request/request.type";

export class RestRequestError extends Error implements DebuggableError {

  constructor(message: string, public code: number, public url: string, public method: Method, public response?: Response) {
    super(message);
  }

  debug(): DebugValues {
    return {
      method: `${this.method}`,
      code: `${this.code}`,
      url: this.url,
    };
  }

}