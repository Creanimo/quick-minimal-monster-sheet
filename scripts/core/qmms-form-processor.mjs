import { FormProcessor } from './form-processor.mjs';
import { BiographyTransformer } from './biography-transformer.mjs';

/**
 * Form processor for QMMS sheets
 * Adds biography transformation to the base processing pipeline
 */
export class QMMSFormProcessor extends FormProcessor {
    constructor(adapter, config) {
        super(adapter, config);
        this.biographyTransformer = new BiographyTransformer(config);
    }

    /**
     * Transform data - adds biography inline roll transformation
     * @param {Object} data - Extracted form data (will be mutated)
     * @param {Actor} actor - The actor being updated
     * @returns {Promise<Object>} Transformed data
     */
    async transformData(data, actor) {
        // Transform biography inline rolls
        if (this.config.hasBiographyEditor()) {
            this.biographyTransformer.transform(data);
        }

        // Call parent for any additional transformations
        return await super.transformData(data, actor);
    }
}