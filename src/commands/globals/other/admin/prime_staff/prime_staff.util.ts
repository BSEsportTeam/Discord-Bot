import { google } from "googleapis";
import { env } from "$core/config/env";
import type { PrimeInfos } from "$core/commands/globals/other/admin/prime_staff/prime_staff.type";
import { msgParams } from "$core/utils/function/string";
import { commandsConfig } from "$core/config/message/command";
import type { Result } from "rustic-error";
import { error, ok } from "rustic-error";
import { anyToError } from "$core/utils/error";

let lastSavedPrimes: PrimeInfos[] | undefined;

export const getSavedPrimes = () => lastSavedPrimes;

const getIndexes = (header: string[]): Record<keyof PrimeInfos, number> | string => {
  const baseIndexes = {
    "Adhesion Asso": header.findIndex(v => v === "Adhésion Asso"),
    "Primes": header.findIndex(v => v === "Primes"),
    "Poste": header.findIndex(v => v === "Poste"),
    "TOTAL Sans Bonus": header.findIndex(v => v === "TOTAL Sans Bonus"),
    "Idd": header.findIndex(v => v === "Idd"),
    "Pseudo": header.findIndex(v => v === "Pseudo"),
  };
  let msg = "";
  for (const [key, value] of Object.entries(baseIndexes)) {
    if (value < 0) {
      msg += `${msgParams(commandsConfig.admin.exec.primeStaff.columnNotFound, [key])}\n`;
    }
  }
  if (msg !== "") {
    return msg;
  }

  return {
    associationPrime: baseIndexes["Adhesion Asso"],
    prime: baseIndexes.Primes,
    role: baseIndexes.Poste,
    totalPrime: baseIndexes["TOTAL Sans Bonus"],
    userId: baseIndexes.Idd,
    username: baseIndexes.Pseudo,
  };
};

export const getPrimes = async (): Promise<Result<PrimeInfos[] | string, Error>> => {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
      credentials: {
        private_key: env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
        client_email: env.GOOGLE_MAIL,
      },
    });
    const sheets = google.sheets({
      version: "v4",
      auth: auth,
    });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEETS_ID,
      range: "Registre Staff!A:I",
    });

    if (res.data.values === null || typeof res.data.values === "undefined"
      || res.data.values.length === 0 || res.data.values[0].length === 0) {

      return error(new Error("No rows gets"));
    }
    const indexes = getIndexes(res.data.values[0]);
    if (typeof indexes === "string") {
      return ok(indexes);
    }

    const primes: PrimeInfos[] = [];

    for (const row of res.data.values.slice(1)) {
      const prime: PrimeInfos = {
        associationPrime: parseInt(row[indexes.associationPrime], 10),
        prime: parseInt(row[indexes.prime], 10),
        role: row[indexes.role],
        totalPrime: parseInt(row[indexes.totalPrime], 10),
        userId: row[indexes.userId],
        username: row[indexes.username],
      };
      if (!Object.values(prime).includes("")) {
        primes.push(prime);
      }
    }
    lastSavedPrimes = primes;
    return ok(primes);
  } catch (e) {
    return error(new Error(`failed to get prime staff infos, error : ${anyToError(e).message}`));
  }
};