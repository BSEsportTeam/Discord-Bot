import type { Client } from "$core/client";
import type { Button } from "$core/base/button/button.class";
import type { Service } from "$core/base/service";

export class ButtonManager {

  buttons: Map<string, Button<Service>> = new Map();

  constructor(readonly client: Client) {
  }

  get(name: string): Button<Service> | undefined {
    return this.buttons.get(name);
  }

  add(button: Button<Service>): void {
    this.buttons.set(button.name, button);
  }

}