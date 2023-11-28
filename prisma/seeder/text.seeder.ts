import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

const prisma = new PrismaClient();

const main = async(): Promise<void> => {
  const schema = z.record(z.string(), z.string());
  const texts = schema.parse(JSON.parse(readFileSync(join(__dirname, "text.json"), "utf-8")));

  const values = await prisma.text.findMany();

  const toAdd: { id: string; value: string }[] = [];

  for (const [id, text] of Object.entries(texts)) {
    if (!values.find((value) => value.id === id)) {
      toAdd.push({ id: id, value: text });
    }
  }

  if (toAdd.length > 0) {
    await prisma.text.createMany({
      data: toAdd,
    });
  }
};


main().then(() => {
  console.log("done");
  void prisma.$disconnect();
}).catch((e) => {
  console.error(e);
  process.exit(1);
});