export const engineCustomTypes = `/**
 * Lightning Web Components core module
 */

declare module 'lwc' {
    /**
     * Decorator to mark public reactive properties
     */
    export const api: CustomPropertyDecorator;

    /**
     * Decorator to mark private reactive properties
     */
    export const track: CustomPropertyDecorator;

    /**
     * Function required for Jest tests
     */
    export const createElement: function;
}

type CustomPropertyDecorator = any;`;
