import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useDataValidator } from '../hooks/validator';

function Data({ schema }) {
    const [data, setData] = useState('');
    const { isValid, errors, validateData } = useDataValidator(schema);

    // Define onChange callback to update the schema state
    const onChange = useCallback((val) => {
        setData(val);
    }, []);

    // Define handleValidateSchema callback to trigger schema validation
    const handleValidateSchema = useCallback(() => {
        try {
            console.log(schema);
            validateData(data); // Validate the schema
        } catch (error) {
            console.error('Invalid JSON schema format:', error);
        }
    }, [data, validateData]); // Include schema and validateSchema in the dependencies array

    return (
        <div className="px-4 my-6 w-1/2 mx-auto">
            {/* <h2 className="p-2 font-bold text-lg">Input Data Schema</h2> */}
            <CodeMirror
                value={data}
                height="300px"
                onChange={onChange}
                theme="dark"
            />
            <div className="w-full flex justify-center">
                <button
                    className="mt-4 mx-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleValidateSchema} // Pass handleValidateSchema callback to the button's onClick event
                >
                    Validate Data
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
export default Data;
