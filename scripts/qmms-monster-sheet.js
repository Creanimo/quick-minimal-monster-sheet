// scripts/qmms-monster-sheet.js

export class QuickMinimalMonsterSheet extends ActorSheetV2 {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    template: "modules/quick-minimal-monster-sheet-for-5e/templates/qmms-monster-sheet.hbs",
    classes: ["dnd5e", "sheet", "actor", "qmms-sheet"],
    width: 800,
    height: 600,
    tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "stats" }]
  });

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Expose simplified data for template
    context.qmms = {
      ac: foundry.utils.getProperty(this.actor, "system.attributes.ac.value") || 0,
      hp: {
        value: foundry.utils.getProperty(this.actor, "system.attributes.hp.value") || 0,
        max: foundry.utils.getProperty(this.actor, "system.attributes.hp.max") || 1
      },
      cr: foundry.utils.getProperty(this.actor, "system.details.cr") || "",
      biography: foundry.utils.getProperty(this.actor, "system.details.biography.value") || ""
    };

    return context;
  }

  async _updateObject(event, formData) {
    // Map form fields to actor data paths
    const updateData = {
      "system.attributes.ac.value": formData["system.attributes.ac.value"],
      "system.attributes.hp.value": formData["system.attributes.hp.value"],
      "system.attributes.hp.max": formData["system.attributes.hp.max"],
      "system.details.cr": formData["system.details.cr"],
      "system.details.biography.value": formData["system.details.biography.value"]
    };

    return this.actor.update(updateData);
  }
}
