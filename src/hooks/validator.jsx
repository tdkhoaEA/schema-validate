import { useState } from 'react';
import Ajv from 'ajv';

export const useJsonSchemaValidator = () => {
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);

    const validateSchema = (schema) => {
        const ajv = new Ajv({
            formats: {
                email: (value) => /\S+@\S+\.\S+/.test(value),
            },
        });
        // Enable $data references for draft 2020-12
        try {
            const parsedSchema = JSON.parse(schema);
            const validate = ajv.compile(parsedSchema);
            validate({});
            setErrors([]);
            setIsValid(true);
        } catch (error) {
            setErrors([{ message: error.message }]);
            setIsValid(false);
        }
    };

    return { isValid, errors, validateSchema };
};

export const useDataValidator = (schema) => {
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);

    const validateData = (data) => {
        const ajv = new Ajv({
            formats: {
                email: (value) => /\S+@\S+\.\S+/.test(value),
            },
        });
        try {
            const dataSchema = JSON.parse(data);
            const parsedSchema = JSON.parse(schema);
            console.log(dataSchema);
            const validate = ajv.compile(parsedSchema);
            const isValidData = validate(dataSchema);
            setIsValid(isValidData);
            if (!isValidData) {
                setErrors(validate.errors);
            } else {
                setErrors([]);
            }
        } catch (error) {
            console.error('Error validating data:', error);
            setIsValid(false);
            setErrors([
                {
                    message:
                        'Error validating data. Please check the schema and input data.',
                },
            ]);
        }
    };

    return { isValid, errors, validateData };
};
