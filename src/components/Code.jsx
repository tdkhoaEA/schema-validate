import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useJsonSchemaValidator } from '../hooks/validator';

function Code({ updateSchema }) {
    const [schema, setSchema] = useState('');
    const { isValid, errors, validateSchema } = useJsonSchemaValidator();

    // Define onChange callback to update the schema state
    const onChange = useCallback((val) => {
        setSchema(val);
    }, []);

    // Define handleValidateSchema callback to trigger schema validation
    const handleValidateSchema = useCallback(() => {
        try {
            validateSchema(schema); // Validate the schema
            updateSchema(schema);
        } catch (error) {
            console.error('Invalid JSON schema format:', error);
        }
    }, [schema, validateSchema]); // Include schema and validateSchema in the dependencies array

    return (
        <div className="px-4 my-6">
            {/* <h2 className="p-2 font-bold text-lg">Input Schema</h2> */}
            <CodeMirror
                value={schema}
                height="300px"
                onChange={onChange} // Pass onChange callback to CodeMirror component
                theme="dark"
            />
            <div className="w-full flex justify-center">
                <button
                    className="mt-4 mx-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleValidateSchema} // Pass handleValidateSchema callback to the button's onClick event
                >
                    Validate Schema
                </button>
            </div>
            <div className="mt-4">
                {isValid && (
                    <p style={{ color: 'green' }}>
                        Schema is valid for Draft 2020-12!!.
                    </p>
                )}
                {errors.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold text-red-500">
                            Validation Errors:
                        </h3>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error.message}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Code;
