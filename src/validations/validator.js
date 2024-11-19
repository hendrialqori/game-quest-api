
/**
 * @param {import("zod").ZodType} schema 
 * @param {Record<string, any>} data 
 * @returns {Record<string, any>}
 */

export const validate = (schema, data) => {
    return schema.parse(data)
}