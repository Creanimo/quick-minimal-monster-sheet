export class QuickMinimalMonsterSheet extends dnd5e.applications.actor.ActorSheet5eNPC {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "modules/quick-minimal-monster-sheet-for-5e/templates/qmms-monster-sheet.hbs",
            classes: ["dnd5e", "sheet", "actor", "character", "qmms-sheet"],
            width: 800,
            height: 600,
        });
    }
}