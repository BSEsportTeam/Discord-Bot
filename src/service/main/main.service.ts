import { Service } from "$core/base/service/service.class";
import type { Client } from "$core/client";

// admin commands
// xp system
export class MainService extends Service {

  name = "main";

  reloadable = false;


  constructor(client: Client) {
    super(client);
  }

}