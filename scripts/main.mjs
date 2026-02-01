import {createQuickMinimalMonsterSheetClass} from "./qmms-monster-sheet.mjs";
import {QMMSDnd5eConfig} from "./config/dnd5e-config.mjs";

Hooks.once("ready", () => {
    console.log("Quick Minimal Monster Sheet for 5e | ready hook ✅");

    if (game.system.id !== "dnd5e") {
        console.warn("QMMS: dnd5e system not active, sheet not registered.");
        return;
    }

    const config = new QMMSDnd5eConfig({
        moduleId: "quick-minimal-monster-sheet-for-5e",
        templatePath: "modules/quick-minimal-monster-sheet-for-5e/templates/qmms-monster-sheet.hbs"
    });

    const QuickMinimalMonsterSheet = createQuickMinimalMonsterSheetClass({
        moduleId: config.getModuleId(),
        templatePath: config.getTemplatePath(),
        config: config,
    });

    const ActorsCollection = foundry.documents.collections.Actors;

    // Register sheet using configuration values
    ActorsCollection.registerSheet(
        config.getSystemId(),
        QuickMinimalMonsterSheet,
        {
            types: config.getActorTypes(),
            makeDefault: false,
            label: config.getSheetLabel()
        }
    );

    console.log(`${config.getSheetLabel()} | sheet registered ✅`);
});
