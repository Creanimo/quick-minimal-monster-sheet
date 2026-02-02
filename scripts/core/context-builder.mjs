/**
 * Base context builder for preparing sheet rendering context
 * Provides a pipeline: base → adapter data → enrichment → finalize
 */
export class ContextBuilder {
    constructor(adapter, config) {
        this.adapter = adapter;
        this.config = config;
    }

    /**
     * Build complete context for sheet rendering
     * @param {Actor} actor - The actor document
     * @param {Object} baseContext - Base context from super._prepareContext()
     * @returns {Promise<Object>} Complete context object
     */
    async build(actor, baseContext) {
        console.debug("[QMMS] [ContextBuilder] Building context");

        // 1. Start with base context
        let context = { ...baseContext };

        // 2. Fetch data through adapter
        const adapterData = await this.fetchAdapterData(actor);
        console.debug("[QMMS] [ContextBuilder] Fetched adapter data");

        // 3. Enrich text content
        const enrichedData = await this.enrichContent(actor, adapterData);
        console.debug("[QMMS] [ContextBuilder] Enriched content");

        // 4. Add computed properties
        const finalData = this.addComputedProperties(enrichedData);
        console.debug("[QMMS] [ContextBuilder] Added computed properties");

        // 5. Merge into context
        context = this.mergeIntoContext(context, finalData);

        console.debug("[QMMS] [ContextBuilder] Context built successfully");
        return context;
    }

    /**
     * Fetch data through adapter
     * @param {Actor} actor - The actor document
     * @returns {Promise<Object>} Adapter data
     */
    async fetchAdapterData(actor) {
        return await this.adapter.prepareSheetContext();
    }

    /**
     * Enrich text content (override in subclass for specific enrichment)
     * @param {Actor} actor - The actor document
     * @param {Object} data - Data to enrich
     * @returns {Promise<Object>} Enriched data
     */
    async enrichContent(actor, data) {
        return data;
    }

    /**
     * Add computed properties (override in subclass)
     * @param {Object} data - Data to add properties to
     * @returns {Object} Data with computed properties
     */
    addComputedProperties(data) {
        return data;
    }

    /**
     * Merge data into context (override in subclass for custom structure)
     * @param {Object} context - Base context
     * @param {Object} data - Data to merge
     * @returns {Object} Merged context
     */
    mergeIntoContext(context, data) {
        return { ...context, ...data };
    }
}
