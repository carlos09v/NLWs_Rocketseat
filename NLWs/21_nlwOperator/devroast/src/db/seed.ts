import "dotenv/config";
import { faker } from "@faker-js/faker";
import { db } from "./index";
import { analysisItems, roasts } from "./schema";

async function main() {
  console.log("🌱 Seeding database...");

  const languages = [
    "javascript",
    "typescript",
    "python",
    "rust",
    "go",
    "java",
    "cpp",
  ];
  const verdicts = [
    "needs_serious_help",
    "almost_readable",
    "absolute_chaos",
    "surprisingly_okay",
    "criminally_bad",
  ];
  const summaryTemplates = [
    "This code looks like it was written by a caffeinated squirrel",
    "I've seen better logic in a bowl of alphabet soup",
    "This is a masterpiece of how NOT to write code",
    "Your IDE must be screaming in agony",
    "Is this a joke or an actual attempt at programming?",
    "This code is the reason we have technical debt",
    "A bold choice to ignore every single best practice",
    "I can feel my brain cells dying just by reading this",
  ];

  const levels = ["critical", "warning", "good"] as const;

  try {
    // Clear existing data
    await db.delete(analysisItems);
    await db.delete(roasts);

    for (let i = 0; i < 100; i++) {
      const score = parseFloat(
        faker.number.float({ min: 0.1, max: 10, precision: 0.1 }).toFixed(1),
      );
      const lines = faker.number.int({ min: 10, max: 500 });

      const roast = await db
        .insert(roasts)
        .values({
          code: faker.helpers.arrayElement([
            "function a(){ return 1+1 }",
            "var x = 10; if(x==10){ console.log('hi') }",
            "const data = await fetch('url').then(r => r.json());",
            "for(let i=0; i<10; i++){ console.log(i) }",
            "class User { constructor(n){ this.name = n } }",
          ]),
          language: faker.helpers.arrayElement(languages),
          score,
          summary: faker.helpers.arrayElement(summaryTemplates),
          verdict: faker.helpers.arrayElement(verdicts),
          lines,
        })
        .returning({ id: roasts.id })
        .then((res) => res[0]);

      const itemsCount = faker.number.int({ min: 1, max: 5 });
      const items = [];

      for (let j = 0; j < itemsCount; j++) {
        items.push({
          roastId: roast.id,
          level: faker.helpers.arrayElement(levels),
          title: faker.lorem.sentence(3),
          description: faker.lorem.paragraph(),
          position: j,
        });
      }

      await db.insert(analysisItems).values(items);
    }

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:");
    console.error(error);
    process.exit(1);
  }
}

main();
