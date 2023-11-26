import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async(): Promise<void> => {
  const texts = {
    "command.cooldown": "La commande a un cooldown, veillez patienter {seconds} secondes.",
    "command.error.title": "Erreur",
    "command.error.description": "Une erreur est survenue lors de l'exécution de la commande.",
  };

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