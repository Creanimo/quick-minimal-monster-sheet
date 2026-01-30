import { createQuickMinimalMonsterSheetClass } from "./qmms-monster-sheet.mjs";

Hooks.once("ready", () => {
  console.log("Quick Minimal Monster Sheet for 5e | ready hook ✅");

  if (game.system.id !== "dnd5e") {
    console.warn("QMMS: dnd5e system not active, sheet not registered.");
    return;
  }

  const QuickMinimalMonsterSheet = createQuickMinimalMonsterSheetClass({
    moduleId: "quick-minimal-monster-sheet-for-5e",
    templatePath: "modules/quick-minimal-monster-sheet-for-5e/templates/qmms-monster-sheet.hbs"
  });

  const ActorsCollection = foundry.documents.collections.Actors;

  ActorsCollection.registerSheet("dnd5e", QuickMinimalMonsterSheet, {
    types: ["npc"],
    makeDefault: false,
    label: "Quick Minimal Monster Sheet for 5e"
  });

  console.log("Quick Minimal Monster Sheet for 5e | sheet registered ✅");
});
