import { Service } from "$core/base/service";
import type { Client } from "$core/client";
import type { AddXpOptions, XpAddResponse } from "$core/service/xp/xp.type";
import type { Result } from "$core/utils/error";

export class XpService extends Service {

  static instance: XpService;

  name = "xp";

  constructor(client: Client) {
    super(client);
    XpService.instance = this;

  }

  static async addXp(options: AddXpOptions): Promise<Result<XpAddResponse, Error>> {
    return [true, { newXp: 0, newLevel: 0 }];
  }

}