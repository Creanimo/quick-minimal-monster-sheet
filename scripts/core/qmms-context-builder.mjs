import { ContextBuilder } from './context-builder.mjs';
import { BiographyEnricher } from './biography-enricher.mjs';

/**
 * Context builder for QMMS sheets
 * Adds biography enrichment and legacy compatibility
 */
export class QMMSContextBuilder extends ContextBuilder {
    constructor(adapter, config) {
        super(adapter, config);
        this.biographyEnricher = new BiographyEnricher(config);
    }

    /**
     * Enrich content - specifically handles biography enrichment
     * @param {Actor} actor - The actor document
     * @param {Object} data - Data with biography field
     * @returns {Promise<Object>} Data with enriched biography
     */
    async enrichContent(actor, data) {
        const enrichedData = { ...data };

        // Enrich biography if present
        if (this.biographyEnricher.isEnabled() && data.biography) {
            enrichedData.biographyEnriched = await this.biographyEnricher.enrich(
                actor,
                data.biography
            );
        } else {
            enrichedData.biographyEnriched = "";
        }

        return enrichedData;
    }

    /**
     * Merge into context with QMMS-specific structure
     * Includes legacy compatibility fields
     * @param {Object} context - Base context
     * @param {Object} data - Sheet data
     * @returns {Object} Merged context
     */
    mergeIntoContext(context, data) {
        context.qmms5e = {
            name: data.name,
            defense: data.defense,
            health: data.health,
            difficulty: data.difficulty,
            biography: data.biography,
            biographyEnriched: data.biographyEnriched,

            // Legacy compatibility (for templates using old structure)
            ac: data.defense.value,
            hp: data.health,
            cr: data.difficulty.value
        };

        return context;
    }
}
