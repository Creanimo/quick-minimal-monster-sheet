import { enrichActorBiography } from '../utils/text-enricher.mjs';

/**
 * Handles enrichment of biography text
 * Converts raw HTML to enriched HTML with links, rolls, etc.
 */
export class BiographyEnricher {
    constructor(config) {
        this.config = config;
    }

    /**
     * Enrich biography text
     * @param {Actor} actor - The actor document
     * @param {string} biography - Raw biography HTML
     * @returns {Promise<string>} Enriched biography HTML
     */
    async enrich(actor, biography) {
        if (!biography || typeof biography !== "string") {
            return "";
        }

        try {
            const enriched = await enrichActorBiography(actor, biography);
            console.debug("[QMMS] [BiographyEnricher] Biography enriched");
            return enriched;
        } catch (err) {
            console.warn("[QMMS] [BiographyEnricher] Enrichment failed:", err);
            return biography; // Return original on error
        }
    }

    /**
     * Check if biography enrichment is enabled
     * @returns {boolean}
     */
    isEnabled() {
        return this.config.hasBiographyEditor();
    }
}
