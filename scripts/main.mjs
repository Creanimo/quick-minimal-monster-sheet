import {createQuickMinimalMonsterSheetClass} from "./qmms-monster-sheet.mjs";

/**
 * System configuration registry
 */
const SYSTEM_CONFIGS = {
    "dnd5e": () => import("./systems/dnd5e.mjs"),
    // "pf2e": () => import("./systems/pf2e.mjs"),
};

/**
 * Known config class names for each system
 */
const SYSTEM_CONFIG_CLASSES = {
    "dnd5e": "QMMSDnd5eConfig",
};

Hooks.once("ready", () => {
    console.log("Quick Minimal Monster Sheet | ready hook ✅");

    const systemId = game.system.id;

    if (!SYSTEM_CONFIGS[systemId]) {
        console.warn(`QMMS: No configuration for system "${systemId}". Available:`, Object.keys(SYSTEM_CONFIGS));
        return;
    }

    SYSTEM_CONFIGS[systemId]().then(module => {
        const configClassName = SYSTEM_CONFIG_CLASSES[systemId];
        const configClass = module[configClassName];

        if (!configClass) {
            throw new Error(`Config class "${configClassName}" not found in ${systemId} module`);
        }

        // Create configuration instance
        const config = new configClass({
            moduleId: "quick-minimal-monster-sheet",
            templatePath: module.TEMPLATE_PATH
        });

        // Create sheet class
        const QuickMinimalMonsterSheet = createQuickMinimalMonsterSheetClass({
            moduleId: config.getModuleId(),
            templatePath: config.getTemplatePath(),
            config: config
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
    }).catch(err => {
        console.error(`QMMS: Failed to load config for ${systemId}:`, err);
    });
});

